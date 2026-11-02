'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { I } from '@/app/components/Icons';
import { CartNotices } from '@/app/components/CartNotices';
import { API_BASE, fetchWithTimeout, type ShopSettings } from '@/lib/api';
import { courierCost, useCart, type CartLine } from '@/lib/cart';
import { CONTACTS } from '@/lib/contacts';
import {
  NETWORK_ERROR,
  ORDER_TIMEOUT_MS,
  orderErrorText,
  rememberOrderToken,
  startGuestPayment,
} from '@/lib/payment';
import { useShopSettings } from '@/lib/settings';

const fmt = (n: number) => n.toLocaleString('ru-RU');

type DeliveryType = 'delivery' | 'pickup';

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryType: DeliveryType;
  city: string;
  street: string;
  house: string;
  apartment: string;
  deliveryDate: string;
  deliveryTime: string;
  recipientName: string;
  recipientPhone: string;
  isAnonymous: boolean;
  cardText: string;
  comment: string;
  promoCode: string;
  agree: boolean;
}

const initial: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  deliveryType: 'delivery',
  city: 'Казань',
  street: '',
  house: '',
  apartment: '',
  deliveryDate: '',
  deliveryTime: '',
  recipientName: '',
  recipientPhone: '',
  isAnonymous: false,
  cardText: '',
  comment: '',
  promoCode: '',
  agree: false,
};

/** Today at the studio, Kazan is UTC+3. The server refuses earlier dates. */
const studioToday = () => new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString().slice(0, 10);

/** Same rules as the server, so customers see the reason in Russian before sending. */
function validate(form: FormState): string | null {
  const firstName = form.firstName.trim();
  if (firstName.length < 2 || firstName.length > 60) {
    return 'Укажите имя: от 2 до 60 символов.';
  }
  const digits = form.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    return 'Укажите корректный номер телефона, например +7 900 000 00 00.';
  }
  const email = form.email.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Проверьте e-mail: похоже, в адресе опечатка. Поле можно оставить пустым.';
  }
  if (form.deliveryType === 'delivery') {
    if (!form.city.trim()) return 'Укажите город доставки.';
    if (!form.street.trim() || !form.house.trim()) return 'Укажите улицу и дом для доставки.';
    if (form.deliveryDate && form.deliveryDate < studioToday()) {
      return 'Эта дата уже прошла, выберите другую.';
    }
  }
  if (form.recipientPhone.trim() && form.recipientPhone.replace(/\D/g, '').length < 10) {
    return 'Проверьте телефон получателя или оставьте поле пустым.';
  }
  if (!form.agree) return 'Подтвердите согласие с политикой конфиденциальности.';
  return null;
}

/** Mirrors the server's total, so the customer sees what will be charged. */
function calcTotals(lines: CartLine[], settings: ShopSettings, form: FormState) {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const isPromoValid = form.promoCode.trim().toUpperCase() === 'VISITKA10';
  const promoDiscount = isPromoValid ? Math.floor(subtotal * 0.1) : 0;
  const deliveryCost = form.deliveryType === 'delivery' ? courierCost(subtotal, settings) : 0;
  const total = Math.max(0, subtotal - promoDiscount + deliveryCost);
  return { subtotal, promoDiscount, deliveryCost, total };
}

const minOrderText = (minOrder: number, subtotal: number) =>
  `Минимальная сумма заказа - ${fmt(minOrder)} ₽. Добавьте букетов ещё на ${fmt(minOrder - subtotal)} ₽.`;

function CheckoutMessage({ text }: { text: string }) {
  return (
    <>
      <Header />
      <main className="checkout-page">
        <div className="container">
          <p style={{ color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>{text}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Order saved by the server with a total the customer has not seen yet. */
interface ChangedOrder {
  orderId: number;
  token: string | undefined;
  total: number;
  expected: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const hydrated = useCart((s) => s.hydrated);
  const lines = useCart((s) => s.lines);
  const clearCart = useCart((s) => s.clear);
  const revalidateCart = useCart((s) => s.revalidate);
  const { settings, refresh: refreshSettings } = useShopSettings();

  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [changedOrder, setChangedOrder] = useState<ChangedOrder | null>(null);
  const [leaving, setLeaving] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  // Bounce back to cart if hydrated and empty
  useEffect(() => {
    if (hydrated && lines.length === 0 && !leaving) {
      router.replace('/cart');
    }
  }, [hydrated, lines.length, leaving, router]);

  useEffect(() => {
    if (hydrated) void revalidateCart();
  }, [hydrated, revalidateCart]);

  // The form is long and the submit button is at its end: bring messages into view.
  useEffect(() => {
    if (error || changedOrder) {
      alertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [error, changedOrder]);

  const { subtotal, promoDiscount, deliveryCost, total } = calcTotals(lines, settings, form);
  const oldSubtotal = lines.reduce((s, l) => s + (l.oldPrice ?? l.price) * l.qty, 0);
  const belowMinOrder = subtotal < settings.minOrder;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const goToPayment = async (orderId: number, token: string | undefined) => {
    const payment = await startGuestPayment(orderId, token);
    // The order exists from here on, so the cart is done. Clear it only now:
    // doing it earlier flashes "Корзина пуста" while the payment is created.
    setLeaving(true);
    clearCart();
    if (payment.ok) {
      window.location.href = payment.url;
      return;
    }
    console.warn('Payment init failed:', payment.error);
    router.push(`/thank-you?orderId=${encodeURIComponent(orderId)}&pay=failed`);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const invalid = validate(form);
    if (invalid) {
      setError(invalid);
      return;
    }

    setSubmitting(true);
    try {
      // Prices, stock and delivery may have changed since the page was opened.
      const [, freshSettings] = await Promise.all([revalidateCart(), refreshSettings()]);
      const freshLines = useCart.getState().lines;
      const activeSettings = freshSettings ?? settings;
      const fresh = calcTotals(freshLines, activeSettings, form);
      if (freshLines.length === 0) {
        setSubmitting(false);
        return;
      }
      if (fresh.subtotal < activeSettings.minOrder) {
        setError(minOrderText(activeSettings.minOrder, fresh.subtotal));
        setSubmitting(false);
        return;
      }
      if (fresh.total !== total) {
        setError(
          `Сумма заказа изменилась: теперь ${fmt(fresh.total)} ₽. Проверьте заказ и нажмите «Оплатить» ещё раз.`,
        );
        setSubmitting(false);
        return;
      }

      const body = {
        customer: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim() || undefined,
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
        },
        delivery: {
          type: form.deliveryType,
          date: form.deliveryType === 'delivery' ? form.deliveryDate || undefined : undefined,
          time: form.deliveryType === 'delivery' ? form.deliveryTime || undefined : undefined,
          address:
            form.deliveryType === 'delivery'
              ? {
                  city: form.city.trim() || undefined,
                  street: form.street.trim(),
                  house: form.house.trim(),
                  apartment: form.apartment.trim() || undefined,
                }
              : undefined,
        },
        recipientName: form.recipientName.trim() || undefined,
        recipientPhone: form.recipientPhone.trim() || undefined,
        isAnonymous: form.isAnonymous || undefined,
        cardText: form.cardText.trim() || undefined,
        comment: form.comment.trim() || undefined,
        promoCode: form.promoCode.trim() || undefined,
        items: freshLines.map((l) => ({ bouquetId: l.bouquetId, quantity: l.qty })),
      };

      const res = await fetchWithTimeout(
        `${API_BASE}/api/orders/guest`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        },
        ORDER_TIMEOUT_MS,
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // Usually a bouquet just went out of stock: let the cart explain what changed.
        if (res.status === 400) await revalidateCart();
        setError(orderErrorText(data.error));
        setSubmitting(false);
        return;
      }

      const orderId: number = data.orderId;
      const token: string | undefined = data.guestToken;
      rememberOrderToken(orderId, token);

      // The server recomputes the total from its own prices. Never send the
      // customer to pay a sum they have not seen.
      if (typeof data.totalPrice === 'number' && data.totalPrice !== fresh.total) {
        setChangedOrder({ orderId, token, total: data.totalPrice, expected: fresh.total });
        setSubmitting(false);
        return;
      }

      await goToPayment(orderId, token);
    } catch (err) {
      console.warn('Order submit failed:', err);
      setError(NETWORK_ERROR);
      setSubmitting(false);
    }
  };

  const confirmChangedOrder = async () => {
    if (!changedOrder) return;
    setSubmitting(true);
    await goToPayment(changedOrder.orderId, changedOrder.token);
  };

  if (!hydrated) return <CheckoutMessage text="Загружаем корзину…" />;
  if (lines.length === 0) {
    // useEffect redirects to the cart unless we're on our way to the payment
    return leaving ? <CheckoutMessage text="Открываем оплату…" /> : null;
  }

  const isKazan = /^казань$/i.test(form.city.trim());

  return (
    <>
      <Header />
      <main className="checkout-page">
        <div className="container">
          <div className="page-marker" style={{ marginBottom: 12 }}>
            <span className="num">P.&nbsp;C2</span>
            <span className="lab">— Checkout</span>
            <span className="sub">/ Оформление заказа</span>
          </div>

          <h1>
            <em>Оформление</em> заказа.
          </h1>

          <CartNotices />

          <div className="checkout-grid">
            <form className="checkout-form" onSubmit={submit} noValidate>
              <div ref={alertRef}>
                {error ? (
                  <div className="checkout-error" role="alert">
                    {error}
                  </div>
                ) : null}
                {changedOrder ? (
                  <div className="checkout-error price-changed" role="alert">
                    <div>
                      Заказ № {changedOrder.orderId} сохранён, но сумма изменилась:{' '}
                      {fmt(changedOrder.total)} ₽ вместо {fmt(changedOrder.expected)} ₽. Цены или
                      доставка только что обновились. Оплачивайте, только если сумма вам подходит.
                      Если нет - не оплачивайте: менеджер позвонит и всё уточнит.
                    </div>
                    <button
                      type="button"
                      className="btn"
                      onClick={confirmChangedOrder}
                      disabled={submitting}
                    >
                      {submitting ? 'Создаём платёж…' : `Оплатить ${fmt(changedOrder.total)} ₽`}{' '}
                      <span className="arrow">
                        <I.Arrow />
                      </span>
                    </button>
                  </div>
                ) : null}
              </div>
              {belowMinOrder ? (
                <div className="checkout-error">{minOrderText(settings.minOrder, subtotal)}</div>
              ) : null}

              <section className="form-section">
                <span className="num">01 · Контакт</span>
                <h2>
                  Как с вами <span className="accent">связаться</span>.
                </h2>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="fn">Имя*</label>
                    <input
                      id="fn"
                      required
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) => update('firstName', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="ln">Фамилия</label>
                    <input
                      id="ln"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) => update('lastName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: 20 }}>
                  <div className="field">
                    <label htmlFor="ph">Телефон*</label>
                    <input
                      id="ph"
                      type="tel"
                      required
                      placeholder="+7 ___ ___ __ __"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="em">E-mail (для подтверждения)</label>
                    <input
                      id="em"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <span className="num">02 · Доставка</span>
                <h2>
                  Куда привезти <span className="accent">букет</span>.
                </h2>

                <div className="radio-row">
                  <label className={`radio-tile ${form.deliveryType === 'delivery' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={form.deliveryType === 'delivery'}
                      onChange={() => update('deliveryType', 'delivery')}
                    />
                    <div className="rt-title">Доставка курьером</div>
                    <div className="rt-sub">
                      Бесплатно от {fmt(settings.freeDeliveryFrom)} ₽ · иначе{' '}
                      {fmt(settings.deliveryPrice)} ₽
                    </div>
                  </label>
                  <label className={`radio-tile ${form.deliveryType === 'pickup' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={form.deliveryType === 'pickup'}
                      onChange={() => update('deliveryType', 'pickup')}
                    />
                    <div className="rt-title">Самовывоз</div>
                    <div className="rt-sub">{CONTACTS.pickupAddressShort} · бесплатно</div>
                  </label>
                </div>

                {form.deliveryType === 'delivery' && (
                  <>
                    <div className="form-row full" style={{ marginTop: 24 }}>
                      <div className="field">
                        <label htmlFor="ci">Город*</label>
                        <input
                          id="ci"
                          required
                          autoComplete="address-level2"
                          value={form.city}
                          onChange={(e) => update('city', e.target.value)}
                        />
                        {form.city.trim() && !isKazan ? (
                          <div className="hint">
                            За пределами Казани стоимость и срок доставки уточнит менеджер:
                            отправляем СДЭК или Почтой России, подробнее в{' '}
                            <Link href="/delivery">условиях доставки</Link>.
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-row three" style={{ marginTop: 20 }}>
                      <div className="field">
                        <label htmlFor="st">Улица*</label>
                        <input
                          id="st"
                          required
                          autoComplete="address-line1"
                          value={form.street}
                          onChange={(e) => update('street', e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="ho">Дом*</label>
                        <input
                          id="ho"
                          required
                          value={form.house}
                          onChange={(e) => update('house', e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="ap">Кв.</label>
                        <input
                          id="ap"
                          value={form.apartment}
                          onChange={(e) => update('apartment', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-row" style={{ marginTop: 20 }}>
                      <div className="field">
                        <label htmlFor="dt">Дата</label>
                        <input
                          id="dt"
                          type="date"
                          min={studioToday()}
                          value={form.deliveryDate}
                          onChange={(e) => update('deliveryDate', e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="tm">Время</label>
                        <input
                          id="tm"
                          type="time"
                          value={form.deliveryTime}
                          onChange={(e) => update('deliveryTime', e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </section>

              <section className="form-section">
                <span className="num">03 · Получатель</span>
                <h2>
                  Если букет — <span className="accent">в подарок</span>.
                </h2>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="rn">Имя получателя</label>
                    <input
                      id="rn"
                      placeholder="Если отличается от вашего"
                      value={form.recipientName}
                      onChange={(e) => update('recipientName', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="rp">Телефон получателя</label>
                    <input
                      id="rp"
                      type="tel"
                      placeholder="Если курьер будет уточнять"
                      value={form.recipientPhone}
                      onChange={(e) => update('recipientPhone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row full" style={{ marginTop: 20 }}>
                  <div className="field">
                    <label htmlFor="ct">Текст для открытки</label>
                    <textarea
                      id="ct"
                      placeholder="Поздравление, признание или короткая строка — приложим к букету"
                      value={form.cardText}
                      onChange={(e) => update('cardText', e.target.value)}
                    />
                  </div>
                </div>

                <label className="checkbox-row" style={{ marginTop: 16 }}>
                  <input
                    type="checkbox"
                    checked={form.isAnonymous}
                    onChange={(e) => update('isAnonymous', e.target.checked)}
                  />
                  <span>Анонимный подарок — не указывать отправителя</span>
                </label>
              </section>

              <section className="form-section">
                <span className="num">04 · Дополнительно</span>
                <h2>
                  Комментарий и <span className="accent">промокод</span>.
                </h2>

                <div className="form-row full">
                  <div className="field">
                    <label htmlFor="cm">Комментарий курьеру / студии</label>
                    <textarea
                      id="cm"
                      placeholder="Особые пожелания, точное время и т.п."
                      value={form.comment}
                      onChange={(e) => update('comment', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row" style={{ marginTop: 20 }}>
                  <div className="field">
                    <label htmlFor="pc">Промокод</label>
                    <input
                      id="pc"
                      placeholder="VISITKA10 — −10% на первый заказ"
                      value={form.promoCode}
                      onChange={(e) => update('promoCode', e.target.value)}
                    />
                  </div>
                  <div />
                </div>
              </section>

              <section className="form-section">
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => update('agree', e.target.checked)}
                  />
                  <span>
                    Я согласен(а) с{' '}
                    <Link href="/privacy">Политикой конфиденциальности</Link> и подтверждаю
                    отправку заказа. Менеджер свяжется со мной по&nbsp;телефону в течение часа
                    для уточнения деталей.
                  </span>
                </label>

                <div className="checkout-submit-row" style={{ marginTop: 24 }}>
                  <button
                    type="submit"
                    className="btn"
                    disabled={submitting || belowMinOrder || !!changedOrder}
                  >
                    {submitting ? 'Создаём платёж…' : `Оплатить ${fmt(total)} ₽`}{' '}
                    <span className="arrow">
                      <I.Arrow />
                    </span>
                  </button>
                  <div
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: 11,
                      color: 'var(--ink-soft)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    После подтверждения заказа мы перенаправим вас на ЮKassa
                    для&nbsp;безопасной оплаты. Если онлайн-оплата временно недоступна,
                    мы&nbsp;примем заказ и&nbsp;менеджер позвонит для согласования.
                  </div>
                </div>
              </section>
            </form>

            <aside className="mini-cart">
              <div className="kicker">✦ Ваш заказ ({lines.length})</div>
              {lines.map((l) => (
                <div key={l.bouquetId} className="line">
                  <div
                    className="thumb"
                    style={l.image ? { backgroundImage: `url("${l.image}")` } : undefined}
                  />
                  <div>
                    <div className="nm">«{l.name}»</div>
                    <div className="qty">× {l.qty}</div>
                  </div>
                  <div className="pr">{fmt(l.price * l.qty)} ₽</div>
                </div>
              ))}
              <div className="totals">
                {oldSubtotal > subtotal ? (
                  <div className="row">
                    <span>Без скидки</span>
                    <span style={{ textDecoration: 'line-through', color: 'var(--taupe)' }}>
                      {fmt(oldSubtotal)} ₽
                    </span>
                  </div>
                ) : null}
                <div className="row">
                  <span>Букеты</span>
                  <span>{fmt(subtotal)} ₽</span>
                </div>
                {promoDiscount > 0 ? (
                  <div className="row" style={{ color: 'var(--vermilion)' }}>
                    <span>Промо VISITKA10</span>
                    <span>−{fmt(promoDiscount)} ₽</span>
                  </div>
                ) : null}
                <div className="row">
                  <span>Доставка</span>
                  <span>{deliveryCost === 0 ? 'Бесплатно' : `${fmt(deliveryCost)} ₽`}</span>
                </div>
                <div className="row total">
                  <span>Итого</span>
                  <span>
                    <em>{fmt(total)} ₽</em>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
