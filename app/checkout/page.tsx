'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { I } from '@/app/components/Icons';
import { useCart } from '@/lib/cart';
import { CONTACTS } from '@/lib/contacts';

const fmt = (n: number) => n.toLocaleString('ru-RU');

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'https://rosa-cvetov-camelot770.amvera.io';

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

export default function CheckoutPage() {
  const router = useRouter();
  const hydrated = useCart((s) => s.hydrated);
  const lines = useCart((s) => s.lines);
  const clearCart = useCart((s) => s.clear);

  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bounce back to cart if hydrated and empty
  useEffect(() => {
    if (hydrated && lines.length === 0) {
      router.replace('/cart');
    }
  }, [hydrated, lines.length, router]);

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const oldSubtotal = lines.reduce((s, l) => s + (l.oldPrice ?? l.price) * l.qty, 0);
  const isPromoValid = form.promoCode.trim().toUpperCase() === 'VISITKA10';
  const promoDiscount = isPromoValid ? Math.floor(subtotal * 0.1) : 0;
  // Delivery cost mirrors server logic (defaults that match settings fallbacks).
  const FREE_FROM = 5000;
  const DELIVERY_PRICE = 500;
  const deliveryCost =
    form.deliveryType === 'delivery' && subtotal < FREE_FROM ? DELIVERY_PRICE : 0;
  const total = Math.max(0, subtotal - promoDiscount + deliveryCost);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.agree) {
      setError('Подтвердите согласие с политикой конфиденциальности.');
      return;
    }
    if (form.firstName.trim().length < 2) {
      setError('Укажите имя.');
      return;
    }
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Укажите корректный номер телефона.');
      return;
    }
    if (form.deliveryType === 'delivery' && (!form.street.trim() || !form.house.trim())) {
      setError('Укажите улицу и дом для доставки.');
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        customer: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim() || undefined,
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
        },
        delivery: {
          type: form.deliveryType,
          date: form.deliveryDate || undefined,
          time: form.deliveryTime || undefined,
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
        items: lines.map((l) => ({ bouquetId: l.bouquetId, quantity: l.qty })),
      };

      const res = await fetch(`${API_BASE}/api/orders/guest`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Сервер вернул ${res.status}`);
      }
      const data = await res.json();
      const orderId: number = data.orderId;
      clearCart();

      // Try to spin up a YooKassa checkout. If the payment route isn't
      // deployed or YooKassa is unreachable, fall back to the M3 flow:
      // order is saved, studio calls back.
      try {
        const origin = window.location.origin;
        const payRes = await fetch(`${API_BASE}/api/payment/create-guest`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            orderId,
            returnUrl: `${origin}/thank-you?orderId=${orderId}`,
          }),
        });
        if (payRes.ok) {
          const { confirmationUrl } = await payRes.json();
          if (typeof confirmationUrl === 'string' && confirmationUrl.length > 0) {
            window.location.href = confirmationUrl;
            return;
          }
        } else {
          console.warn('Payment init failed:', payRes.status);
        }
      } catch (payErr) {
        console.warn('Payment init exception:', payErr);
      }

      router.push(`/thank-you?orderId=${encodeURIComponent(orderId)}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Не удалось отправить заказ.';
      setError(msg);
      setSubmitting(false);
    }
  };

  if (!hydrated) {
    return (
      <>
        <Header />
        <main className="checkout-page">
          <div className="container">
            <p style={{ color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>
              Загружаем корзину…
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  if (lines.length === 0) return null; // useEffect will redirect

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

          <div className="checkout-grid">
            <form className="checkout-form" onSubmit={submit} noValidate>
              {error ? <div className="checkout-error">{error}</div> : null}

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
                      Бесплатно от 5 000 ₽ · иначе 500 ₽
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
                    <div className="form-row three" style={{ marginTop: 24 }}>
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
                  <button type="submit" className="btn" disabled={submitting}>
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
