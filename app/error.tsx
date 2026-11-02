'use client';

import { startTransition, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { CONTACTS } from '@/lib/contacts';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  // Server-rendered data is only fetched again after a refresh.
  const retry = () =>
    startTransition(() => {
      router.refresh();
      reset();
    });

  return (
    <>
      <Header />
      <main className="thanks-page">
        <div className="container">
          <div className="thanks-card">
            <h1>
              Каталог временно <em>недоступен.</em>
            </h1>
            <p>
              Не&nbsp;удалось загрузить страницу. Попробуйте обновить её через минуту или
              закажите букет по&nbsp;телефону{' '}
              <a
                href={CONTACTS.phoneHref}
                style={{ color: 'var(--vermilion)', borderBottom: '1px solid currentColor' }}
              >
                {CONTACTS.phone}
              </a>
              .
            </p>
            <div className="thanks-actions">
              <Link href="/" className="btn btn-outline">
                На главную
              </Link>
              <button type="button" className="btn" onClick={retry}>
                Обновить
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
