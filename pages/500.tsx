import type { CSSProperties } from 'react';
import Head from 'next/head';
import { CONTACTS } from '@/lib/contacts';

const INK = '#1A1612';
const PAPER = '#F4EFE5';
const VERMILION = '#C8421E';

const button: CSSProperties = {
  display: 'inline-block',
  padding: '16px 28px',
  border: `1px solid ${INK}`,
  background: INK,
  color: PAPER,
  font: '12px "Helvetica Neue", Arial, sans-serif',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  cursor: 'pointer',
};

/**
 * Next serves this static page when a page that has never been rendered fails,
 * for example a bouquet opened for the first time while the API is down. An ISR
 * render can't show app/error.tsx, and Next's default page here is in English.
 */
export default function ServerErrorPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        boxSizing: 'border-box',
        textAlign: 'center',
        background: PAPER,
        color: INK,
      }}
    >
      <Head>
        <title>Страница временно недоступна · Роза Цветов</title>
        <meta name="robots" content="noindex" />
        <style>{`html, body { margin: 0; background: ${PAPER}; }`}</style>
      </Head>
      <h1
        style={{
          margin: '0 0 24px',
          font: '400 clamp(40px, 6.5vw, 72px)/1 "Times New Roman", serif',
        }}
      >
        Страница временно <em style={{ color: VERMILION }}>недоступна.</em>
      </h1>
      <p
        style={{
          maxWidth: 560,
          margin: '0 0 32px',
          font: '16px/1.6 "Helvetica Neue", Arial, sans-serif',
        }}
      >
        Не удалось загрузить страницу. Попробуйте обновить её через минуту или закажите букет
        по&nbsp;телефону{' '}
        <a href={CONTACTS.phoneHref} style={{ color: VERMILION }}>
          {CONTACTS.phone}
        </a>
        .
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
        <a href="/" style={{ ...button, background: 'transparent', color: INK }}>
          На главную
        </a>
        <button type="button" style={button} onClick={() => window.location.reload()}>
          Обновить
        </button>
      </div>
    </main>
  );
}
