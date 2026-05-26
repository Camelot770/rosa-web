'use client';

import { R, Split } from '../Reveal';

const rules = [
  {
    n: '01',
    t: (
      <span>
        Не <em>сухоцвет.</em>
      </span>
    ),
    d: 'Лепестки сохраняют упругость и&nbsp;тактильную мягкость. Их можно касаться без трещин и&nbsp;осыпания.',
  },
  {
    n: '02',
    t: (
      <span>
        Не <em>химия.</em>
      </span>
    ),
    d: 'В&nbsp;основе технологии&nbsp;— природный сок и&nbsp;пищевой глицерин.',
  },
  {
    n: '03',
    t: (
      <span>
        Не <em>искусственно.</em>
      </span>
    ),
    d: 'Настоящие срезанные цветы. Каждый лепесток и&nbsp;лист&nbsp;— живой материал, остановленный во&nbsp;времени.',
  },
];

export function CareSection() {
  return (
    <section className="care-section" id="care">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;36</span>
            <span className="lab">— Care</span>
            <span className="sub">/ Три правила</span>
          </div>
        </R>
        <R>
          <div className="care-head">
            <Split as="h2" className="disp disp-xl">
              {['Три «не», которые', 'делают букет <em>настоящим.</em>']}
            </Split>
          </div>
        </R>
        <div className="care-rules">
          {rules.map((p, i) => (
            <R key={i} delay={i * 100}>
              <div className="care-rule">
                <div className="n">— {p.n}</div>
                <h3>{p.t}</h3>
                <p dangerouslySetInnerHTML={{ __html: p.d }} />
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}
