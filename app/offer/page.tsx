import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Публичная оферта · Роза Цветов',
  description:
    'Договор публичной оферты ООО «Роза Цветов» на продажу стабилизированных букетов через сайт.',
};

export default function OfferPage() {
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
              <span className="caps">Юридический документ</span>
              <span className="ast">✦</span>
            </div>
          </div>
        </div>
      </header>

      <main className="legal-page">
        <div className="legal-container">
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;∞</span>
            <span className="lab">— Legal</span>
            <span className="sub">/ Offer</span>
          </div>

          <h1 className="disp disp-lg" style={{ margin: 0 }}>
            Публичная
            <br />
            <em>оферта</em>
          </h1>
          <p className="lead">
            Договор купли-продажи стабилизированных цветочных композиций&nbsp;
            <strong style={{ fontStyle: 'normal', color: 'var(--ink)' }}>
              ООО «Роза Цветов»
            </strong>{' '}
            через сайт розацветов.рф.
          </p>

          <article className="legal-doc">
            <section>
              <h2>
                <span className="num">01</span>
                <span>Общие положения</span>
              </h2>
              <p>
                1.1. Настоящий документ является публичной офертой ООО «Роза Цветов» (далее&nbsp;—
                «Продавец») и&nbsp;содержит существенные условия договора розничной купли-продажи
                товаров, представленных на&nbsp;Сайте.
              </p>
              <p>
                1.2. В&nbsp;соответствии со&nbsp;статьёй&nbsp;437 Гражданского кодекса Российской
                Федерации настоящий документ признаётся публичной офертой.
              </p>
              <p>
                1.3. Принимая условия настоящей оферты, Покупатель подтверждает, что ознакомлен
                со&nbsp;всеми её&nbsp;условиями.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">02</span>
                <span>Предмет договора</span>
              </h2>
              <p>
                2.1. Продавец обязуется передать в&nbsp;собственность Покупателю, а&nbsp;Покупатель
                обязуется принять и&nbsp;оплатить товар&nbsp;— стабилизированные цветочные композиции,
                произведённые по&nbsp;запатентованной технологии (патент&nbsp;RU&nbsp;2&nbsp;698&nbsp;058).
              </p>
              <p>
                2.2. Наименование, ассортимент, количество и&nbsp;цена товара определяются на&nbsp;Сайте
                на&nbsp;момент оформления заказа.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">03</span>
                <span>Порядок оформления заказа</span>
              </h2>
              <p>
                3.1. Покупатель оформляет заказ через корзину на&nbsp;Сайте, указывая контактные
                данные, адрес доставки и&nbsp;способ оплаты.
              </p>
              <p>
                3.2. После оформления заказа Покупатель получает на&nbsp;указанный телефон звонок
                от&nbsp;менеджера для&nbsp;подтверждения деталей.
              </p>
              <p>
                3.3. Договор купли-продажи считается заключённым с&nbsp;момента подтверждения
                Покупателем условий заказа и&nbsp;его оплаты.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">04</span>
                <span>Цена и порядок оплаты</span>
              </h2>
              <p>
                4.1. Цены на&nbsp;товары указаны в&nbsp;рублях Российской Федерации и&nbsp;включают
                НДС, где применимо.
              </p>
              <p>
                4.2. Продавец имеет право изменять цены на&nbsp;Сайте в&nbsp;одностороннем порядке.
                Изменения не&nbsp;распространяются на&nbsp;уже подтверждённые заказы.
              </p>
              <p>4.3. Оплата заказа производится одним из&nbsp;следующих способов:</p>
              <ul>
                <li>онлайн через сервис ЮKassa (банковские карты, СБП, электронные кошельки);</li>
                <li>наличными или картой курьеру при&nbsp;доставке (по&nbsp;договорённости);</li>
                <li>по&nbsp;счёту&nbsp;— для&nbsp;юридических лиц.</li>
              </ul>
              <p>
                4.4. Стоимость доставки зависит от&nbsp;адреса и&nbsp;рассчитывается в&nbsp;момент
                оформления заказа. При&nbsp;стоимости заказа от&nbsp;5&nbsp;000&nbsp;₽ доставка по
                Казани&nbsp;— бесплатно.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">05</span>
                <span>Доставка</span>
              </h2>
              <p>
                5.1. Условия доставки изложены в&nbsp;разделе{' '}
                <Link href="/delivery">«Условия доставки»</Link>.
              </p>
              <p>
                5.2. Право собственности на&nbsp;товар и&nbsp;риск его случайной гибели переходят
                к&nbsp;Покупателю в&nbsp;момент передачи товара.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">06</span>
                <span>Возврат и обмен</span>
              </h2>
              <p>
                6.1. Условия возврата и&nbsp;обмена изложены в&nbsp;разделе{' '}
                <Link href="/returns">«Возврат и обмен»</Link> и&nbsp;соответствуют требованиям
                Закона&nbsp;РФ «О&nbsp;защите прав потребителей».
              </p>
            </section>

            <section>
              <h2>
                <span className="num">07</span>
                <span>Ответственность сторон</span>
              </h2>
              <p>
                7.1. Продавец не&nbsp;несёт ответственности за&nbsp;ущерб, причинённый Покупателю
                вследствие ненадлежащего использования товара (несоблюдения условий ухода,
                механических повреждений и&nbsp;т.&nbsp;п.).
              </p>
              <p>
                7.2. Стороны освобождаются от&nbsp;ответственности при&nbsp;возникновении обстоятельств
                непреодолимой силы (форс-мажор).
              </p>
            </section>

            <section>
              <h2>
                <span className="num">08</span>
                <span>Персональные данные</span>
              </h2>
              <p>
                8.1. Обработка персональных данных Покупателя производится в&nbsp;соответствии
                с&nbsp;<Link href="/privacy">Политикой конфиденциальности</Link>.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">09</span>
                <span>Реквизиты Продавца</span>
              </h2>
              <div className="info-block">
                <p>
                  <strong>Общество с&nbsp;ограниченной ответственностью «Роза Цветов»</strong>
                </p>
                <p>
                  <span className="label">Юридический адрес</span>
                  422772, Республика Татарстан, Пестречинский район, д.&nbsp;Званка,
                  ул.&nbsp;Приозерная, д.&nbsp;58
                </p>
                <p>
                  <span className="label">Реквизиты</span>
                  ИНН: 1686022889
                  <br />
                  КПП: 168601001
                  <br />
                  ОГРН: 1231600000060
                </p>
                <p>
                  <span className="label">Контакты</span>
                  <a href="mailto:rozacvetov@list.ru">rozacvetov@list.ru</a>
                  <br />
                  <a href="tel:+79600483996">+7 960 048 39 96</a>
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <footer className="legal-foot">
        <div className="legal-container">
          <hr className="hairline" />
          <div className="row">
            <span>© 2026 ООО «Роза Цветов» · Patent RU 2 698 058</span>
            <Link href="/">← Вернуться на сайт</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
