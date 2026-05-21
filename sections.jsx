/* =========================================================================
   РОЗА ЦВЕТОВ · V4 — Sections
   ========================================================================= */

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* ============================================================
   HERO — Magazine Cover
   ============================================================ */
function HeroSection() {
  const photoRef = useRefS(null);
  useEffectS(() => {
    const t = setTimeout(() => photoRef.current && photoRef.current.classList.add('in'), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="container">
        <R>
          <div className="section-bar" style={{ marginBottom: 32, border: 'none', padding: 0 }}>
            <div className="left">
              <span className="ast">✦</span> <span>P.01 · Cover</span>
            </div>
            <div className="right">
              <span>Issue № 001 · Сезон Май 2026</span>
              <span className="ast">✦</span>
            </div>
          </div>
        </R>

        <div className="hero-cover">
          <Split as="h1" className="cover-headline">
            {['<em>Цветы,</em>', 'которые', 'не&nbsp;вянут.']}
          </Split>
        </div>

        <div className="hero-main">
          <div className="hero-left">
            <R delay={1000}>
              <p className="epigraph">
                «Имена живут в одном&nbsp;ряду&nbsp;— от&nbsp;воздуха к&nbsp;камню. <em>Чем сложнее композиция, тем&nbsp;«весомее» её имя».</em>
              </p>
            </R>
            <R delay={1150}>
              <p className="body-text">
                Стабилизированные букеты студии <strong>«Роза Цветов»</strong>&nbsp;—
                настоящие срезанные цветы, прошедшие глубокую стабилизацию
                натуральными растительными соками. Сохраняют форму, цвет и&nbsp;мягкость&nbsp;—
                до пяти лет без воды и&nbsp;ухода. Технология Rosaflorero<sup>®</sup>,
                патент <span className="mono">RU&nbsp;2&#8202;451&#8202;833</span>.
              </p>
            </R>
            <R delay={1280}>
              <div className="hero-ctas">
                <a className="btn" href="#catalog">Открыть каталог <span className="arrow"><I.Arrow /></span></a>
                <a className="link-u" href="#editorial">Философия названий <span className="arrow"><I.Arrow /></span></a>
              </div>
            </R>
          </div>

          <div className="hero-right">
            <R delay={1100}>
              <div className="cover-photo" ref={photoRef} data-label="palazzo · plate i · 4:5">
                <div className="corner-tape" />
                <div className="plate-tag"><span className="v">№ 001</span> · Plate I</div>
                <div className="photo" />
              </div>
            </R>
            <R delay={1200}>
              <div className="cover-caption">
                <span><strong>Pl.&nbsp;I</strong> · «Палаццо»</span>
                <span>Atelier Luxe</span>
                <span><strong>9&#8202;800&nbsp;₽</strong></span>
              </div>
            </R>
          </div>
        </div>

        <R delay={1100}>
          <div className="facts-strip">
            <div className="fact">
              <span className="lab">Anno</span>
              <span className="val">2017</span>
              <span className="meta">девять лет atelier в&nbsp;Казани</span>
            </div>
            <div className="fact">
              <span className="lab">Букетов</span>
              <span className="val"><em>73</em></span>
              <span className="meta">в каталоге · 4 коллекции</span>
            </div>
            <div className="fact">
              <span className="lab">Срок жизни</span>
              <span className="val">3—5</span>
              <span className="meta">лет без&nbsp;воды и&nbsp;ухода</span>
            </div>
            <div className="fact">
              <span className="lab">Технология</span>
              <span className="val" style={{ fontSize: '28px' }}>Rosaflorero<sup style={{fontSize:'0.5em'}}>®</sup></span>
              <span className="meta">патент RU&nbsp;2&#8202;451&#8202;833</span>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ============================================================
   INDEX / Table of Contents
   ============================================================ */
function IndexSection() {
  const rows = [
    { ix: '— 01', title: <span>Editorial · <em>Философия названий</em></span>, sub: 'Спред · 4 главы', pg: 'P. 04' },
    { ix: '— 02', title: <span>Plates · <em>Четыре коллекции</em></span>, sub: '73 букета', pg: 'P. 12' },
    { ix: '— 03', title: <span><em>Atelier</em> · Студия в Татарстане</span>, sub: 'Технология + история', pg: 'P. 22' },
    { ix: '— 04', title: <span><em>Catalog</em> · Хиты сезона</span>, sub: 'Showcase + цены', pg: 'P. 28' },
    { ix: '— 05', title: <span><em>Care</em> · Три правила</span>, sub: 'Уход + FAQ', pg: 'P. 36' },
    { ix: '— 06', title: <span><em>Subscribe</em> · Промокод</span>, sub: '−10% на первый заказ', pg: 'P. 42' },
  ];
  return (
    <section className="index-page" id="index">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 32 }}>
            <span className="num">P.&nbsp;02</span>
            <span className="lab">— Indice</span>
            <span className="sub">/ Содержание</span>
          </div>
        </R>
        <div className="index-grid">
          <Split as="h2" className="disp disp-lg">
            {['Inhalt.', '<em>Содержание</em>']}
          </Split>
          <div className="index-list">
            {rows.map((r, i) => (
              <R key={i} delay={i * 60}>
                <a href="#" className="index-row">
                  <span className="ix">{r.ix}</span>
                  <span>
                    <span className="ttl">{r.title}</span>
                    <div className="sub" style={{ marginTop: 8 }}>{r.sub}</div>
                  </span>
                  <span className="sub" style={{ alignSelf: 'center' }}>↗</span>
                  <span className="pg">{r.pg}</span>
                </a>
              </R>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EDITORIAL — Philosophy as 3-col spread
   ============================================================ */
function EditorialSection() {
  return (
    <section className="editorial" id="editorial">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;04</span>
            <span className="lab">— Editorial</span>
            <span className="sub">/ Спред № 01</span>
          </div>
        </R>

        <div className="editorial-head">
          <div>
            <R><div className="kicker">✦ Философия названий</div></R>
            <Split as="h2" className="disp disp-xl">
              {['От воздуха —', '<em>к&nbsp;камню.</em>']}
            </Split>
          </div>
          <R delay={200}>
            <div className="standfirst">
              «Имена нашего каталога живут <em>в&nbsp;одном&nbsp;ряду</em>&nbsp;— от&nbsp;лёгкого
              к&nbsp;плотному, от&nbsp;воздуха к&nbsp;камню. Чем сложнее композиция,
              тем&nbsp;«весомее» её&nbsp;имя».
            </div>
          </R>
        </div>

        <R>
          <div className="editorial-body">
            <p>
              Имена в&nbsp;каталоге «Розы Цветов»&nbsp;— это не&nbsp;маркетинговая
              упаковка и&nbsp;не&nbsp;настроение копирайтера. Это <strong>структура</strong>:
              шкала, по которой движется композиция от&nbsp;самого лёгкого
              букета до&nbsp;самого плотного.
            </p>
            <p>
              На&nbsp;первой ступени&nbsp;— <strong>Утренний свет.</strong> Эти букеты
              названы как утренние явления: <em>заря, иней, дымка, шёпот, мерцание,
              просвет.</em> Их хочется поставить у&nbsp;окна, на&nbsp;прикроватную тумбу,
              подарить «просто так». Внутри&nbsp;— нежные сорта роз пастельных
              оттенков, дымчатая гипсофила, тонкий лимониум.
            </p>
            <p>
              Дальше&nbsp;— <strong>Шёлковая.</strong> Имена тканей и&nbsp;прозрачных
              минералов: <em>шёлк, бархат, кашемир, парча, опал, янтарь, аметист.</em>
              На&nbsp;ощупь эти букеты тяжелее: больше слоёв, гуще тон, плотнее
              лепестки. Их вес уже ощущается на ладони.
            </p>
            <p className="pull-quote">
              Когда вы листаете каталог, вы движетесь по&nbsp;этой шкале&nbsp;— от&nbsp;утра
              к&nbsp;ночи, от&nbsp;воздуха к&nbsp;мрамору.
            </p>
            <p>
              На&nbsp;третьей ступени&nbsp;— <strong>Будуарная.</strong> Драгоценные
              камни и&nbsp;интерьерные состояния: <em>сапфир, изумруд, истома, нега,
              мираж, веранда, полнолуние.</em> Это уже крупные композиции, выбираемые
              в&nbsp;интерьер: они занимают место на&nbsp;консоли, на&nbsp;каминной
              полке, в&nbsp;нише гостиной.
            </p>
            <p>
              Наконец&nbsp;— <strong>Atelier Luxe.</strong> Имена дворцов и&nbsp;замков
              Европы: <em>Палаццо, Бельведер, Шеверни, Шамбор, Шенонсо, Версаль,
              Альгамбра, Фонтенбло, Барокко.</em> Одиннадцать редких букетов, каждый
              в&nbsp;единичном экземпляре. Это уже не&nbsp;подарок&nbsp;— это наследие.
            </p>
            <p>
              Так в&nbsp;одном каталоге сосуществуют все четыре регистра&nbsp;—
              от&nbsp;утренней дымки до&nbsp;дворцовой архитектуры. И&nbsp;каждое имя
              выбрано не&nbsp;случайно: оно сообщает вам <strong>вес</strong>
              композиции до&nbsp;того, как вы её&nbsp;увидите.
            </p>
          </div>
        </R>

        {/* The 4-step scale */}
        <R>
          <div className="scale-row">
            <div className="scale-cell scale-cell-1">
              <span className="sn">— 01 / Воздух</span>
              <span className="sttl"><em>Утренний</em> свет</span>
              <span className="sex">Заря · Дымка · Шёпот · Мерцание · Иней</span>
              <span className="scap">16 букетов · до 2 700 ₽</span>
            </div>
            <div className="scale-cell scale-cell-2">
              <span className="sn">— 02 / Ткань</span>
              <span className="sttl"><em>Шёлковая</em></span>
              <span className="sex">Шёлк · Бархат · Кашемир · Опал · Янтарь</span>
              <span className="scap">22 букета · 2 700 — 4 500 ₽</span>
            </div>
            <div className="scale-cell scale-cell-3">
              <span className="sn">— 03 / Камень</span>
              <span className="sttl"><em>Будуарная</em></span>
              <span className="sex">Сапфир · Истома · Веранда · Каскад · Полнолуние</span>
              <span className="scap">24 букета · 4 500 — 7 000 ₽</span>
            </div>
            <div className="scale-cell scale-cell-4">
              <span className="sn">— 04 / Дворец</span>
              <span className="sttl">Atelier <em>Luxe</em></span>
              <span className="sex">Палаццо · Шамбор · Версаль · Альгамбра · Фонтенбло</span>
              <span className="scap">11 букетов · от 7 000 ₽</span>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* ============================================================
   PLATES — Collections
   ============================================================ */
function PlatesSection() {
  const plates = [
    { roman: 'I',   lbl: 'Утренний свет', name: 'Morning',  it: ' Light',  meta: '16 bouquets · до 2 700 ₽',  label: 'morning · plate i'  },
    { roman: 'II',  lbl: 'Шёлковая',      name: 'Silk',     it: '',        meta: '22 bouquets · 2 700–4 500 ₽', label: 'silk · plate ii'    },
    { roman: 'III', lbl: 'Будуарная',     name: 'Boudoir',  it: '',        meta: '24 bouquets · 4 500–7 000 ₽', label: 'boudoir · plate iii'},
    { roman: 'IV',  lbl: 'Atelier Luxe',  name: 'Atelier',  it: ' Luxe',   meta: '11 bouquets · от 7 000 ₽',    label: 'luxe · plate iv'    },
  ];
  return (
    <section className="plates-section" id="plates">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;12</span>
            <span className="lab">— Plates</span>
            <span className="sub">/ Коллекции I–IV</span>
          </div>
        </R>
        <div className="plates-header">
          <Split as="h2" className="disp disp-xl">
            {['Plates <em>I — IV.</em>']}
          </Split>
          <R delay={150}>
            <a className="link-u" href="#catalog">Все 73 букета <span className="arrow"><I.Arrow /></span></a>
          </R>
        </div>

        <div className="plates">
          {plates.map((p, i) => (
            <R key={i} delay={i * 100}>
              <a className="plate" href="#">
                <div className="plate-photo" data-label={p.label}>
                  <div className="photo" style={i === 2 ? { backgroundImage:
                    'radial-gradient(at 50% 40%, rgba(196,73,30,0.22), transparent 60%), repeating-linear-gradient(135deg, rgba(26,22,18,0.06) 0 1px, transparent 1px 14px)'
                  } : i === 3 ? { backgroundImage:
                    'radial-gradient(at 60% 40%, rgba(154,142,122,0.4), transparent 60%), radial-gradient(at 30% 70%, rgba(196,73,30,0.18), transparent 60%)'
                  } : undefined } />
                  <div className="plate-tag">Plate {p.roman}</div>
                  <div className="ru-no">№ 0{i + 1}</div>
                </div>
                <div className="plate-info">
                  <div>
                    <div className="lbl">{p.lbl}</div>
                    <div className="nm">{p.name}{p.it ? <em>{p.it}</em> : null}</div>
                    <div className="meta">{p.meta}</div>
                  </div>
                  <span className="arrow-link"><I.Arrow size={16} /></span>
                </div>
              </a>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STORY — Atelier
   ============================================================ */
function StorySection() {
  const visRef = useRefS(null);
  useEffectS(() => {
    const el = visRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.classList.add('in'); obs.disconnect(); } });
    }, { threshold: 0.15 });
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
          <div className="story-visual" ref={visRef} data-label="atelier kazan · 4:5">
            <div className="photo" />
            <div className="stamp">est.<br/><em>2017</em></div>
          </div>
          <div className="story-body">
            <R><div className="meta-row"><span className="dot" /><span>Atelier · Kazan · Tatarstan</span></div></R>
            <Split as="h2" className="disp disp-xl">
              {['Девять лет', 'в&nbsp;<em>Татарстане.</em>']}
            </Split>
            <R delay={300}>
              <p>
                Мы делаем стабилизированные букеты с&nbsp;2017&nbsp;года. Цветы
                срезают в&nbsp;момент идеального раскрытия и&nbsp;на&nbsp;несколько недель
                погружают в&nbsp;натуральные растительные соки&nbsp;— по&nbsp;запатентованной
                российской технологии <strong>Rosaflorero<sup>®</sup> ·
                RU&nbsp;2&#8202;451&#8202;833</strong>.
              </p>
            </R>
            <R delay={400}>
              <p>
                Срок жизни букета&nbsp;— от&nbsp;трёх до&nbsp;пяти лет. Без&nbsp;воды,
                без&nbsp;пыли, без&nbsp;аллергии. Каждый собран вручную в&nbsp;Казани
                и&nbsp;уходит к&nbsp;вам с&nbsp;именным сертификатом подлинности.
              </p>
            </R>
            <R delay={500}>
              <div className="story-stats">
                <div className="story-stat">
                  <div className="v"><em>9</em></div>
                  <div className="k">лет студии</div>
                </div>
                <div className="story-stat">
                  <div className="v">12&#8202;800</div>
                  <div className="k">букетов</div>
                </div>
                <div className="story-stat">
                  <div className="v"><em>98<sup style={{fontSize:'0.5em'}}>%</sup></em></div>
                  <div className="k">повторных заказов</div>
                </div>
              </div>
            </R>
            <R delay={600}>
              <a className="btn btn-outline" href="#">
                Технология стабилизации <span className="arrow"><I.Arrow /></span>
              </a>
            </R>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CATALOG SPREAD
   ============================================================ */
function CatalogSpread() {
  const filters = ['All', 'Morning Light', 'Silk', 'Boudoir', 'Atelier Luxe'];
  const [active, setActive] = useStateS('All');
  const all = [
    { coll: 'Atelier Luxe',   collF: 'Atelier Luxe',  n: 'Палаццо',    p: '9 800 ₽',  ix: '№ 001 / 73', label: 'palazzo · 4:5' },
    { coll: 'Atelier Luxe',   collF: 'Atelier Luxe',  n: 'Версаль',    p: '11 600 ₽', ix: '№ 002 / 73', label: 'versal · 4:5' },
    { coll: 'Будуарная',      collF: 'Boudoir',       n: 'Полнолуние', p: '6 750 ₽',  ix: '№ 003 / 73', label: 'polnolunie · 4:5' },
    { coll: 'Будуарная',      collF: 'Boudoir',       n: 'Сапфир',     p: '5 480 ₽',  ix: '№ 004 / 73', label: 'sapphir · 4:5' },
    { coll: 'Шёлковая',       collF: 'Silk',          n: 'Янтарь',     p: '3 920 ₽',  ix: '№ 005 / 73', label: 'yantar · 4:5' },
    { coll: 'Шёлковая',       collF: 'Silk',          n: 'Шёлк',       p: '3 240 ₽',  ix: '№ 006 / 73', label: 'shyolk · 4:5' },
    { coll: 'Утренний свет',  collF: 'Morning Light', n: 'Мерцание',   p: '2 380 ₽',  ix: '№ 007 / 73', label: 'mertsanie · 4:5' },
    { coll: 'Утренний свет',  collF: 'Morning Light', n: 'Заря',       p: '1 590 ₽',  ix: '№ 008 / 73', label: 'zarya · 4:5' },
  ];
  const items = active === 'All' ? all : all.filter(i => i.collF === active);

  return (
    <section className="catalog-spread" id="catalog">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;28</span>
            <span className="lab">— Catalog</span>
            <span className="sub">/ Хиты сезона</span>
          </div>
        </R>
        <div className="spread-head">
          <Split as="h2" className="disp disp-xl">
            {['Хиты <em>сезона.</em>']}
          </Split>
          <R delay={150}>
            <a className="link-u" href="#">Открыть весь каталог <span className="arrow"><I.Arrow /></span></a>
          </R>
        </div>

        <R>
          <div className="filter-row">
            <span className="lbl">Filter ✦</span>
            {filters.map(f => (
              <button key={f} className={`filter-pill ${active === f ? 'active' : ''}`} onClick={() => setActive(f)}>{f}</button>
            ))}
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-soft)' }}>
              {items.length} / 73
            </span>
          </div>
        </R>

        <div className="spread-grid">
          {items.map((it, i) => (
            <R key={`${active}-${i}`} delay={i * 50}>
              <a className="spread-card" href="#">
                <div className="ph">
                  <div className="photo" data-label={it.label} />
                  <span className="stamp-no">{it.ix.split(' / ')[0]}</span>
                  <div className="quick"><span className="pill">Быстрый просмотр</span></div>
                </div>
                <div className="body">
                  <div>
                    <div className="cap">{it.coll}</div>
                    <div className="nm"><em>«{it.n}»</em></div>
                  </div>
                  <div className="pr">{it.p}</div>
                </div>
              </a>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CARE
   ============================================================ */
function CareSection() {
  const ps = [
    { n: '01', t: <span>Не <em>сухоцвет.</em></span>, d: 'Лепестки сохраняют упругость и&nbsp;тактильную мягкость. Их можно касаться без хруста и&nbsp;осыпания.' },
    { n: '02', t: <span>Не <em>химия.</em></span>,    d: 'В&nbsp;основе технологии&nbsp;— растительные соки, глицерин и&nbsp;натуральные пигменты. Без формальдегидов.' },
    { n: '03', t: <span>Не <em>искусственно.</em></span>, d: 'Настоящие срезанные цветы. Каждый стебель и&nbsp;лист&nbsp;— живой материал, остановленный во&nbsp;времени.' },
  ];
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
          {ps.map((p, i) => (
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

/* ============================================================
   SUBSCRIBE
   ============================================================ */
function SubscribeSection() {
  const [email, setEmail] = useStateS('');
  const [sent, setSent] = useStateS(false);
  const [copied, setCopied] = useStateS(false);
  const copy = () => {
    navigator.clipboard?.writeText('VISITKA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <section className="subscribe">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24, color: 'var(--paper)' }}>
            <span className="num">P.&nbsp;42</span>
            <span className="lab" style={{ color: 'var(--paper)' }}>— Subscribe</span>
            <span className="sub" style={{ color: 'rgba(244,239,229,0.5)' }}>/ −10% на первый заказ</span>
          </div>
        </R>
        <div className="subscribe-grid">
          <div>
            <R><div className="kicker">✦ Первый заказ</div></R>
            <Split as="h2" className="disp disp-xl">
              {['Скидка <em>10%</em> на', 'первый букет.']}
            </Split>
            <R delay={200}>
              <p className="sub">
                Подпишитесь на письмо студии — раз в&nbsp;месяц рассказываем
                о&nbsp;новых букетах и&nbsp;закрытых сериях. В&nbsp;ответ присылаем
                промокод на&nbsp;первый заказ.
              </p>
            </R>
            <R delay={320}>
              <div className="promo-code" onClick={copy}>
                <span>VISITKA10 · −10%</span>
                <span className="status">{copied ? 'скопировано ✓' : 'нажмите чтобы скопировать'}</span>
              </div>
            </R>
          </div>
          <R delay={200}>
            <form className="sub-form" onSubmit={(e) => { e.preventDefault(); setSent(true); setEmail(''); }}>
              <div>
                <div className="field-label">— E-mail</div>
                <div className="field-row">
                  <input type="email" required placeholder="your@email.ru" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="sub-cta">
                <button type="submit" className="btn btn-light">
                  {sent ? 'Отправлено ✓' : 'Получить промокод'} <span className="arrow"><I.Arrow /></span>
                </button>
                <a href="#" className="link-u" style={{ color: 'var(--paper)' }}>Открыть в MAX <span className="arrow"><I.Arrow /></span></a>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(244,239,229,0.55)', letterSpacing: '0.06em', lineHeight: 1.6, maxWidth: 380, marginTop: 8 }}>
                Подписываясь, вы соглашаетесь с&nbsp;Политикой конфиденциальности.
                Отписаться можно в&nbsp;один клик из&nbsp;любого письма.
              </div>
            </form>
          </R>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  HeroSection, IndexSection, EditorialSection, PlatesSection,
  StorySection, CatalogSpread, CareSection, SubscribeSection,
});
