'use client';

import { useState, type FormEvent } from 'react';
import { R, Split } from '../Reveal';
import { I } from '../Icons';

export function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText('VISITKA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setEmail('');
  };

  return (
    <section className="subscribe">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24, color: 'var(--paper)' }}>
            <span className="num">P.&nbsp;42</span>
            <span className="lab" style={{ color: 'var(--paper)' }}>
              — Subscribe
            </span>
            <span className="sub" style={{ color: 'rgba(244,239,229,0.5)' }}>
              / −10% на первый заказ
            </span>
          </div>
        </R>
        <div className="subscribe-grid">
          <div>
            <R>
              <div className="kicker">✦ Первый заказ</div>
            </R>
            <Split as="h2" className="disp disp-md">
              {['Скидка <em>10%</em> на первый букет.']}
            </Split>
            <R delay={200}>
              <p className="sub">
                Подпишитесь на письмо студии — раз в&nbsp;месяц рассказываем о&nbsp;новых букетах
                и&nbsp;закрытых сериях. В&nbsp;ответ присылаем промокод на&nbsp;первый заказ.
              </p>
            </R>
            <R delay={320}>
              <div className="promo-code" onClick={copy}>
                <span>VISITKA10 · −10%</span>
                <span className="status">
                  {copied ? 'скопировано ✓' : 'нажмите чтобы скопировать'}
                </span>
              </div>
            </R>
          </div>
          <R delay={200}>
            <form className="sub-form" onSubmit={submit}>
              <div>
                <div className="field-label">— E-mail</div>
                <div className="field-row">
                  <input
                    type="email"
                    required
                    placeholder="your@email.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="sub-cta">
                <button type="submit" className="btn btn-light">
                  {sent ? 'Отправлено ✓' : 'Получить промокод'}{' '}
                  <span className="arrow">
                    <I.Arrow />
                  </span>
                </button>
                <a href="#" className="link-u" style={{ color: 'var(--paper)' }}>
                  Открыть в MAX{' '}
                  <span className="arrow">
                    <I.Arrow />
                  </span>
                </a>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(244,239,229,0.55)',
                  letterSpacing: '0.06em',
                  lineHeight: 1.6,
                  maxWidth: 380,
                  marginTop: 8,
                }}
              >
                Подписываясь, вы соглашаетесь с&nbsp;Политикой конфиденциальности. Отписаться можно
                в&nbsp;один клик из&nbsp;любого письма.
              </div>
            </form>
          </R>
        </div>
      </div>
    </section>
  );
}
