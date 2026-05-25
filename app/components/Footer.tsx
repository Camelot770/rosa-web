import Link from 'next/link';
import { R } from './Reveal';
import { CONTACTS } from '@/lib/contacts';

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
              <sup className="reg">®</sup>
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
                <Link href="/catalog">Все 40 букетов</Link>
              </li>
              <li>
                <Link href="/catalog?filter=Morning+Light">Утренний свет</Link>
              </li>
              <li>
                <Link href="/catalog?filter=Silk">Шёлковая</Link>
              </li>
              <li>
                <Link href="/catalog?filter=Boudoir">Будуарная</Link>
              </li>
              <li>
                <Link href="/catalog?filter=Atelier+Luxe">Atelier Luxe</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Atelier</h4>
            <ul>
              <li>
                <Link href="/editorial">Философия</Link>
              </li>
              <li>
                <Link href="/atelier">Студия и технология</Link>
              </li>
              <li>
                <Link href="/care">Уход</Link>
              </li>
              <li>
                <Link href="/plates">Коллекции</Link>
              </li>
              <li>
                <Link href="/stabilization">Что такое стабилизация</Link>
              </li>
              <li>
                <Link href="/#patent">Сертификат и патент</Link>
              </li>
              <li>
                <Link href="/b2b">Корпоративным клиентам</Link>
              </li>
              <li>
                <Link href="/#faq">Частые вопросы</Link>
              </li>
              <li>
                <Link href="/privacy">Политика конфиденциальности</Link>
              </li>
              <li>
                <Link href="/offer">Публичная оферта</Link>
              </li>
              <li>
                <Link href="/delivery">Доставка</Link>
              </li>
              <li>
                <Link href="/returns">Возврат и обмен</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a>
              </li>
              <li>
                <a href={CONTACTS.phoneAltHref}>{CONTACTS.phoneAlt}</a>
              </li>
              <li>
                <a href={CONTACTS.emailHref}>{CONTACTS.email}</a>
              </li>
              <li style={{ opacity: 0.7 }}>{CONTACTS.city}</li>
              <li style={{ opacity: 0.7 }}>{CONTACTS.schedule}</li>
              <li>
                <a href={CONTACTS.whatsapp} target="_blank" rel="noopener">
                  WhatsApp →
                </a>
              </li>
              <li>
                <a href={CONTACTS.telegram} target="_blank" rel="noopener">
                  Telegram →
                </a>
              </li>
              <li>
                <a href={CONTACTS.max} target="_blank" rel="noopener">
                  MAX-бот →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 ООО «Роза Цветов» · Патент {CONTACTS.patentNumber}</div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/offer">Terms</Link>
            <Link href="/offer#09">Реквизиты</Link>
            <Link href="/">Issue №001 / May 2026</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
