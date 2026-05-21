/* =========================================================================
   РОЗА ЦВЕТОВ · V4 — "Numéro · Editorial"
   ========================================================================= */

const { useState, useEffect, useRef } = React;

const I = {
  Arrow: ({ size = 16, dir = 'right' }) => {
    const rot = dir === 'left' ? 180 : dir === 'down' ? 90 : dir === 'up' ? -90 : 0;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
      </svg>
    );
  },
  ArrowUp: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  ),
  Search: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
    </svg>
  ),
  Bag: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  ),
  Heart: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    </svg>
  ),
};

function Split({ children, as = 'span', className = '', delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fb = setTimeout(() => setShown(true), 2200 + delay);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95) {
      setTimeout(() => setShown(true), delay);
      return () => clearTimeout(fb);
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setTimeout(() => setShown(true), delay); obs.disconnect(); }});
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => { obs.disconnect(); clearTimeout(fb); };
  }, [delay]);
  const lines = Array.isArray(children) ? children : [children];
  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="sl">
          <span className={shown ? 'in' : ''} style={{ transitionDelay: `${i * 90}ms` }} dangerouslySetInnerHTML={{ __html: l }} />
        </span>
      ))}
    </Tag>
  );
}

function R({ children, delay = 0, as = 'div', className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fb = setTimeout(() => setShown(true), 2200 + delay);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
      setTimeout(() => setShown(true), delay);
      return () => clearTimeout(fb);
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setTimeout(() => setShown(true), delay); obs.disconnect(); }});
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    obs.observe(el);
    return () => { obs.disconnect(); clearTimeout(fb); };
  }, [delay]);
  const Tag = as;
  return <Tag ref={ref} className={`r ${className} ${shown ? 'in' : ''}`}>{children}</Tag>;
}

function Intro() {
  const [gone, setGone] = useState(false);
  const [removed, setRemoved] = useState(false);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setGone(true), 2300);
    const r = setTimeout(() => setRemoved(true), 3700);
    const release = setTimeout(() => { document.body.style.overflow = ''; }, 2500);
    return () => { clearTimeout(t); clearTimeout(r); clearTimeout(release); };
  }, []);
  if (removed) return null;
  return (
    <div className={`intro ${gone ? 'gone' : ''}`}>
      <div className="intro-issue">№ 001 · Май 2026</div>
      <div className="intro-name"><em>Роза</em> Цветов</div>
      <div className="intro-bar" />
      <div className="intro-meta">— Editorial · est. 2017 · Tatarstan —</div>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="masthead-top">
        <div>
          <span className="ast">✦</span>&nbsp;&nbsp;№ 001 · Сезон Май 2026 · 73 букета
        </div>
        <div>Atelier · est. 2017 · Tatarstan</div>
        <div style={{ fontFamily: 'var(--mono)' }}>+7 960 045 39 96</div>
      </div>
      <div className="masthead">
        <a className="brand-name" href="#top">
          <em>Роза</em>&nbsp;Цветов
        </a>
        <nav className="nav">
          <a href="#index">Indice</a>
          <a href="#editorial">Editorial</a>
          <a href="#plates">Plates</a>
          <a href="#atelier">Atelier</a>
          <a href="#catalog">Catalog</a>
          <a href="#care">Care</a>
        </nav>
        <div className="header-right">
          <button className="icon-btn" aria-label="Поиск"><I.Search /></button>
          <button className="icon-btn" aria-label="Избранное"><I.Heart /></button>
          <button className="icon-btn" aria-label="Корзина">
            <I.Bag /><span className="cart-badge">2</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contacts">
      <div className="container">
        <R>
          <h2 className="footer-big">
            Букет&nbsp;на&nbsp;<em>годы.</em>
          </h2>
        </R>
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div style={{ fontFamily: 'var(--display)', fontSize: 32 }}><em style={{fontStyle:'italic',color:'var(--vermilion)'}}>Роза</em> Цветов</div>
            <p className="lead-line">«Живые цветы,<br/>которые не вянут».</p>
            <div className="caps" style={{ color: 'var(--vermilion)' }}>✦ Made in Tatarstan</div>
          </div>
          <div className="footer-col">
            <h4>Catalog</h4>
            <ul>
              <li><a href="#">Все 73 букета</a></li>
              <li><a href="#">Утренний свет</a></li>
              <li><a href="#">Шёлковая</a></li>
              <li><a href="#">Будуарная</a></li>
              <li><a href="#">Atelier Luxe</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Atelier</h4>
            <ul>
              <li><a href="#">Editorial</a></li>
              <li><a href="#">Технология</a></li>
              <li><a href="#">Care</a></li>
              <li><a href="#">Сертификат</a></li>
              <li><a href="#">Сотрудничество</a></li>
              <li><a href="privacy.html">Политика конфиденциальности</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+79600453996">+7 960 045 39 96</a></li>
              <li><a href="mailto:rozasvetov@bk.ru">rozasvetov@bk.ru</a></li>
              <li style={{ opacity: 0.7 }}>Казань · Татарстан</li>
              <li style={{ opacity: 0.7 }}>9:00 — 21:00</li>
              <li><a href="#">Telegram · MAX</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 РОЗА ЦВЕТОВ · PATENT RU 2 451 833</div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            <a href="privacy.html">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Реквизиты</a>
            <a href="#">Issue №001 / May 2026</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { I, Split, R, Intro, Header, Footer });
