'use client';

import Link from 'next/link';
import { R, Split } from '../Reveal';

interface IndexSectionProps {
  totalBouquets: number;
}

export function IndexSection({ totalBouquets }: IndexSectionProps) {
  const rows = [
    {
      ix: '— 01',
      href: '/editorial',
      title: (
        <span>
          Философия названий · <em>Editorial</em>
        </span>
      ),
      sub: 'Спред · 4 главы',
      pg: 'P. 04',
    },
    {
      ix: '— 02',
      href: '/plates',
      title: (
        <span>
          Четыре коллекции · <em>Plates</em>
        </span>
      ),
      sub: `${totalBouquets} букетов`,
      pg: 'P. 12',
    },
    {
      ix: '— 03',
      href: '/atelier',
      title: (
        <span>
          Студия в Татарстане · <em>Atelier</em>
        </span>
      ),
      sub: 'Технология + история',
      pg: 'P. 22',
    },
    {
      ix: '— 04',
      href: '/catalog',
      title: (
        <span>
          Хиты сезона · <em>Catalog</em>
        </span>
      ),
      sub: 'Showcase + цены',
      pg: 'P. 28',
    },
    {
      ix: '— 05',
      href: '/care',
      title: (
        <span>
          Три правила ухода · <em>Care</em>
        </span>
      ),
      sub: 'Уход + FAQ',
      pg: 'P. 36',
    },
    {
      ix: '— 06',
      href: '/b2b',
      title: (
        <span>
          Корпоративным клиентам · <em>B2B</em>
        </span>
      ),
      sub: 'Брендирование · от 1 суток',
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
            {['Содержание.', '<em>Inhalt</em>']}
          </Split>
          <div className="index-list">
            {rows.map((r, i) => (
              <R key={i} delay={i * 60}>
                <Link href={r.href} className="index-row">
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
                </Link>
              </R>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
