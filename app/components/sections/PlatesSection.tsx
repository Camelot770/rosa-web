'use client';

import { R, Split } from '../Reveal';
import { I } from '../Icons';
import type { Bouquet, Collection } from '@/lib/bouquets-data';

interface PlatesSectionProps {
  bouquets: Bouquet[];
}

interface CollDef {
  roman: string;
  lbl: Collection;
  name: string;
  it: string;
}

const COLLS: CollDef[] = [
  { roman: 'I', lbl: 'Утренний свет', name: 'Morning', it: ' Light' },
  { roman: 'II', lbl: 'Шёлковая', name: 'Silk', it: '' },
  { roman: 'III', lbl: 'Будуарная', name: 'Boudoir', it: '' },
  { roman: 'IV', lbl: 'Atelier Luxe', name: 'Atelier', it: ' Luxe' },
];

const fmt = (n: number) => n.toLocaleString('ru-RU');

export function PlatesSection({ bouquets }: PlatesSectionProps) {
  const plates = COLLS.map((p) => {
    const items = bouquets.filter((b) => b.collection === p.lbl);
    if (!items.length) return { ...p, meta: '', hero: null as string | null };
    const prices = items.map((b) => b.price);
    const lo = Math.min(...prices);
    const hi = Math.max(...prices);
    const meta =
      lo === hi
        ? `${items.length} букетов · ${fmt(lo)} ₽`
        : `${items.length} букетов · ${fmt(lo)}–${fmt(hi)} ₽`;
    const hero = items[0].images[0] ?? null;
    return { ...p, meta, hero };
  });

  return (
    <section className="plates-section" id="plates">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;12</span>
            <span className="lab">— Plates</span>
            <span className="sub">/ Коллекции I–IV</span>
          </div>
        </R>
        <div className="plates-header">
          <Split as="h2" className="disp disp-xl">
            {['Plates <em>I — IV.</em>']}
          </Split>
          <R delay={150}>
            <a className="link-u" href="#catalog">
              Все {bouquets.length} букетов{' '}
              <span className="arrow">
                <I.Arrow />
              </span>
            </a>
          </R>
        </div>

        <div className="plates">
          {plates.map((p, i) => (
            <R key={i} delay={i * 100}>
              <a className="plate" href="#catalog">
                <div className="plate-photo">
                  <div
                    className="photo"
                    data-label=""
                    style={
                      p.hero
                        ? {
                            backgroundImage: `url("${p.hero}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : undefined
                    }
                  />
                  <div className="plate-tag">Plate {p.roman}</div>
                  <div className="ru-no">№ 0{i + 1}</div>
                </div>
                <div className="plate-info">
                  <div>
                    <div className="lbl">{p.lbl}</div>
                    <div className="nm">
                      {p.name}
                      {p.it ? <em>{p.it}</em> : null}
                    </div>
                    <div className="meta">{p.meta}</div>
                  </div>
                  <span className="arrow-link">
                    <I.Arrow size={16} />
                  </span>
                </div>
              </a>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}
