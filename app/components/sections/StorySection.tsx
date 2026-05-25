'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { R, Split } from '../Reveal';
import { I } from '../Icons';

export function StorySection() {
  const visRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = visRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in');
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="story-section" id="atelier">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 32 }}>
            <span className="num">P.&nbsp;22</span>
            <span className="lab">— Atelier</span>
            <span className="sub">/ Студия в Татарстане</span>
          </div>
        </R>

        <div className="story-grid">
          <div className="story-visual" ref={visRef} data-label="">
            <div
              className="photo"
              style={{
                backgroundImage: 'url("/site-photos/atelier-studio.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="stamp">
              est.
              <br />
              <em>2017</em>
            </div>
          </div>
          <div className="story-body">
            <R>
              <div className="meta-row">
                <span className="dot" />
                <span>Atelier · Kazan · Tatarstan</span>
              </div>
            </R>
            <Split as="h2" className="disp disp-xl">
              {['Девять лет', '<em>работы.</em>']}
            </Split>
            <R delay={300}>
              <p>
                Мы делаем стабилизированные букеты с&nbsp;2017&nbsp;года. Цветы срезают
                в&nbsp;момент идеального раскрытия и&nbsp;на&nbsp;несколько недель погружают
                в&nbsp;натуральные растительные соки&nbsp;— по&nbsp;запатентованной российской
                технологии{' '}
                <strong>патенту RU&nbsp;2&#8202;698&#8202;058</strong>
                .
              </p>
            </R>
            <R delay={400}>
              <p>
                Срок жизни букета&nbsp;— от&nbsp;трёх до&nbsp;пяти лет. Без&nbsp;воды, без&nbsp;пыли,
                без&nbsp;аллергии. Каждый собран вручную в&nbsp;Казани и&nbsp;уходит к&nbsp;вам
                с&nbsp;именным сертификатом подлинности.
              </p>
            </R>
            <R delay={500}>
              <div className="story-stats">
                <div className="story-stat">
                  <div className="v">
                    <em>9</em>
                  </div>
                  <div className="k">лет студии</div>
                </div>
                <div className="story-stat">
                  <div className="v">3&#8202;200</div>
                  <div className="k">букетов</div>
                </div>
                <div className="story-stat">
                  <div className="v">
                    <em>
                      72<sup style={{ fontSize: '0.5em' }}>%</sup>
                    </em>
                  </div>
                  <div className="k">повторных заказов</div>
                </div>
              </div>
            </R>
            <R delay={600}>
              <Link className="btn btn-outline" href="/#patent">
                Технология стабилизации{' '}
                <span className="arrow">
                  <I.Arrow />
                </span>
              </Link>
            </R>
          </div>
        </div>
      </div>
    </section>
  );
}
