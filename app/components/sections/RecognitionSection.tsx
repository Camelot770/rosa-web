'use client';

import { R, Split } from '../Reveal';

const photos = [
  {
    src: '/site-photos/minnikhanov-1.webp',
    alt: 'Раис Татарстана Рустам Минниханов у композиции «Роза Цветов» на форуме Kazan Expo',
    caption: 'Kazan Expo · знакомство с технологией',
  },
  {
    src: '/site-photos/minnikhanov-2.webp',
    alt: 'Основательница «Роза Цветов» Елена Коган представляет букет Рустаму Минниханову',
    caption: 'Презентация запатентованной технологии',
  },
  {
    src: '/site-photos/minnikhanov-3.webp',
    alt: 'Рустам Минниханов и Елена Коган у стенда «Роза Цветов»',
    caption: 'На форумах Республики Татарстан',
  },
];

export function RecognitionSection() {
  return (
    <section className="recognition-section" id="recognition">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;22</span>
            <span className="lab">— Recognition</span>
            <span className="sub">/ В&nbsp;прессе и&nbsp;на&nbsp;форумах</span>
          </div>
        </R>

        <div className="recognition-head">
          <div>
            <R>
              <div className="kicker">✦ Признание</div>
            </R>
            <Split as="h2" className="disp disp-lg">
              {['Технологию', '<em>видели первые лица.</em>']}
            </Split>
          </div>
          <R delay={150}>
            <p className="recognition-lead">
              Основатель студии Елена&nbsp;Коган представляла стабилизированные композиции
              «Роза&nbsp;Цветов» на&nbsp;форумах Республики&nbsp;Татарстан&nbsp;— в&nbsp;том числе
              Раису&nbsp;Татарстана <strong>Рустаму&nbsp;Минниханову</strong> на&nbsp;Kazan&nbsp;Expo.
            </p>
          </R>
        </div>

        <div className="recognition-grid">
          {photos.map((p, i) => (
            <R key={i} delay={i * 120}>
              <figure className="recognition-figure">
                <div
                  className="recognition-photo"
                  role="img"
                  aria-label={p.alt}
                  style={{ backgroundImage: `url("${p.src}")` }}
                />
                <figcaption className="recognition-caption">
                  <span className="rcap-no">— {String(i + 1).padStart(2, '0')}</span>
                  <span className="rcap-text">{p.caption}</span>
                </figcaption>
              </figure>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}
