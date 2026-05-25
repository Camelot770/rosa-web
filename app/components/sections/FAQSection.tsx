'use client';

import { useState } from 'react';
import { R, Split } from '../Reveal';

const faqs: Array<{ q: string; a: string }> = [
  {
    q: 'Что такое стабилизированные цветы?',
    a: 'Это натуральные растения, прошедшие специальную обработку: природный сок замещён безопасным раствором. В&nbsp;результате цветы сохраняют естественный вид, гибкость и&nbsp;текстуру на&nbsp;годы&nbsp;— без воды и&nbsp;ухода.',
  },
  {
    q: 'Чем они отличаются от сухоцветов?',
    a: 'Сухоцветы полностью обезвожены&nbsp;— они хрупкие и&nbsp;ломкие. Стабилизированные цветы остаются эластичными, выглядят живыми, не&nbsp;осыпаются. Внешним видом и&nbsp;тактильными ощущениями не&nbsp;отличаются от&nbsp;свежих.',
  },
  {
    q: 'Сколько прослужат такие букеты?',
    a: 'При правильном уходе&nbsp;— от&nbsp;2 до&nbsp;5 лет. Срок зависит от&nbsp;условий: влажности, освещения и&nbsp;механических воздействий.',
  },
  {
    q: 'Нужно ли поливать или опрыскивать стабилизированные цветы?',
    a: 'Нет. Полив, опрыскивание и&nbsp;погружение в&nbsp;воду запрещены&nbsp;— это разрушит стабилизирующий состав.',
  },
  {
    q: 'Есть ли у них запах?',
    a: 'В&nbsp;базовом виде&nbsp;— нет. Исключение: лаванда, эвкалипт и&nbsp;хвойные сохраняют лёгкий природный аромат. По&nbsp;желанию можно добавить аромат с&nbsp;помощью эфирных масел.',
  },
  {
    q: 'Можно ли заказать букет в другой город?',
    a: 'Да. Доставка по&nbsp;Казани&nbsp;— нашим курьером, по&nbsp;Татарстану и&nbsp;другим регионам&nbsp;— через СДЭК или&nbsp;EMS. Стабилизированный букет переносит транспортировку лучше, чем срезанные цветы.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;34</span>
            <span className="lab">— FAQ</span>
            <span className="sub">/ Частые вопросы</span>
          </div>
        </R>

        <div className="faq-head">
          <Split as="h2" className="disp disp-md">
            {['Шесть вопросов, которые задают <em>чаще всего.</em>']}
          </Split>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <R key={i} delay={i * 50}>
                <div className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-num">— {String(i + 1).padStart(2, '0')}</span>
                    <span className="faq-text">{f.q}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div className="faq-a" hidden={!isOpen}>
                    <p dangerouslySetInnerHTML={{ __html: f.a }} />
                  </div>
                </div>
              </R>
            );
          })}
        </div>
      </div>
    </section>
  );
}
