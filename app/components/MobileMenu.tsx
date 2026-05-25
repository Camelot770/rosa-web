'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { I } from './Icons';

const links: Array<{ href: string; label: string; sub?: string }> = [
  { href: '/', label: 'Главная', sub: 'Обложка номера' },
  { href: '/catalog', label: 'Каталог', sub: 'Все 40 букетов' },
  { href: '/plates', label: 'Коллекции', sub: 'Четыре коллекции' },
  { href: '/editorial', label: 'Философия', sub: 'Имена и смыслы' },
  { href: '/atelier', label: 'Студия', sub: 'Ателье в Татарстане' },
  { href: '/care', label: 'Уход', sub: 'Три правила' },
  { href: '/stabilization', label: 'Стабилизация', sub: 'Что это такое' },
  { href: '/b2b', label: 'Корпоративам', sub: 'Брендирование · от 1 суток' },
  { href: '/favorites', label: 'Избранное', sub: 'Сохранённые букеты' },
  { href: '/cart', label: 'Корзина', sub: 'Оформление заказа' },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className={`hamburger ${open ? 'open' : ''}`}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="mobile-menu" onClick={close} role="dialog" aria-label="Меню сайта">
          <nav className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-head">
              <span className="caps">✦ Меню</span>
              <button type="button" className="mobile-menu-close" onClick={close} aria-label="Закрыть">
                ×
              </button>
            </div>
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close}>
                    <span className="ml-label">{l.label}</span>
                    {l.sub && <span className="ml-sub">{l.sub}</span>}
                    <span className="ml-arrow">
                      <I.Arrow size={14} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-menu-foot">
              <a href="tel:+79600483996">+7 960 048 39 96</a>
              <span className="caps">Без выходных · 9—21</span>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
