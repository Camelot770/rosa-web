'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { R, Split } from '../Reveal';
import { I } from '../Icons';
import { SeasonLabel } from '../SeasonLabel';
import { CONTACTS } from '@/lib/contacts';
import type { Bouquet } from '@/lib/bouquets-data';

interface HeroSectionProps {
  totalBouquets: number;
  /** Featured bouquet to put in the magazine-cover slot. Falls back to a
   *  decorative placeholder when null. */
  featured?: Bouquet | null;
}

const fmt = (n: number) => n.toLocaleString('ru-RU').replace(/ /g, ' ');

export function HeroSection({ totalBouquets, featured }: HeroSectionProps) {
  const photoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (photoRef.current) photoRef.current.classList.add('in');
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="container">
        <R>
          <div className="section-bar" style={{ marginBottom: 32, border: 'none', padding: 0 }}>
            <div className="left">
              <span className="ast">✦</span> <span>P.01 · Cover</span>
            </div>
            <div className="right">
              <SeasonLabel />
              <span className="ast">✦</span>
            </div>
          </div>
        </R>

        <div className="hero-cover">
          <Split as="h1" className="cover-headline">
            {['Живые', '<em>цветы,</em>', 'которые', 'не&nbsp;вянут.']}
          </Split>
        </div>

        <div className="hero-main">
          <div className="hero-left">
            <R delay={1000}>
              <p className="epigraph">
                «Имена живут в одном&nbsp;ряду&nbsp;— от&nbsp;воздуха к&nbsp;камню.{' '}
                <em>Чем сложнее композиция, тем&nbsp;«весомее» её имя».</em>
              </p>
            </R>
            <R delay={1150}>
              <p className="body-text">
                Стабилизированные букеты студии <strong>«Роза Цветов»</strong>&nbsp;— настоящие
                срезанные цветы, прошедшие глубокую стабилизацию натуральными растительными соками.
                Сохраняют форму, цвет и&nbsp;мягкость&nbsp;— до пяти лет без воды и&nbsp;ухода.
                Запатентованная технология стабилизации, патент{' '}
                <span className="mono">RU&nbsp;2&#8202;698&#8202;058</span>.
              </p>
            </R>
            <R delay={1280}>
              <div className="hero-ctas">
                <Link className="btn" href="/catalog">
                  Открыть каталог{' '}
                  <span className="arrow">
                    <I.Arrow />
                  </span>
                </Link>
                <Link className="link-u" href="/editorial">
                  Философия названий{' '}
                  <span className="arrow">
                    <I.Arrow />
                  </span>
                </Link>
              </div>
            </R>
          </div>

          <div className="hero-right">
            <R delay={1100}>
              <Link
                href={featured ? `/product/${featured.id}` : '/catalog'}
                className="cover-photo"
                ref={photoRef as React.RefObject<HTMLAnchorElement>}
                data-label={featured ? '' : 'cover · plate i · 4:5'}
                aria-label={featured ? `Букет «${featured.name}»` : 'Каталог'}
              >
                <div className="corner-tape" />
                <div className="plate-tag">
                  <span className="v"><SeasonLabel format="plate" /></span> · Plate I
                </div>
                <div
                  className="photo"
                  style={
                    featured && featured.images[0]
                      ? {
                          backgroundImage: `url("${featured.images[0]}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : undefined
                  }
                />
              </Link>
            </R>
            <R delay={1200}>
              <div className="cover-caption">
                <span>
                  <strong>Pl.&nbsp;I</strong> · «{featured ? featured.name : 'Палаццо'}»
                </span>
                <span>{featured ? featured.collection : 'Atelier Luxe'}</span>
                <span>
                  <strong>{fmt(featured ? featured.price : 9800)}&nbsp;₽</strong>
                </span>
              </div>
            </R>
          </div>
        </div>

        <R delay={1100}>
          <div className="facts-strip">
            <div className="fact">
              <span className="lab">Anno</span>
              <span className="val">2017</span>
              <span className="meta">девять лет atelier в&nbsp;Казани</span>
            </div>
            <div className="fact">
              <span className="lab">Букетов</span>
              <span className="val">
                <em>{totalBouquets}</em>
              </span>
              <span className="meta">в каталоге · 4 коллекции</span>
            </div>
            <div className="fact">
              <span className="lab">Срок жизни</span>
              <span className="val">3—5</span>
              <span className="meta">лет без&nbsp;воды и&nbsp;ухода</span>
            </div>
            <div className="fact">
              <span className="lab">Технология</span>
              <span className="val" style={{ fontSize: '28px' }}>
                Patent
              </span>
              <span className="meta">№&nbsp;2&#8202;698&#8202;058 · технология стабилизации</span>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}
