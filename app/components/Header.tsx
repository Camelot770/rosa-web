import { I } from './Icons';

export function Header() {
  return (
    <header className="site-header">
      <div className="masthead-top">
        <div>
          <span className="ast">✦</span>&nbsp;&nbsp;№ 001 · Сезон Май 2026 · 40 букетов
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
          <button className="icon-btn" aria-label="Поиск">
            <I.Search />
          </button>
          <button className="icon-btn" aria-label="Избранное">
            <I.Heart />
          </button>
          <button className="icon-btn" aria-label="Корзина">
            <I.Bag />
            <span className="cart-badge">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}
