import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Условия доставки · Роза Цветов',
  description:
    'Доставка стабилизированных букетов студии «Роза Цветов» по Казани, Татарстану и регионам России.',
};

export default function DeliveryPage() {
  return (
    <>
      <header className="legal-topbar">
        <div className="legal-container">
          <div className="section-bar">
            <div className="left">
              <Link href="/" className="caps">
                ← Роза Цветов
              </Link>
            </div>
            <div className="right">
              <span className="caps">Условия</span>
              <span className="ast">✦</span>
            </div>
          </div>
        </div>
      </header>

      <main className="legal-page">
        <div className="legal-container">
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;D1</span>
            <span className="lab">— Delivery</span>
            <span className="sub">/ Доставка</span>
          </div>

          <h1 className="disp disp-lg" style={{ margin: 0 }}>
            Условия
            <br />
            <em>доставки</em>
          </h1>
          <p className="lead">
            Стабилизированные букеты не&nbsp;требуют холода и&nbsp;спецупаковки, поэтому мы&nbsp;возим
            их&nbsp;аккуратными курьерами по&nbsp;Казани и&nbsp;отправляем СДЭК/Почтой России
            по&nbsp;остальной России.
          </p>

          <article className="legal-doc">
            <section>
              <h2>
                <span className="num">01</span>
                <span>Казань — курьерская доставка</span>
              </h2>
              <p>
                Букет доставит наш курьер в&nbsp;интервале времени, который вы выберете при&nbsp;оформлении
                заказа. Стандартные интервалы: 10:00–14:00, 14:00–18:00, 18:00–21:00.
              </p>
              <ul>
                <li>
                  <strong>Стоимость:</strong> 500&nbsp;₽ по&nbsp;Казани.
                </li>
                <li>
                  <strong>Бесплатно</strong> при&nbsp;стоимости заказа от&nbsp;5&nbsp;000&nbsp;₽.
                </li>
                <li>
                  <strong>Срок:</strong> в&nbsp;день заказа, если заказ оформлен до&nbsp;15:00.
                  Заказы позднее&nbsp;— на&nbsp;следующий день.
                </li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">02</span>
                <span>Татарстан</span>
              </h2>
              <p>
                Доставка по&nbsp;Татарстану осуществляется СДЭК или&nbsp;курьерскими сервисами&nbsp;—
                стоимость и&nbsp;сроки рассчитываются менеджером после подтверждения заказа.
                Срок&nbsp;— 1–2&nbsp;рабочих дня.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">03</span>
                <span>Другие регионы России</span>
              </h2>
              <p>Отправка через СДЭК или&nbsp;Почту России. Букеты упаковываются в&nbsp;жёсткие
              картонные коробки с&nbsp;амортизацией.</p>
              <ul>
                <li>СДЭК&nbsp;— 2–4&nbsp;дня, стоимость от&nbsp;500&nbsp;₽.</li>
                <li>Почта России (EMS)&nbsp;— 3–7&nbsp;дней, стоимость от&nbsp;400&nbsp;₽.</li>
                <li>
                  Точную стоимость доставки сообщит менеджер после оформления заказа.
                </li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">04</span>
                <span>Самовывоз</span>
              </h2>
              <p>
                Вы можете забрать букет из&nbsp;нашей студии в&nbsp;Казани в&nbsp;удобное время.
                Адрес студии и&nbsp;точное время согласует менеджер после заказа.
              </p>
              <p>
                Самовывоз&nbsp;— бесплатно.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">05</span>
                <span>Что делать, если получатель не на месте</span>
              </h2>
              <p>
                Курьер совершит до&nbsp;трёх попыток дозвона. Если связаться не&nbsp;удастся, букет
                будет возвращён в&nbsp;студию&nbsp;— мы&nbsp;свяжемся с&nbsp;вами для&nbsp;согласования
                повторной доставки. Стабилизированный букет переносит ожидание без потери качества.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">06</span>
                <span>Анонимная доставка</span>
              </h2>
              <p>
                При&nbsp;оформлении заказа можно отметить «Анонимный подарок»&nbsp;— курьер
                не&nbsp;будет называть имя отправителя. Текст для&nbsp;открытки прикладывается
                по&nbsp;вашему желанию.
              </p>
            </section>
          </article>
        </div>
      </main>

      <footer className="legal-foot">
        <div className="legal-container">
          <hr className="hairline" />
          <div className="row">
            <span>© 2026 ООО «Роза Цветов»</span>
            <Link href="/">← Вернуться на сайт</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
