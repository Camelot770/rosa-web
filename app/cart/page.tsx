'use client';

import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { I } from '@/app/components/Icons';
import { useCart } from '@/lib/cart';

const fmt = (n: number) => n.toLocaleString('ru-RU');

export default function CartPage() {
  const hydrated = useCart((s) => s.hydrated);
  const lines = useCart((s) => s.lines);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);

  // Render an empty shell until persistence has hydrated, otherwise SSR
  // shows the "empty" state and then flips to filled, causing a flash.
  const showLoading = !hydrated;
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const oldTotal = lines.reduce((s, l) => s + (l.oldPrice ?? l.price) * l.qty, 0);
  const saved = Math.max(0, oldTotal - total);

  return (
    <>
      <Header />
      <main className="cart-page">
        <div className="container">
          <div className="page-marker" style={{ marginBottom: 12 }}>
            <span className="num">P.&nbsp;C1</span>
            <span className="lab">— Cart</span>
            <span className="sub">/ Корзина</span>
          </div>

          <h1>
            <em>Корзина.</em>
          </h1>

          {showLoading ? (
            <p style={{ color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>
              Загружаем сохранённую корзину…
            </p>
          ) : lines.length === 0 ? (
            <div className="cart-empty">
              <div className="ico">
                <I.Bag size={28} />
              </div>
              <h2>Корзина пуста</h2>
              <p>
                Откройте каталог и выберите букет — он будет жить у вас в доме три-пять лет
                без воды и ухода.
              </p>
              <Link href="/#catalog" className="btn">
                Открыть каталог{' '}
                <span className="arrow">
                  <I.Arrow />
                </span>
              </Link>
            </div>
          ) : (
            <div className="cart-grid">
              <div className="cart-lines">
                {lines.map((l) => (
                  <div key={l.bouquetId} className="cart-line">
                    <div
                      className="thumb"
                      style={l.image ? { backgroundImage: `url("${l.image}")` } : undefined}
                    />
                    <div className="info">
                      <div className="cap">{l.collection}</div>
                      <p className="nm">
                        <Link href={`/product/${l.bouquetId}`}>«{l.name}»</Link>
                      </p>
                    </div>
                    <div className="price">
                      {l.oldPrice && l.oldPrice > l.price ? (
                        <span className="old">{fmt(l.oldPrice * l.qty)} ₽</span>
                      ) : null}
                      {fmt(l.price * l.qty)} ₽
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                      <div className="qty">
                        <button onClick={() => setQty(l.bouquetId, l.qty - 1)} aria-label="Меньше">
                          −
                        </button>
                        <span className="v">{l.qty}</span>
                        <button onClick={() => setQty(l.bouquetId, l.qty + 1)} aria-label="Больше">
                          +
                        </button>
                      </div>
                      <button className="remove" onClick={() => remove(l.bouquetId)}>
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="cart-summary">
                <div className="kicker">✦ Сводка заказа</div>
                <div className="row">
                  <span>Позиций</span>
                  <span>{lines.reduce((n, l) => n + l.qty, 0)}</span>
                </div>
                <div className="row">
                  <span>Стоимость букетов</span>
                  <span>{fmt(total)} ₽</span>
                </div>
                <div className="row">
                  <span>Доставка</span>
                  <span>Бесплатно по Казани</span>
                </div>
                {saved > 0 ? (
                  <div className="row" style={{ color: 'var(--vermilion)' }}>
                    <span>Экономия</span>
                    <span>−{fmt(saved)} ₽</span>
                  </div>
                ) : null}
                <div className="row total">
                  <span>К оплате</span>
                  <span className="v">
                    <em>{fmt(total)} ₽</em>
                  </span>
                </div>

                <Link href="/checkout" className="checkout-btn">
                  Оформить заказ <I.Arrow />
                </Link>

                <p className="note">
                  Нажимая «Оформить заказ», вы соглашаетесь с{' '}
                  <Link href="/privacy" style={{ color: 'var(--ink)' }}>
                    Политикой конфиденциальности
                  </Link>
                  . Менеджер свяжется по&nbsp;телефону в течение часа.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
