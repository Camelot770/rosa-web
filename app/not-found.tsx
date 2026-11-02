import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Страница не найдена · Роза Цветов',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="thanks-page">
        <div className="container">
          <div className="thanks-card">
            <h1>
              Такой страницы <em>нет.</em>
            </h1>
            <p>
              Возможно, букет убрали из&nbsp;каталога или в&nbsp;ссылке опечатка. Все букеты
              собраны в&nbsp;каталоге.
            </p>
            <div className="thanks-actions">
              <Link href="/" className="btn btn-outline">
                На главную
              </Link>
              <Link href="/catalog" className="btn">
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
