import Link from 'next/link';
import { R } from './Reveal';

export function Footer() {
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
            <div style={{ fontFamily: 'var(--display)', fontSize: 32 }}>
              <em style={{ fontStyle: 'italic', color: 'var(--vermilion)' }}>Роза</em> Цветов
            </div>
            <p className="lead-line">
              «Живые цветы,
              <br />
              которые не вянут».
            </p>
            <div className="caps" style={{ color: 'var(--vermilion)' }}>
              ✦ Made in Tatarstan
            </div>
          </div>
          <div className="footer-col">
            <h4>Catalog</h4>
            <ul>
              <li>
                <a href="#catalog">Все 40 букетов</a>
              </li>
              <li>
                <a href="#catalog">Утренний свет</a>
              </li>
              <li>
                <a href="#catalog">Шёлковая</a>
              </li>
              <li>
                <a href="#catalog">Будуарная</a>
              </li>
              <li>
                <a href="#catalog">Atelier Luxe</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Atelier</h4>
            <ul>
              <li>
                <a href="#editorial">Editorial</a>
              </li>
              <li>
                <a href="#atelier">Технология</a>
              </li>
              <li>
                <a href="#care">Care</a>
              </li>
              <li>
                <a href="#">Сертификат</a>
              </li>
              <li>
                <a href="#">Сотрудничество</a>
              </li>
              <li>
                <Link href="/privacy">Политика конфиденциальности</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="tel:+79600453996">+7 960 045 39 96</a>
              </li>
              <li>
                <a href="mailto:rozasvetov@bk.ru">rozasvetov@bk.ru</a>
              </li>
              <li style={{ opacity: 0.7 }}>Казань · Татарстан</li>
              <li style={{ opacity: 0.7 }}>9:00 — 21:00</li>
              <li>
                <a href="#">Telegram · MAX</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 РОЗА ЦВЕТОВ · PATENT RU 2 451 833</div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            <Link href="/privacy">Privacy</Link>
            <a href="#">Terms</a>
            <a href="#">Реквизиты</a>
            <a href="#">Issue №001 / May 2026</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
