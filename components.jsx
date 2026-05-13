/* =========================================================
   Роза Цветов — Primitive Components, Header, Footer, Icons
   Exposes to window for cross-script use.
   ========================================================= */

const { useState, useEffect, useRef } = React;

/* ---------- Icons (thin botanical / utility line icons) ---------- */
const Icon = {
  Search: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  Bag: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1 12H6L5 8z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  ),
  Heart: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    </svg>
  ),
  Arrow: ({ size = 18, dir = 'right' }) => {
    const rot = dir === 'left' ? 180 : dir === 'down' ? 90 : dir === 'up' ? -90 : 0;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  },
  Burger: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M4 8h16" /><path d="M4 16h16" />
    </svg>
  ),
  MaxApp: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8v8M16 8v8M8 8l4 5 4-5" />
    </svg>
  ),
};

/* ---------- Botanical line symbols for collections + principles ---------- */
const Symbols = {
  // Утренний свет — sun + horizon
  MorningLight: () => (
    <svg viewBox="0 0 56 56" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="32" r="9" />
      <path d="M28 18v-4M16 23l-2.5-2.5M40 23l2.5-2.5M10 32H6M50 32h-4" />
      <path d="M8 44h40" strokeOpacity="0.5" />
    </svg>
  ),
  // Шёлковая — wavy fabric ribbon
  Silk: () => (
    <svg viewBox="0 0 56 56" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22c4-4 8-4 12 0s8 4 12 0 8-4 12 0 4 4 4 4" />
      <path d="M8 30c4-4 8-4 12 0s8 4 12 0 8-4 12 0 4 4 4 4" />
      <path d="M8 38c4-4 8-4 12 0s8 4 12 0 8-4 12 0 4 4 4 4" strokeOpacity="0.55" />
    </svg>
  ),
  // Будуарная — gemstone / diamond
  Boudoir: () => (
    <svg viewBox="0 0 56 56" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 22h28l-14 22Z" />
      <path d="M14 22l8-8h12l8 8" />
      <path d="M22 14l6 8 6-8M14 22l14 22M42 22 28 44" strokeOpacity="0.55" />
    </svg>
  ),
  // Atelier Luxe — palace arch / column
  Atelier: () => (
    <svg viewBox="0 0 56 56" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 46V22a16 16 0 0 1 32 0v24" />
      <path d="M12 46h32" />
      <path d="M20 46V28M28 46V26M36 46V28" strokeOpacity="0.55" />
      <circle cx="28" cy="16" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Three principles — botanical-style
  Sprig: () => (
    <svg viewBox="0 0 56 56" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 48V12" />
      <path d="M28 20c-3-4-9-5-12-3 1 4 5 7 12 7M28 28c4-4 10-5 13-3-1 4-5 7-13 7M28 36c-3-3-8-4-11-2 1 3 4 6 11 6" />
    </svg>
  ),
  Drop: () => (
    <svg viewBox="0 0 56 56" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 10c-8 10-14 18-14 24a14 14 0 0 0 28 0c0-6-6-14-14-24z" />
      <path d="M22 32a6 6 0 0 0 6 6" strokeOpacity="0.55" />
    </svg>
  ),
  Leaf: () => (
    <svg viewBox="0 0 56 56" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 44c0-18 14-32 32-32 0 18-14 32-32 32z" />
      <path d="M14 42 38 18" strokeOpacity="0.55" />
    </svg>
  ),
};

/* ---------- Photo placeholder ---------- */
function Photo({ ratio = '1/1', tone = '', label = 'bouquet · placeholder', className = '', style }) {
  const cls = `photo-placeholder ratio-${ratio.replace('/', '\\/')} ${tone} ${className}`;
  // can't use backslash in className → just use inline className with raw ratio classes
  const ratioCls = ratio === '1/1' ? 'ratio-1\\/1' : ratio === '4/5' ? 'ratio-4\\/5' : ratio === '3/4' ? 'ratio-3\\/4' : 'ratio-16\\/9';
  return (
    <div
      className={`photo-placeholder ${tone} ${className}`}
      data-label={label}
      style={{ aspectRatio: ratio.replace('/', ' / '), ...style }}
    />
  );
}

/* ---------- Buttons ---------- */
function Button({ variant = 'primary', children, size, ...rest }) {
  const cls = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''}`;
  return <button className={cls} {...rest}>{children}</button>;
}

/* ---------- Hairline ---------- */
const Hairline = ({ soft }) => <hr className={soft ? 'hairline-soft' : 'hairline'} />;

/* ---------- Reveal-on-scroll ---------- */
function Reveal({ children, delay = 0, as = 'div', className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fallback: always reveal after a short delay so content is never permanently hidden.
    const fallback = setTimeout(() => setShown(true), delay + 60);

    // Immediate check — if element is already in viewport on mount, reveal now.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.92 && rect.bottom > 0) {
      setTimeout(() => setShown(true), delay);
      return () => clearTimeout(fallback);
    }

    let obs;
    if ('IntersectionObserver' in window) {
      obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            obs.disconnect();
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
      obs.observe(el);
    }
    return () => {
      clearTimeout(fallback);
      if (obs) obs.disconnect();
    };
  }, [delay]);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`}>{children}</Tag>;
}

/* ============================================================
   HEADER
   ============================================================ */
function Header({ cartCount = 2, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const collections = [
    { name: 'Утренний свет', meta: 'до 2 700 ₽' },
    { name: 'Шёлковая', meta: '2 700 – 4 500 ₽' },
    { name: 'Будуарная', meta: '4 500 – 7 000 ₽' },
    { name: 'Atelier Luxe', meta: 'от 7 000 ₽' },
  ];

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container site-header-inner">
        <a className="brand-mark" href="#">
          <span className="monogram">Р</span>
          <span className="logo-text">Роза&nbsp;Цветов</span>
        </a>

        <nav className="nav-main">
          <a className="nav-link" href="#catalog">Каталог</a>
          <div className="has-dropdown">
            <a className="nav-link" href="#collections">Коллекции</a>
            <div className="dropdown">
              {collections.map((c, i) => (
                <a key={c.name} className="dropdown-item" href="#">
                  <div>
                    <div className="d-name">{c.name}</div>
                    <div className="d-meta" style={{ marginTop: 4 }}>{['Воздух','Ткань','Камень','Дворец'][i]}</div>
                  </div>
                  <div className="d-meta" style={{ alignSelf: 'center' }}>{c.meta}</div>
                </a>
              ))}
            </div>
          </div>
          <a className="nav-link" href="#care">Уход</a>
          <a className="nav-link" href="#about">О бренде</a>
          <a className="nav-link" href="#philosophy">Философия</a>
          <a className="nav-link" href="#contacts">Контакты</a>
        </nav>

        <div className="header-actions">
          <button className="btn-icon" aria-label="Поиск"><Icon.Search /></button>
          <button className="btn-icon" aria-label="Избранное"><Icon.Heart /></button>
          <button className="btn-icon" aria-label="Корзина" onClick={onOpenCart}>
            <Icon.Bag />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="btn btn-primary btn-sm open-max-btn" style={{ marginLeft: 12 }}>
            <Icon.MaxApp /> Открыть в MAX
          </button>
          <button className="burger" aria-label="Меню"><Icon.Burger /></button>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="site-footer" id="contacts">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="footer-logo">Роза Цветов</div>
            <div className="footer-tag">«Живые цветы, которые не вянут».</div>
            <div className="made-in">Made in Tatarstan</div>
          </div>

          <div className="footer-col">
            <h4>Каталог</h4>
            <ul>
              <li><a href="#">Все букеты</a></li>
              <li><a href="#">Утренний свет</a></li>
              <li><a href="#">Шёлковая</a></li>
              <li><a href="#">Будуарная</a></li>
              <li><a href="#">Atelier Luxe</a></li>
              <li><a href="#">Сертификаты подарочные</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Контакты</h4>
            <ul>
              <li><a href="tel:+79600453996">+7 960 045 39 96</a></li>
              <li><a href="mailto:rozasvetov@bk.ru">rozasvetov@bk.ru</a></li>
              <li style={{ opacity: 0.85 }}>9:00 — 21:00, без выходных</li>
              <li style={{ opacity: 0.85 }}>Казань, Татарстан</li>
            </ul>
            <ul style={{ marginTop: 20 }}>
              <li><a href="#">Telegram</a></li>
              <li><a href="#">MAX-бот</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Подлинность</h4>
            <div className="cert-medal">
              <div className="cert-medal-circle">
                Сертификат<br/>подлинности
              </div>
              <div className="cert-medal-label">Проверить букет →</div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div>© 2026 Роза Цветов · Патент RU 2451833</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Публичная оферта</a>
            <a href="#">Реквизиты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- export to window ---------- */
Object.assign(window, {
  Icon, Symbols, Photo, Button, Hairline, Reveal, Header, Footer,
});
