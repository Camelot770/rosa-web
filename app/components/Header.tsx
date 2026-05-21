import Link from 'next/link';
import { I } from './Icons';
import { CartBadge } from './CartBadge';
import { CONTACTS } from '@/lib/contacts';

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
        <div style={{ fontFamily: 'var(--mono)' }}>
          <a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a>
        </div>
      </div>
      <div className="masthead">
        <Link className="brand-name" href="/">
          <em>Роза</em>&nbsp;Цветов
        </Link>
        <nav className="nav">
          <Link href="/#index">Indice</Link>
          <Link href="/#editorial">Editorial</Link>
          <Link href="/#plates">Plates</Link>
          <Link href="/#atelier">Atelier</Link>
          <Link href="/catalog">Catalog</Link>
          <Link href="/#care">Care</Link>
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
