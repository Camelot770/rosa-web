import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { fetchBouquets } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Заказ принят · Роза Цветов',
  robots: { index: false, follow: false },
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'https://rosa-cvetov-camelot770.amvera.io';

interface OrderStatus {
  id: number;
  status: string;
  paymentStatus: string;
  totalPrice: number;
  deliveryType?: string;
}

interface PageProps {
  searchParams: { orderId?: string };
}

const fmt = (n: number) => n.toLocaleString('ru-RU');

async function loadStatus(orderId: string): Promise<OrderStatus | null> {
  try {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}/status`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as OrderStatus;
  } catch {
    return null;
  }
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  const orderId = searchParams.orderId ?? null;
  const [order, allBouquets] = await Promise.all([
    orderId ? loadStatus(orderId) : Promise.resolve(null),
    fetchBouquets().catch(() => []),
  ]);

  const isPaid = order?.paymentStatus === 'paid';
  const isCanceled = order?.paymentStatus === 'canceled';
  const isPending = order && !isPaid && !isCanceled;

  return (
    <>
      <Header bouquetCount={allBouquets.length || undefined} />
      <main className="thanks-page">
        <div className="container">
          <div className="thanks-card">
            <div
              className="ico"
              aria-hidden="true"
              style={isCanceled ? { borderColor: 'var(--vermilion)' } : undefined}
            >
              {isCanceled ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M6 6l12 12M6 18 18 6" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l4 4L19 6" />
                </svg>
              )}
            </div>

            <h1>
              {isCanceled ? (
                <>
                  Оплата <em>отменена.</em>
                </>
              ) : isPaid ? (
                <>
                  Спасибо за <em>оплату.</em>
                </>
              ) : (
                <>
                  Заказ <em>принят.</em>
                </>
              )}
            </h1>

            {orderId ? (
              <div className="order-no">
                Заказ № {orderId}
                {order ? ` · ${fmt(order.totalPrice)} ₽` : ''}
              </div>
            ) : null}

            {isPaid && (
              <p>
                Оплата подтверждена. Менеджер свяжется с&nbsp;вами в&nbsp;течение часа
                для&nbsp;согласования точного времени доставки. Если возникнут вопросы&nbsp;—
                звоните на{' '}
                <a
                  href="tel:+79600453996"
                  style={{ color: 'var(--vermilion)', borderBottom: '1px solid currentColor' }}
                >
                  +7 960 045 39 96
                </a>
                .
              </p>
            )}

            {isPending && (
              <p>
                Заказ принят, ожидаем подтверждение оплаты от&nbsp;ЮKassa. Это
                занимает несколько секунд. Если страница не&nbsp;обновится сама,
                можно её&nbsp;перезагрузить через минуту&nbsp;— или подождать звонок
                менеджера. Тел.{' '}
                <a
                  href="tel:+79600453996"
                  style={{ color: 'var(--vermilion)', borderBottom: '1px solid currentColor' }}
                >
                  +7 960 045 39 96
                </a>
                .
              </p>
            )}

            {isCanceled && (
              <p>
                Оплата была отменена&nbsp;— ничего страшного. Заказ № {orderId}{' '}
                сохранён в&nbsp;«ожидающих». Если хотите попробовать ещё раз&nbsp;—
                свяжитесь с&nbsp;нами по&nbsp;телефону{' '}
                <a
                  href="tel:+79600453996"
                  style={{ color: 'var(--vermilion)', borderBottom: '1px solid currentColor' }}
                >
                  +7 960 045 39 96
                </a>
                , и мы пришлём новую ссылку.
              </p>
            )}

            {!order && (
              <p>
                Спасибо за заказ в&nbsp;студии «Роза Цветов». Если страница попала
                сюда без оплаты&nbsp;— менеджер свяжется с&nbsp;вами по&nbsp;телефону
                в&nbsp;течение часа.
              </p>
            )}

            <div
              style={{
                display: 'inline-flex',
                gap: 24,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Link href="/" className="btn btn-outline">
                На главную
              </Link>
              <Link href="/#catalog" className="btn">
                Каталог
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
