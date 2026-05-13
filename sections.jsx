/* =========================================================
   Роза Цветов — Homepage Sections
   Uses components from window: Icon, Symbols, Photo, Button, Hairline, Reveal
   ========================================================= */

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* ============================================================
   01. HERO
   ============================================================ */
function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <Reveal>
            <div className="hero-eyebrow">
              <span className="line" />
              <span className="caps" style={{ color: 'var(--gold)' }}>Стабилизированная флористика · Made in Tatarstan</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="h1">
              Цветы,<br/>
              <em style={{ fontStyle: 'italic', color: 'var(--rose-deep)' }}>которые не вянут</em>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="hero-sub">
              Настоящие срезанные цветы, прошедшие глубокую стабилизацию
              натуральными растительными соками. Сохраняют форму, цвет
              и мягкость&nbsp;— до пяти лет без воды и ухода.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="hero-cta">
              <Button variant="primary">Открыть каталог</Button>
              <Button variant="tertiary">Как это сделано</Button>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <div className="v">73</div>
                <div className="k">букета в&nbsp;каталоге</div>
              </div>
              <div className="hero-meta-item">
                <div className="v">3–5</div>
                <div className="k">лет&nbsp;без&nbsp;ухода</div>
              </div>
              <div className="hero-meta-item">
                <div className="v">RU&nbsp;2451833</div>
                <div className="k">патент&nbsp;технологии</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="hero-visual">
            <Photo ratio="4/5" label="hero · палаццо · 4:5" tone="" />
            <div className="floating-tag tag-top">
              <span className="tname">«Палаццо»</span>
              <span className="tmeta">Atelier Luxe · 9 800 ₽</span>
            </div>
            <div className="floating-tag tag-bottom">
              <span className="tname" style={{ fontStyle: 'normal', fontFamily: 'var(--body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>Хит сезона</span>
              <span className="tname">Версаль · Альгамбра · Шамбор</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   02. COLLECTIONS GRID
   ============================================================ */
function CollectionsSection() {
  const items = [
    { key: 'morning', cap: 'Воздух · 16 букетов', name: 'Утренний свет', meta: 'до 2 700 ₽', tone: '' },
    { key: 'silk',    cap: 'Ткань · 22 букета',  name: 'Шёлковая',     meta: '2 700 – 4 500 ₽', tone: '' },
    { key: 'boudoir', cap: 'Камень · 24 букета', name: 'Будуарная',    meta: '4 500 – 7 000 ₽', tone: 'dark' },
    { key: 'atelier', cap: 'Дворец · 11 букетов', name: 'Atelier Luxe', meta: 'от 7 000 ₽', tone: 'deep' },
  ];
  return (
    <section className="section" id="collections">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="heading">
              <div className="eyebrow">
                <span className="line" />
                <span className="caps">Каталог · 73 букета</span>
              </div>
              <h2 className="h2">Четыре коллекции — четыре состояния тишины.</h2>
            </div>
            <div className="more">
              <a className="btn-tertiary" href="#catalog">Все букеты →</a>
            </div>
          </div>
        </Reveal>

        <div className="coll-grid">
          {items.map((c, i) => (
            <Reveal key={c.key} delay={i * 80}>
              <a className="coll-card" href={`#${c.key}`}>
                <Photo ratio="4/3" tone={c.tone} label={`${c.name.toLowerCase()} · обложка`} />
                <div className="coll-body">
                  <div>
                    <div className="coll-name">{c.name}</div>
                    <div className="coll-meta">{c.cap} · {c.meta}</div>
                  </div>
                  <span className="coll-arrow"><Icon.Arrow size={16} /></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   03. PHILOSOPHY OF NAMES — CENTERPIECE
   ============================================================ */
function PhilosophySection() {
  const cards = [
    {
      key: 'morning',
      n: '01',
      cap: 'Воздух',
      name: 'Утренний свет',
      desc: 'Самые лёгкие букеты названы как утренние явления: заря, дымка, шёпот, мерцание. Поставить у окна, на прикроватную тумбу, подарить «просто так».',
      examples: ['Заря', 'Дымка', 'Шёпот', 'Мерцание', 'Перо'],
      count: '16 букетов · до 2 700 ₽',
      symbol: <Symbols.MorningLight />,
      cls: 'phil-card-1',
    },
    {
      key: 'silk',
      n: '02',
      cap: 'Ткань',
      name: 'Шёлковая',
      desc: 'Следующая ступень носит имена благородных тканей и прозрачных минералов: шёлк, бархат, кашемир, опал, янтарь. Их вес ощущается на ладони.',
      examples: ['Шёлк', 'Бархат', 'Кашемир', 'Опал', 'Янтарь'],
      count: '22 букета · 2 700 – 4 500 ₽',
      symbol: <Symbols.Silk />,
      cls: 'phil-card-2',
    },
    {
      key: 'boudoir',
      n: '03',
      cap: 'Камень',
      name: 'Будуарная',
      desc: 'Крупные интерьерные композиции — драгоценные камни, чувственные состояния, образы интерьера: сапфир, истома, веранда, полнолуние.',
      examples: ['Сапфир', 'Истома', 'Веранда', 'Полнолуние', 'Каскад'],
      count: '24 букета · 4 500 – 7 000 ₽',
      symbol: <Symbols.Boudoir />,
      cls: 'phil-card-3',
    },
    {
      key: 'atelier',
      n: '04',
      cap: 'Дворец',
      name: 'Atelier Luxe',
      desc: 'Самые редкие букеты носят имена дворцов и замков Европы: Версаль, Фонтенбло, Альгамбра. Это уже не подарок, а наследие.',
      examples: ['Версаль', 'Фонтенбло', 'Альгамбра', 'Шамбор', 'Барокко'],
      count: '11 букетов · от 7 000 ₽',
      symbol: <Symbols.Atelier />,
      cls: 'phil-card-4',
    },
  ];

  return (
    <section className="section philosophy" id="philosophy">
      <div className="container">
        <Reveal>
          <div className="section-head" style={{ alignItems: 'start' }}>
            <div className="heading">
              <div className="eyebrow">
                <span className="line" />
                <span className="caps">Философия названий</span>
              </div>
              <h2 className="h2">От воздуха <em style={{ fontStyle: 'italic' }}>—</em> к&nbsp;камню.</h2>
            </div>
            <div className="more" style={{ maxWidth: 360, color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.55 }}>
              Имена живут в одном ряду&nbsp;— чем сложнее композиция, тем&nbsp;«весомее» её&nbsp;имя.
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="philosophy-intro">
            <div className="lead">
              «Имена нашего каталога живут <em>в одном ряду</em>&nbsp;— от лёгкого к плотному, от воздуха к камню. Чем сложнее композиция, тем «весомее» её&nbsp;имя».
            </div>
            <div>
              <div className="note">
                Когда вы листаете каталог, вы движетесь по этой шкале&nbsp;— от утра к ночи,
                от воздуха к мрамору. Это не маркетинг и не настроение&nbsp;— это
                <strong style={{ color: 'var(--ink)', fontWeight: 500 }}> структура нашей работы.</strong>
              </div>
              <div className="weight-scale">
                <div className="weight-step">
                  <span className="ws-cap">01 · Воздух</span>
                  <span className="ws-label">явления утра</span>
                </div>
                <div className="weight-step">
                  <span className="ws-cap">02 · Ткань</span>
                  <span className="ws-label">шёлк · бархат · опал</span>
                </div>
                <div className="weight-step">
                  <span className="ws-cap">03 · Камень</span>
                  <span className="ws-label">сапфир · истома</span>
                </div>
                <div className="weight-step">
                  <span className="ws-cap">04 · Дворец</span>
                  <span className="ws-label">Версаль · Альгамбра</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="phil-cards">
          {cards.map((c, i) => (
            <Reveal key={c.key} delay={i * 100}>
              <article className={`phil-card ${c.cls}`}>
                <span className="pc-count">{c.n}</span>
                <div className="pc-symbol">{c.symbol}</div>
                <div className="pc-cap">{c.cap}</div>
                <div className="pc-name">{c.name}</div>
                <div className="pc-desc">{c.desc}</div>
                <div className="pc-divider" />
                <ul className="pc-names">
                  {c.examples.map(n => <li key={n}>{n}</li>)}
                </ul>
                <div style={{ marginTop: 24, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.8 }}>
                  {c.count}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="phil-cta">
          <Button variant="primary">Открыть каталог</Button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   04. HITS — horizontal carousel
   ============================================================ */
function HitsSection() {
  const hits = [
    { coll: 'Утренний свет', name: 'Заря', price: '1 590 ₽' },
    { coll: 'Утренний свет', name: 'Мерцание', price: '2 380 ₽' },
    { coll: 'Шёлковая', name: 'Шёлк', price: '3 240 ₽' },
    { coll: 'Шёлковая', name: 'Янтарь', price: '3 920 ₽' },
    { coll: 'Будуарная', name: 'Сапфир', price: '5 480 ₽' },
    { coll: 'Будуарная', name: 'Полнолуние', price: '6 750 ₽' },
    { coll: 'Atelier Luxe', name: 'Версаль', price: '9 200 ₽' },
    { coll: 'Atelier Luxe', name: 'Альгамбра', price: '11 600 ₽' },
  ];
  const trackRef = useRefS(null);
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="heading">
              <div className="eyebrow">
                <span className="line" />
                <span className="caps">Хиты сезона</span>
              </div>
              <h2 className="h2">Любимые композиции мая.</h2>
            </div>
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={() => scrollBy(-1)} aria-label="Назад"><Icon.Arrow dir="left" /></button>
              <button className="carousel-btn" onClick={() => scrollBy(1)} aria-label="Вперёд"><Icon.Arrow /></button>
            </div>
          </div>
        </Reveal>

        <div className="hits-track" ref={trackRef}>
          {hits.map((h, i) => (
            <article key={i} className="product-card">
              <Photo ratio="1/1" tone={i % 3 === 1 ? 'dark' : ''} label={`${h.name.toLowerCase()} · 1:1`} />
              <div className="pc-body">
                <div className="pc-coll">{h.coll}</div>
                <div className="pc-title">{h.name}</div>
                <div className="pc-price">{h.price}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   05. STORY
   ============================================================ */
function StorySection() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="story-grid">
          <Reveal>
            <div className="story-visual">
              <Photo ratio="4/5" label="мастерская · казань · 4:5" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="story-body">
              <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--gold)', marginBottom: 16 }}>
                <span style={{ width: 32, height: 1, background: 'var(--gold)' }} />
                <span className="caps">О бренде</span>
              </div>
              <h2 className="h2">Наша студия<br/>в&nbsp;Татарстане.</h2>
              <div style={{ height: 24 }} />
              <p>
                Мы делаем стабилизированные букеты девятый год. Цветы срезают
                в&nbsp;момент идеального раскрытия и&nbsp;на&nbsp;несколько недель погружают
                в&nbsp;натуральные растительные соки&nbsp;— по&nbsp;запатентованной российской
                технологии <strong>RU 2451833</strong>.
              </p>
              <div className="quote">
                «Это не сухоцвет и&nbsp;не&nbsp;химия. Это живые цветы, остановленные в&nbsp;их&nbsp;лучший момент».
              </div>
              <p>
                Срок жизни такого букета&nbsp;— от&nbsp;трёх до&nbsp;пяти лет. Без воды,
                без пыли, без аллергии. Каждый собран вручную на&nbsp;нашей студии
                в&nbsp;Казани и&nbsp;уходит к&nbsp;вам с&nbsp;именным сертификатом подлинности.
              </p>

              <div className="story-meta">
                <div className="story-meta-item">
                  <div className="v">9</div>
                  <div className="k">лет студии</div>
                </div>
                <div className="story-meta-item">
                  <div className="v">12 800</div>
                  <div className="k">букетов · доставлено</div>
                </div>
                <div className="story-meta-item">
                  <div className="v">98%</div>
                  <div className="k">повторных&nbsp;заказов</div>
                </div>
              </div>

              <Button variant="secondary">Подробнее о технологии</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   06. THREE PRINCIPLES
   ============================================================ */
function PrinciplesSection() {
  const p = [
    {
      cap: '01 · Принцип первый',
      title: 'Не сухоцвет.',
      desc: 'Лепестки сохраняют упругость и тактильную мягкость. Их можно касаться без хруста и осыпания.',
      symbol: <Symbols.Sprig />,
    },
    {
      cap: '02 · Принцип второй',
      title: 'Не химия.',
      desc: 'В основе технологии — растительные соки, глицерин и натуральные пигменты. Без формальдегидов и аэрозолей.',
      symbol: <Symbols.Drop />,
    },
    {
      cap: '03 · Принцип третий',
      title: 'Не искусственно.',
      desc: 'Это настоящие срезанные цветы. Каждый стебель и лист — живой материал, остановленный во времени.',
      symbol: <Symbols.Leaf />,
    },
  ];
  return (
    <section className="section principles-section">
      <div className="container">
        <Reveal>
          <div className="section-head" style={{ marginBottom: 48 }}>
            <div className="heading">
              <div className="eyebrow">
                <span className="line" />
                <span className="caps">Три принципа</span>
              </div>
              <h2 className="h2">Три «не», которые делают этот букет настоящим.</h2>
            </div>
          </div>
        </Reveal>
        <div className="principles-grid">
          {p.map((x, i) => (
            <Reveal key={i} delay={i * 100}>
              <article className="principle">
                <div className="symbol">{x.symbol}</div>
                <div className="pcap">{x.cap}</div>
                <div className="ptitle">{x.title}</div>
                <div className="pdesc">{x.desc}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   07. REVIEWS
   ============================================================ */
function ReviewsSection() {
  const reviews = [
    {
      quote: 'Купила «Янтарь» в&nbsp;октябре, сейчас март&nbsp;— стоит на&nbsp;комоде у&nbsp;окна как новый. Гости спрашивают, чем поливаю. Отвечаю&nbsp;— ничем.',
      name: 'Анна К.',
      city: 'Москва · клиент с 2024',
      product: 'Янтарь',
      coll: 'Шёлковая',
    },
    {
      quote: 'Заказывал «Версаль» в&nbsp;подарок жене на&nbsp;десять лет свадьбы. Через год она каждое утро поправляет один и&nbsp;тот&nbsp;же лепесток. Это сильнее, чем&nbsp;любые свежие&nbsp;цветы.',
      name: 'Илья В.',
      city: 'Санкт-Петербург',
      product: 'Версаль',
      coll: 'Atelier Luxe',
    },
    {
      quote: 'Маленькая «Заря» стоит у&nbsp;меня на&nbsp;прикроватной тумбе уже три года. Не выгорела, не запылилась. Это как&nbsp;первое утро&nbsp;— каждый раз.',
      name: 'Дарья М.',
      city: 'Казань',
      product: 'Заря',
      coll: 'Утренний свет',
    },
  ];
  const [i, setI] = useStateS(0);
  const r = reviews[i];
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="heading">
              <div className="eyebrow">
                <span className="line" />
                <span className="caps">Отзывы</span>
              </div>
              <h2 className="h2">Букет, который живёт<br/>годами&nbsp;— в&nbsp;интерьере клиента.</h2>
            </div>
          </div>
        </Reveal>

        <div className="reviews-row">
          <Reveal>
            <div className="review-card">
              <span className="rquote-mark">“</span>
              <p className="rquote" dangerouslySetInnerHTML={{ __html: r.quote }} />
              <div className="rauthor">
                <div className="ravatar photo-placeholder" data-label="" />
                <div>
                  <div className="rname">{r.name}</div>
                  <div className="rmeta">{r.city}</div>
                </div>
              </div>
              <div className="review-product">
                <Photo ratio="1/1" label="" />
                <div>
                  <div className="rp-meta">{r.coll}</div>
                  <div className="rp-name">«{r.product}»</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="reviews-visual">
              <Photo ratio="4/5" tone={i === 1 ? 'dark' : i === 2 ? '' : ''} label={`${r.product.toLowerCase()} · в&nbsp;интерьере`.replace(/&nbsp;/g,' ')} />
            </div>
          </Reveal>
        </div>

        <div className="reviews-nav">
          <div className="reviews-counter">
            <strong>0{i + 1}</strong> &nbsp;/&nbsp; 0{reviews.length}
          </div>
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={() => setI((i + reviews.length - 1) % reviews.length)} aria-label="Предыдущий"><Icon.Arrow dir="left" /></button>
            <button className="carousel-btn" onClick={() => setI((i + 1) % reviews.length)} aria-label="Следующий"><Icon.Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   08. PROMO
   ============================================================ */
function PromoSection() {
  const [email, setEmail] = useStateS('');
  const [sent, setSent] = useStateS(false);
  return (
    <section className="promo">
      <div className="container promo-inner">
        <Reveal>
          <div>
            <div className="promo-eyebrow">
              <span className="line" />
              <span className="caps">Первый заказ</span>
            </div>
            <h2 className="h2">Скидка 10% на&nbsp;первый букет.</h2>
            <p className="promo-sub">
              Подпишитесь на&nbsp;письмо студии&nbsp;— раз в&nbsp;месяц рассказываем
              о&nbsp;новых букетах и&nbsp;закрытых сериях. В&nbsp;ответ присылаем
              промокод на&nbsp;первый заказ.
            </p>
            <div className="promo-code">VISITKA10 · −10% · до&nbsp;31&nbsp;июля</div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <form className="promo-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div>
              <label className="caps" style={{ color: 'var(--green-deep)', opacity: 0.7 }}>e-mail</label>
              <input
                className="field"
                type="email"
                placeholder="your@email.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button variant="primary" type="submit">
                {sent ? 'Отправлено ✓' : 'Получить промокод'}
              </Button>
              <Button variant="secondary" type="button"><Icon.MaxApp /> Открыть бот MAX</Button>
            </div>
            <div className="promo-fineprint">
              Подписываясь, вы соглашаетесь с&nbsp;Политикой&nbsp;конфиденциальности.
              Отписаться можно в&nbsp;один клик из&nbsp;любого письма.
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- export ---------- */
Object.assign(window, {
  HeroSection, CollectionsSection, PhilosophySection, HitsSection,
  StorySection, PrinciplesSection, ReviewsSection, PromoSection,
});
