import Link from 'next/link';
import { I } from './Icons';
import { CartBadge } from './CartBadge';
import { HeartBadge } from './HeartBadge';
import { MobileMenu } from './MobileMenu';
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
          <span className="ast">✦</span>&nbsp;&nbsp;Сезон 17 · Май 2026 · {catalogLine}
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
          <Link href="/indice">Содержание</Link>
          <Link href="/editorial">Философия</Link>
          <Link href="/plates">Коллекции</Link>
          <Link href="/atelier">Студия</Link>
          <Link href="/catalog">Каталог</Link>
          <Link href="/care">Уход</Link>
        </nav>
        <div className="header-right">
          <Link href="/favorites" className="icon-btn" aria-label="Избранное">
            <I.Heart />
            <HeartBadge />
          </Link>
          <Link href="/cart" className="icon-btn" aria-label="Корзина">
            <I.Bag />
            <CartBadge />
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
