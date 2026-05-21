'use client';

import { R, Split } from '../Reveal';

interface IndexSectionProps {
  totalBouquets: number;
}

export function IndexSection({ totalBouquets }: IndexSectionProps) {
  const rows = [
    {
      ix: '— 01',
      title: (
        <span>
          Editorial · <em>Философия названий</em>
        </span>
      ),
      sub: 'Спред · 4 главы',
      pg: 'P. 04',
    },
    {
      ix: '— 02',
      title: (
        <span>
          Plates · <em>Четыре коллекции</em>
        </span>
      ),
      sub: `${totalBouquets} букетов`,
      pg: 'P. 12',
    },
    {
      ix: '— 03',
      title: (
        <span>
          <em>Atelier</em> · Студия в Татарстане
        </span>
      ),
      sub: 'Технология + история',
      pg: 'P. 22',
    },
    {
      ix: '— 04',
      title: (
        <span>
          <em>Catalog</em> · Хиты сезона
        </span>
      ),
      sub: 'Showcase + цены',
      pg: 'P. 28',
    },
    {
      ix: '— 05',
      title: (
        <span>
          <em>Care</em> · Три правила
        </span>
      ),
      sub: 'Уход + FAQ',
      pg: 'P. 36',
    },
    {
      ix: '— 06',
      title: (
        <span>
          <em>Subscribe</em> · Промокод
        </span>
      ),
      sub: '−10% на первый заказ',
      pg: 'P. 42',
    },
  ];

  return (
    <section className="index-page" id="index">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 32 }}>
            <span className="num">P.&nbsp;02</span>
            <span className="lab">— Indice</span>
            <span className="sub">/ Содержание</span>
          </div>
        </R>
        <div className="index-grid">
          <Split as="h2" className="disp disp-lg">
            {['Inhalt.', '<em>Содержание</em>']}
          </Split>
          <div className="index-list">
            {rows.map((r, i) => (
              <R key={i} delay={i * 60}>
                <a href="#" className="index-row">
                  <span className="ix">{r.ix}</span>
                  <span>
                    <span className="ttl">{r.title}</span>
                    <div className="sub" style={{ marginTop: 8 }}>
                      {r.sub}
                    </div>
                  </span>
                  <span className="sub" style={{ alignSelf: 'center' }}>
                    ↗
                  </span>
                  <span className="pg">{r.pg}</span>
                </a>
              </R>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
