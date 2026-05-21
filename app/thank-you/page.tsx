import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Заказ принят · Роза Цветов',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: { orderId?: string };
}

export default function ThankYouPage({ searchParams }: PageProps) {
  const orderId = searchParams.orderId ?? null;

  return (
    <>
      <Header />
      <main className="thanks-page">
        <div className="container">
          <div className="thanks-card">
            <div className="ico" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l4 4L19 6" />
              </svg>
            </div>

            <h1>
              Заказ <em>принят.</em>
            </h1>

            {orderId ? <div className="order-no">Заказ № {orderId}</div> : null}

            <p>
              Спасибо за заказ в студии «Роза Цветов». Наш менеджер свяжется с&nbsp;вами
              по&nbsp;телефону в&nbsp;течение часа&nbsp;— уточнит детали доставки
              и&nbsp;способ оплаты. Если будут вопросы&nbsp;— звоните на&nbsp;
              <a href="tel:+79600453996" style={{ color: 'var(--vermilion)', borderBottom: '1px solid currentColor' }}>
                +7 960 045 39 96
              </a>
              .
            </p>

            <div style={{ display: 'inline-flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
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
