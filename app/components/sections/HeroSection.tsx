'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { R, Split } from '../Reveal';
import { I } from '../Icons';

interface HeroSectionProps {
  totalBouquets: number;
}

export function HeroSection({ totalBouquets }: HeroSectionProps) {
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
              <span>Issue № 001 · Сезон Май 2026</span>
              <span className="ast">✦</span>
            </div>
          </div>
        </R>

        <div className="hero-cover">
          <Split as="h1" className="cover-headline">
            {['<em>Цветы,</em>', 'которые', 'не&nbsp;вянут.']}
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
                Технология Rosaflorero<sup>®</sup>, патент{' '}
                <span className="mono">RU&nbsp;2&#8202;451&#8202;833</span>.
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
                <a className="link-u" href="#editorial">
                  Философия названий{' '}
                  <span className="arrow">
                    <I.Arrow />
                  </span>
                </a>
              </div>
            </R>
          </div>

          <div className="hero-right">
            <R delay={1100}>
              <div className="cover-photo" ref={photoRef} data-label="palazzo · plate i · 4:5">
                <div className="corner-tape" />
                <div className="plate-tag">
                  <span className="v">№ 001</span> · Plate I
                </div>
                <div className="photo" />
              </div>
            </R>
            <R delay={1200}>
              <div className="cover-caption">
                <span>
                  <strong>Pl.&nbsp;I</strong> · «Палаццо»
                </span>
                <span>Atelier Luxe</span>
                <span>
                  <strong>9&#8202;800&nbsp;₽</strong>
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
                Rosaflorero<sup style={{ fontSize: '0.5em' }}>®</sup>
              </span>
              <span className="meta">патент RU&nbsp;2&#8202;451&#8202;833</span>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}
