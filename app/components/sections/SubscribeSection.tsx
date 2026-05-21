'use client';

import { useState } from 'react';
import Link from 'next/link';
import { R, Split } from '../Reveal';

export function SubscribeSection() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText('VISITKA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="subscribe">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24, color: 'var(--paper)' }}>
            <span className="num">P.&nbsp;42</span>
            <span className="lab" style={{ color: 'var(--paper)' }}>
              — Promo
            </span>
            <span className="sub" style={{ color: 'rgba(244,239,229,0.5)' }}>
              / −10% на первый заказ
            </span>
          </div>
        </R>

        <div className="promo-block">
          <R>
            <div className="kicker">✦ Первый заказ</div>
          </R>
          <Split as="h2" className="disp disp-md">
            {['Скидка <em>10%</em> на первый букет.']}
          </Split>
          <R delay={200}>
            <p className="sub">
              Введите промокод при&nbsp;оформлении заказа&nbsp;— получите −10% к&nbsp;стоимости
              букетов. Действует на&nbsp;первый заказ с&nbsp;сайта.
            </p>
          </R>
          <R delay={320}>
            <div className="promo-code" onClick={copy} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') copy(); }}>
              <span>VISITKA10 · −10%</span>
              <span className="status">
                {copied ? 'скопировано ✓' : 'нажмите чтобы скопировать'}
              </span>
            </div>
          </R>
          <R delay={420}>
            <div className="promo-hint">
              <Link href="/catalog" className="link-u" style={{ color: 'var(--paper)' }}>
                Открыть каталог →
              </Link>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}
