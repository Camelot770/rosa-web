'use client';

import { R, Split } from '../Reveal';

interface PatentItem {
  code: string;
  title: string;
  text: string;
  image?: string;
}

const items: PatentItem[] = [
  {
    code: '№ 2 698 058',
    title: 'Патент на технологию',
    text:
      'Технология стабилизации цветов, мха и&nbsp;растений разработана компанией «Роза Цветов» и&nbsp;запатентована в&nbsp;Роспатенте. Цветы, стабилизированные по&nbsp;нашей технологии, будут радовать не&nbsp;один год.',
  },
  {
    code: 'ЭКО',
    title: 'Экологическая безопасность',
    text:
      'Сертификат соответствия требованиям экологической безопасности. Стабилизирующий состав на&nbsp;основе пищевого глицерина и&nbsp;натуральных растительных пигментов.',
  },
  {
    code: '™',
    title: 'Товарный знак',
    text:
      'Товарный знак «Роза Цветов» зарегистрирован в&nbsp;Роспатенте. Гарантирует, что вы получаете оригинальный продукт от&nbsp;студии, а&nbsp;не&nbsp;кустарную перепродажу.',
  },
];

export function PatentSection() {
  return (
    <section className="patent-section" id="patent">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;24</span>
            <span className="lab">— Trust</span>
            <span className="sub">/ Патент и сертификаты</span>
          </div>
        </R>

        <div className="patent-head">
          <Split as="h2" className="disp disp-xl">
            {['Продукт, которому', '<em>можно доверять.</em>']}
          </Split>
          <R delay={150}>
            <p className="patent-lead">
              Технология стабилизации&nbsp;— запатентована. На&nbsp;состав&nbsp;— экологический
              сертификат. Имя закреплено зарегистрированным товарным знаком. Три документа
              за&nbsp;каждым букетом&nbsp;— поэтому он живёт у&nbsp;вас годами, а&nbsp;не&nbsp;неделями.
            </p>
          </R>
        </div>

        <div className="patent-grid">
          {items.map((it, i) => (
            <R key={i} delay={i * 80}>
              <div className="patent-card">
                {it.image && (
                  <div
                    className="patent-image"
                    style={{ backgroundImage: `url("${it.image}")` }}
                    aria-hidden="true"
                  />
                )}
                <div className="patent-code">{it.code}</div>
                <div className="patent-title">{it.title}</div>
                <p className="patent-text" dangerouslySetInnerHTML={{ __html: it.text }} />
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}
