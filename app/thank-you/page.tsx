import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { PaymentRetry } from '@/app/components/PaymentRetry';
import { StatusAutoRefresh } from '@/app/components/StatusAutoRefresh';
import { API_BASE, fetchBouquets } from '@/lib/api';
import { CONTACTS } from '@/lib/contacts';

export const metadata: Metadata = {
  title: 'Заказ принят · Роза Цветов',
  robots: { index: false, follow: false },
};

interface OrderStatus {
  id: number;
  status: string;
  paymentStatus: string;
  totalPrice: number;
  deliveryType?: string;
}

interface PageProps {
  searchParams: { orderId?: string; pay?: string };
}

const fmt = (n: number) => n.toLocaleString('ru-RU');

function PhoneLink() {
  return (
    <a
      href={CONTACTS.phoneHref}
      style={{ color: 'var(--vermilion)', borderBottom: '1px solid currentColor' }}
    >
      {CONTACTS.phone}
    </a>
  );
}

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
  const orderId = /^\d+$/.test(searchParams.orderId ?? '') ? searchParams.orderId! : null;
  const [order, allBouquets] = await Promise.all([
    orderId ? loadStatus(orderId) : Promise.resolve(null),
    fetchBouquets().catch(() => []),
  ]);

  const isPaid = order?.paymentStatus === 'paid';
  const isOrderCanceled = !isPaid && order?.status === 'canceled';
  const isCanceled = !isOrderCanceled && order?.paymentStatus === 'canceled';
  // We got here without a payment: creating it failed, nothing to wait for.
  const payFailed =
    !!orderId && !isPaid && !isCanceled && !isOrderCanceled && searchParams.pay === 'failed';
  const isPending = order && !isPaid && !isCanceled && !isOrderCanceled && !payFailed;
  // Also keep asking when the status request itself failed on the way back from YooKassa.
  const keepRefreshing = isPending || (orderId && !order && !payFailed);

  return (
    <>
      <Header bouquetCount={allBouquets.length || undefined} />
      <main className="thanks-page">
        <div className="container">
          <div className="thanks-card">
            <div
              className="ico"
              aria-hidden="true"
              style={isCanceled || isOrderCanceled ? { borderColor: 'var(--vermilion)' } : undefined}
            >
              {isCanceled || isOrderCanceled ? (
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
              {isOrderCanceled ? (
                <>
                  Заказ <em>отменён.</em>
                </>
              ) : isCanceled ? (
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
                для&nbsp;согласования точного времени доставки. Если возникнут вопросы&nbsp;-
                звоните на <PhoneLink />.
              </p>
            )}

            {isPending && (
              <p>
                Заказ принят, ждём подтверждение оплаты от&nbsp;ЮKassa. Обычно это занимает
                несколько секунд, страница обновится сама. Если вы не&nbsp;завершили оплату, можно
                вернуться к&nbsp;ней или подождать звонка менеджера. Тел. <PhoneLink />.
              </p>
            )}

            {payFailed && (
              <p>
                Заказ сохранён, но&nbsp;открыть онлайн-оплату не&nbsp;удалось. Деньги
                не&nbsp;списаны. Можно попробовать ещё раз или подождать звонка менеджера: он
                поможет с&nbsp;оплатой. Тел. <PhoneLink />.
              </p>
            )}

            {isCanceled && (
              <p>
                Оплата была отменена&nbsp;- ничего страшного, заказ № {orderId} сохранён. Можно
                попробовать ещё раз или позвонить по&nbsp;телефону <PhoneLink />, и&nbsp;мы
                пришлём новую ссылку.
              </p>
            )}

            {isOrderCanceled && (
              <p>
                Заказ № {orderId} отменён. Если это ошибка, позвоните нам по&nbsp;телефону{' '}
                <PhoneLink />.
              </p>
            )}

            {orderId && (isPending || payFailed || isCanceled) ? (
              <PaymentRetry
                orderId={Number(orderId)}
                label={isPending ? 'Вернуться к оплате' : 'Оплатить ещё раз'}
              />
            ) : null}

            {keepRefreshing ? <StatusAutoRefresh /> : null}

            {!order && !payFailed && (
              <p>
                Спасибо за заказ в&nbsp;студии «Роза Цветов». Если страница попала
                сюда без оплаты&nbsp;- менеджер свяжется с&nbsp;вами по&nbsp;телефону
                в&nbsp;течение часа.
              </p>
            )}

            <div className="thanks-actions">
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
