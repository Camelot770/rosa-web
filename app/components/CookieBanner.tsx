'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'rosa-cookies-v1';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (!v) setVisible(true);
    } catch {
      // localStorage unavailable — skip the banner rather than crash.
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookies notice">
      <div className="cookie-text">
        <span className="ast">✦</span>{' '}
        Мы используем файлы&nbsp;cookie, чтобы сайт корректно работал и&nbsp;запоминал ваш выбор.
        Подробности&nbsp;— в&nbsp;{' '}
        <Link href="/privacy">Политике конфиденциальности</Link>.
      </div>
      <button type="button" className="cookie-btn" onClick={accept}>
        Согласен
      </button>
    </div>
  );
}
