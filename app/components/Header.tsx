import Link from 'next/link';
import { I } from './Icons';
import { CartBadge } from './CartBadge';
import { HeartBadge } from './HeartBadge';
import { MobileMenu } from './MobileMenu';
import { SeasonLabel } from './SeasonLabel';
import { bouquetsLabel } from '@/lib/captions';
import { CONTACTS } from '@/lib/contacts';

interface HeaderProps {
  /** Optional total bouquet count to show in the masthead top-bar. */
  bouquetCount?: number;
}

export function Header({ bouquetCount }: HeaderProps = {}) {
  const catalogLine =
    typeof bouquetCount === 'number'
      ? bouquetsLabel(bouquetCount)
      : 'Стабилизированная флористика';

  return (
    <header className="site-header">
      <div className="masthead-top">
        <div>
          <span className="ast">✦</span>&nbsp;&nbsp;<SeasonLabel /> · {catalogLine}
        </div>
        <div>Atelier · est. 2017 · Tatarstan</div>
        <div style={{ fontFamily: 'var(--mono)' }}>
          <a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a>
        </div>
      </div>
      <div className="masthead">
        <Link className="brand-name" href="/">
          <em>Роза</em>&nbsp;Цветов<sup className="reg">®</sup>
        </Link>
        <nav className="nav">
          <Link href="/indice">Содержание</Link>
          <Link href="/editorial">Философия</Link>
          <Link href="/plates">Коллекции</Link>
          <Link href="/atelier">Студия</Link>
          <Link href="/catalog">Каталог</Link>
          <Link href="/b2b">Бизнес</Link>
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
