import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rosa-web.vercel.app'),
  title: 'Роза Цветов · Numéro 001 — Editorial',
  description:
    'Журнал-каталог студии стабилизированной флористики «Роза Цветов». Issue №001 · Май 2026.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    title: 'Роза Цветов · Numéro 001',
    description:
      'Стабилизированные букеты, которые живут 3–5 лет без воды и ухода. Студия в Татарстане.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/*
          next/font is not used here because DM Sans / JetBrains Mono need the
          cyrillic subset and the next/font metadata in 14.2 only exposes latin
          for these. The CDN <link> mirrors what the v3 static site shipped.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Italiana&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
