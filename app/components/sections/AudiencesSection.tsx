'use client';

import Link from 'next/link';
import { R, Split } from '../Reveal';
import { I } from '../Icons';

const cards = [
  {
    no: '01',
    photo: '/site-photos/audience-gift.png',
    title: (
      <>
        Подарок <em>со&nbsp;смыслом</em>
      </>
    ),
    text: 'Когда важно не ошибиться и не разочаровать. День рождения, юбилей, 8 марта, важная дата.',
    cta: 'Выбрать букет',
    href: '/catalog',
    chips: ['8 марта', 'юбилей', 'свадьба'],
  },
  {
    no: '02',
    photo: '/site-photos/audience-interior.png',
    title: (
      <>
        Для дома <em>и интерьера</em>
      </>
    ),
    text: 'Красота без ухода и бытовых хлопот. Композиция стоит на консоли, у окна, на каминной полке — годами.',
    cta: 'Интерьерные композиции',
    href: '/catalog',
    chips: ['интерьер', 'кашпо', 'персонально'],
  },
  {
    no: '03',
    photo: '/site-photos/audience-business.png',
    title: (
      <>
        Для бизнеса <em>и партнёров</em>
      </>
    ),
    text: 'Подарки, которые не выбрасывают. Брендированные вазы, фирменные ленты и коробки, корпоративные тиражи.',
    cta: 'Корпоративным клиентам',
    href: '/b2b',
    chips: ['брендирование', 'тираж', 'брендированные вазы'],
  },
];

export function AudiencesSection() {
  return (
    <section className="audiences" id="audiences">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;01a</span>
            <span className="lab">— Audience</span>
            <span className="sub">/ Для кого мы делаем</span>
          </div>
        </R>

        <div className="aud-head">
          <Split as="h2" className="disp disp-lg">
            {['Букет на&nbsp;<em>годы</em>', 'для трёх разных историй.']}
          </Split>
          <R delay={150}>
            <p className="aud-lead">
              Стабилизированные композиции одинаково хорошо живут на&nbsp;комоде у&nbsp;окна
              и&nbsp;в&nbsp;ресепшен бизнес-центра. Меняется только повод.
            </p>
          </R>
        </div>

        <div className="aud-grid">
          {cards.map((c, i) => (
            <R key={i} delay={i * 100}>
              <Link href={c.href} className="aud-card">
                <div
                  className="aud-photo"
                  style={{ backgroundImage: `url("${c.photo}")` }}
                  aria-hidden="true"
                />
                <div className="aud-body">
                  <div className="aud-no">— {c.no}</div>
                  <h3 className="aud-ttl">{c.title}</h3>
                  <p className="aud-text">{c.text}</p>
                  <div className="aud-chips">
                    {c.chips.map((chip) => (
                      <span key={chip} className="aud-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                  <span className="aud-cta">
                    {c.cta}{' '}
                    <span className="arrow">
                      <I.Arrow />
                    </span>
                  </span>
                </div>
              </Link>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}
