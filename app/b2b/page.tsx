import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { CONTACTS } from '@/lib/contacts';

export const metadata: Metadata = {
  title: 'Корпоративным клиентам · Роза Цветов',
  description:
    'Корпоративные подарки и интерьерные композиции от студии «Роза Цветов». Брендирование, фирменные ленты и коробки, тираж от 1 суток. Запрос коммерческого предложения.',
};

export default function B2BPage() {
  return (
    <>
      <Header />
      <main className="legal-page" style={{ paddingTop: 'clamp(48px, 8vw, 112px)' }}>
        <div className="legal-container">
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;B1</span>
            <span className="lab">— B2B</span>
            <span className="sub">/ Для бизнеса и партнёров</span>
          </div>

          <h1 className="disp disp-lg" style={{ margin: 0 }}>
            Подарки,
            <br />
            <em>которые помнят.</em>
          </h1>
          <p className="lead">
            Корпоративные композиции, которые долго стоят, не&nbsp;теряют внешний вид
            и&nbsp;напоминают о&nbsp;вашем бренде каждый день&nbsp;— а&nbsp;не&nbsp;неделю
            до&nbsp;того, как уйдут в&nbsp;мусорное ведро.
          </p>

          <div
            className="b2b-hero"
            role="img"
            aria-label="Фирменная упаковка «Роза Цветов» с букетом внутри"
            style={{ backgroundImage: 'url("/site-photos/b2b-branded-box.png")' }}
          />

          <article className="legal-doc">
            <section>
              <h2>
                <span className="num">01</span>
                <span>Что мы делаем для бизнеса</span>
              </h2>
              <ul>
                <li>
                  <strong>Подарки клиентам и&nbsp;партнёрам.</strong> Композиции с&nbsp;фирменными
                  лентами, открытками и&nbsp;коробкой в&nbsp;цветах вашего бренда.
                </li>
                <li>
                  <strong>Корпоративные тиражи.</strong> От&nbsp;10&nbsp;до&nbsp;1&nbsp;000+
                  единиц&nbsp;— к&nbsp;Новому году, 8 марта, годовщинам компании, юбилеям
                  партнёров.
                </li>
                <li>
                  <strong>Интерьерные композиции для офисов и&nbsp;ресепшен.</strong>{' '}
                  Стабилизированный мох, деревья, флористические объекты для&nbsp;холлов,
                  переговорных, лобби.
                </li>
                <li>
                  <strong>Подарочные сертификаты</strong>&nbsp;— номиналом на&nbsp;ваш выбор.
                </li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">02</span>
                <span>Брендирование</span>
              </h2>
              <p>Под ваш фирменный стиль:</p>
              <ul>
                <li>фирменные ленты с&nbsp;логотипом или&nbsp;слоганом;</li>
                <li>цветовая палитра букета&nbsp;— под&nbsp;бренд-гайд;</li>
                <li>именные открытки с&nbsp;индивидуальным текстом для&nbsp;каждого получателя;</li>
                <li>упаковка (кашпо, коробки) с&nbsp;тиснением или&nbsp;печатью.</li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">03</span>
                <span>Сроки и логистика</span>
              </h2>
              <p>
                <strong>Малые тиражи (до&nbsp;30&nbsp;шт.)</strong>&nbsp;— готовы за&nbsp;1–3&nbsp;суток.
                Большие тиражи и&nbsp;брендирование&nbsp;— срок согласуем индивидуально, обычно
                от&nbsp;7 до&nbsp;14&nbsp;дней.
              </p>
              <p>
                Доставка по&nbsp;Казани собственным курьером, по&nbsp;другим городам России&nbsp;—
                через СДЭК или&nbsp;EMS. Стабилизированный букет переносит транспортировку без
                потери качества.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">04</span>
                <span>Документы и оплата</span>
              </h2>
              <ul>
                <li>оплата&nbsp;— по&nbsp;счёту с&nbsp;НДС или&nbsp;без, по&nbsp;вашей системе налогообложения;</li>
                <li>договор, акт, ТТН, счёт-фактура&nbsp;— стандартный комплект;</li>
                <li>возможна работа с&nbsp;юридическими лицами и&nbsp;индивидуальными предпринимателями;</li>
                <li>при&nbsp;регулярных закупках&nbsp;— рамочный договор и&nbsp;индивидуальные условия.</li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">05</span>
                <span>Как запросить коммерческое предложение</span>
              </h2>
              <p>
                Свяжитесь с&nbsp;нами любым удобным способом, и&nbsp;менеджер пришлёт КП с&nbsp;ценами,
                сроками и&nbsp;вариантами оформления под&nbsp;вашу задачу. Обычно отвечаем
                в&nbsp;течение часа в&nbsp;рабочее время.
              </p>

              <div className="info-block">
                <p>
                  <strong>Прямой контакт менеджера по B2B</strong>
                </p>

                <p>
                  <span className="label">Телефон</span>
                  <a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a>
                  <br />
                  <a href={CONTACTS.phoneAltHref}>{CONTACTS.phoneAlt}</a>
                </p>

                <p>
                  <span className="label">E-mail</span>
                  <a href={CONTACTS.emailHref}>{CONTACTS.email}</a>
                  <br />
                  <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
                    Напишите в&nbsp;теме «Корп. предложение» и&nbsp;коротко опишите задачу:
                    количество, повод, желаемые сроки.
                  </span>
                </p>

                <p>
                  <span className="label">Мессенджеры</span>
                  <a href={CONTACTS.whatsapp} target="_blank" rel="noopener">
                    WhatsApp
                  </a>
                  &nbsp;·{' '}
                  <a href={CONTACTS.telegram} target="_blank" rel="noopener">
                    Telegram
                  </a>
                  &nbsp;·{' '}
                  <a href={CONTACTS.max} target="_blank" rel="noopener">
                    MAX-бот
                  </a>
                </p>

                <p>
                  <span className="label">Режим работы</span>
                  {CONTACTS.schedule}
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
