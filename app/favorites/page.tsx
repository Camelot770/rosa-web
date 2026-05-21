'use client';

import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { I } from '@/app/components/Icons';
import { useFavorites } from '@/lib/favorites';

const fmt = (n: number) => n.toLocaleString('ru-RU');

export default function FavoritesPage() {
  const hydrated = useFavorites((s) => s.hydrated);
  const items = useFavorites((s) => s.items);
  const remove = useFavorites((s) => s.remove);

  return (
    <>
      <Header />
      <main className="fav-page">
        <div className="container">
          <div className="page-marker" style={{ marginBottom: 12 }}>
            <span className="num">P.&nbsp;F1</span>
            <span className="lab">— Favorites</span>
            <span className="sub">/ Избранное</span>
          </div>

          <h1>
            <em>Избранное.</em>
          </h1>

          {!hydrated ? (
            <p style={{ color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>
              Загружаем избранное…
            </p>
          ) : items.length === 0 ? (
            <div className="cart-empty">
              <div className="ico">
                <I.Heart size={28} />
              </div>
              <h2>В избранном пока пусто</h2>
              <p>
                Нажмите ♡ на&nbsp;карточке букета, чтобы сохранить его сюда. Букеты будут
                храниться в&nbsp;вашем браузере&nbsp;— возвращайтесь и&nbsp;покупайте, когда
                будете готовы.
              </p>
              <Link href="/catalog" className="btn">
                Открыть каталог{' '}
                <span className="arrow">
                  <I.Arrow />
                </span>
              </Link>
            </div>
          ) : (
            <>
              <p className="lead">
                {items.length}{' '}
                {items.length === 1
                  ? 'букет в избранном'
                  : items.length >= 2 && items.length <= 4
                    ? 'букета в избранном'
                    : 'букетов в избранном'}
                . Сохранено в&nbsp;вашем браузере&nbsp;— ни&nbsp;логиниться, ни&nbsp;e-mail
                оставлять не&nbsp;надо.
              </p>

              <div className="fav-grid">
                {items.map((b) => {
                  const ix = `№ ${String(b.no).padStart(3, '0')}`;
                  return (
                    <div key={b.bouquetId} style={{ position: 'relative' }}>
                      <Link className="spread-card" href={`/product/${b.bouquetId}`}>
                        <div className="ph">
                          <div
                            className="photo"
                            data-label=""
                            style={
                              b.image
                                ? {
                                    backgroundImage: `url("${b.image}")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                  }
                                : undefined
                            }
                          />
                          <span className="stamp-no">{ix}</span>
                        </div>
                        <div className="body">
                          <div>
                            <div className="cap">{b.collection}</div>
                            <div className="nm">
                              <em>«{b.name}»</em>
                            </div>
                          </div>
                          <div className="pr">
                            {b.oldPrice && b.oldPrice > b.price ? (
                              <span
                                style={{
                                  color: 'var(--taupe)',
                                  textDecoration: 'line-through',
                                  marginRight: 8,
                                  fontWeight: 400,
                                }}
                              >
                                {fmt(b.oldPrice)} ₽
                              </span>
                            ) : null}
                            {fmt(b.price)} ₽
                          </div>
                        </div>
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(b.bouquetId)}
                        className="fav-card active"
                        style={{ top: 10, left: 10 }}
                        aria-label="Удалить из избранного"
                        title="Удалить из избранного"
                      >
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
