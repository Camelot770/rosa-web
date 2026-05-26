'use client';

import { useState } from 'react';
import Link from 'next/link';
import { R, Split } from '../Reveal';
import { I } from '../Icons';
import { FavoriteToggle } from '../FavoriteToggle';
import type { Bouquet, CollectionEn } from '@/lib/bouquets-data';

type FilterValue = 'All' | CollectionEn;
const filters: FilterValue[] = ['All', 'Solo', 'Duet', 'Quartet', 'Orchestra'];

/** Display labels in Russian; URL filter values stay English for clean
 *  ?filter=Solo links and stable bookmarks. */
const FILTER_LABELS: Record<FilterValue, string> = {
  All: 'Все',
  Solo: 'Соло',
  Duet: 'Дуэт',
  Quartet: 'Квартет',
  Orchestra: 'Оркестр',
};

interface CatalogSpreadProps {
  bouquets: Bouquet[];
  initialFilter?: FilterValue;
  /**
   * When set, render as a preview: hide the filter row, show only the first
   * `limit` items, and append a "view all" CTA at the bottom that links to
   * the full /catalog page. When undefined the component is the full catalog
   * (filter row visible, every bouquet shown).
   */
  limit?: number;
}

const fmt = (n: number) => n.toLocaleString('ru-RU');

export function CatalogSpread({ bouquets, initialFilter = 'All', limit }: CatalogSpreadProps) {
  const [active, setActive] = useState<FilterValue>(initialFilter);
  const isPreview = typeof limit === 'number' && limit > 0;
  const allItems = active === 'All' ? bouquets : bouquets.filter((b) => b.collectionEn === active);
  const items = isPreview ? allItems.slice(0, limit) : allItems;
  const total = bouquets.length;

  return (
    <section className="catalog-spread" id="catalog">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;28</span>
            <span className="lab">— Каталог</span>
            <span className="sub">/ {active === 'All' ? 'все коллекции' : `коллекция «${FILTER_LABELS[active]}»`}</span>
          </div>
        </R>
        <div className="spread-head">
          <Split as="h2" className="disp disp-xl">
            {isPreview
              ? ['Хиты <em>сезона.</em>']
              : active === 'All'
                ? ['Каталог <em>букетов.</em>']
                : ['Коллекция', `<em>«${FILTER_LABELS[active]}».</em>`]}
          </Split>
          <R delay={150}>
            <Link className="link-u" href="/catalog">
              {isPreview ? `Все ${total} букетов` : 'Заказать букет'}{' '}
              <span className="arrow">
                <I.Arrow />
              </span>
            </Link>
          </R>
        </div>

        {!isPreview && (
          <R>
            <div className="filter-row">
              <span className="lbl">Фильтр ✦</span>
              {filters.map((f) => (
                <button
                  key={f}
                  className={`filter-pill ${active === f ? 'active' : ''}`}
                  onClick={() => setActive(f)}
                >
                  {FILTER_LABELS[f]}
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
        )}

        <div className="spread-grid">
          {items.map((b, i) => {
            const img = b.images[0];
            const ix = `№ ${String(b.no).padStart(3, '0')}`;
            return (
              <R key={`${active}-${b.id}`} delay={Math.min(i, 12) * 40}>
                <Link className="spread-card" href={`/product/${b.id}`}>
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
                    <FavoriteToggle bouquet={b} variant="card" />
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
                </Link>
              </R>
            );
          })}
        </div>

        {isPreview && (
          <R delay={200}>
            <div className="spread-more">
              <Link href="/catalog" className="btn">
                Посмотреть ещё · {total - items.length} букетов{' '}
                <span className="arrow">
                  <I.Arrow />
                </span>
              </Link>
            </div>
          </R>
        )}
      </div>
    </section>
  );
}
