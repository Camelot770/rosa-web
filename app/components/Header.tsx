import Link from 'next/link';
import { I } from './Icons';
import { CartBadge } from './CartBadge';

function pluralBouquet(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'букет';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'букета';
  return 'букетов';
}

interface HeaderProps {
  /** Optional total bouquet count to show in the masthead top-bar. */
  bouquetCount?: number;
}

export function Header({ bouquetCount }: HeaderProps = {}) {
  const catalogLine =
    typeof bouquetCount === 'number'
      ? `${bouquetCount} ${pluralBouquet(bouquetCount)}`
      : 'Стабилизированная флористика';

  return (
    <header className="site-header">
      <div className="masthead-top">
        <div>
          <span className="ast">✦</span>&nbsp;&nbsp;№ 001 · Сезон Май 2026 · {catalogLine}
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
          <Link href="/cart" className="icon-btn" aria-label="Корзина">
            <I.Bag />
            <CartBadge />
          </Link>
        </div>
      </div>
    </header>
  );
}
