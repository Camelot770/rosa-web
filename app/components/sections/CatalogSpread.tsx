'use client';

import { useState } from 'react';
import { R, Split } from '../Reveal';
import { I } from '../Icons';
import type { Bouquet, CollectionEn } from '@/lib/bouquets-data';

interface CatalogSpreadProps {
  bouquets: Bouquet[];
}

type FilterValue = 'All' | CollectionEn;
const filters: FilterValue[] = ['All', 'Morning Light', 'Silk', 'Boudoir', 'Atelier Luxe'];

const fmt = (n: number) => n.toLocaleString('ru-RU');

export function CatalogSpread({ bouquets }: CatalogSpreadProps) {
  const [active, setActive] = useState<FilterValue>('All');
  const items = active === 'All' ? bouquets : bouquets.filter((b) => b.collectionEn === active);
  const total = bouquets.length;

  return (
    <section className="catalog-spread" id="catalog">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;28</span>
            <span className="lab">— Catalog</span>
            <span className="sub">/ Каталог букетов</span>
          </div>
        </R>
        <div className="spread-head">
          <Split as="h2" className="disp disp-xl">
            {['Каталог <em>букетов.</em>']}
          </Split>
          <R delay={150}>
            <a className="link-u" href="#contacts">
              Заказать букет{' '}
              <span className="arrow">
                <I.Arrow />
              </span>
            </a>
          </R>
        </div>

        <R>
          <div className="filter-row">
            <span className="lbl">Filter ✦</span>
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-pill ${active === f ? 'active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--ink-soft)',
              }}
            >
              {items.length} / {total}
            </span>
          </div>
        </R>

        <div className="spread-grid">
          {items.map((b, i) => {
            const img = b.images[0];
            const ix = `№ ${String(b.no).padStart(3, '0')}`;
            return (
              <R key={`${active}-${b.id}`} delay={Math.min(i, 12) * 40}>
                <a className="spread-card" href="#contacts">
                  <div className="ph">
                    <div
                      className="photo"
                      data-label=""
                      style={
                        img
                          ? {
                              backgroundImage: `url("${img}")`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }
                          : undefined
                      }
                    />
                    <span className="stamp-no">{ix}</span>
                    <div className="quick">
                      <span className="pill">Быстрый просмотр</span>
                    </div>
                  </div>
                  <div className="body">
                    <div>
                      <div className="cap">{b.collection}</div>
                      <div className="nm">
                        <em>«{b.name}»</em>
                      </div>
                    </div>
                    <div className="pr">
                      {b.oldPrice && b.oldPrice > b.price ? (
                        <span
                          style={{
                            color: 'var(--taupe)',
                            textDecoration: 'line-through',
                            marginRight: 8,
                            fontWeight: 400,
                          }}
                        >
                          {fmt(b.oldPrice)} ₽
                        </span>
                      ) : null}
                      {fmt(b.price)} ₽
                    </div>
                  </div>
                </a>
              </R>
            );
          })}
        </div>
      </div>
    </section>
  );
}
