import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Возврат и обмен · Роза Цветов',
  description:
    'Правила возврата и обмена стабилизированных букетов студии «Роза Цветов». 7-дневный возврат в соответствии с законом РФ.',
};

export default function ReturnsPage() {
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
            <span className="num">P.&nbsp;R1</span>
            <span className="lab">— Returns</span>
            <span className="sub">/ Возврат и обмен</span>
          </div>

          <h1 className="disp disp-lg" style={{ margin: 0 }}>
            Возврат
            <br />
            <em>и обмен</em>
          </h1>
          <p className="lead">
            Стабилизированные букеты&nbsp;— это товар надлежащего качества, поэтому подпадают
            под&nbsp;общие правила дистанционной торговли согласно ст.&nbsp;26.1 Закона&nbsp;РФ
            «О&nbsp;защите прав потребителей».
          </p>

          <article className="legal-doc">
            <section>
              <h2>
                <span className="num">01</span>
                <span>Возврат товара надлежащего качества</span>
              </h2>
              <p>
                1.1. Покупатель имеет право отказаться от&nbsp;заказа в&nbsp;любой момент
                до&nbsp;его передачи курьеру или&nbsp;до&nbsp;вручения, а&nbsp;после получения&nbsp;—
                в&nbsp;течение <strong>7 (семи)&nbsp;дней</strong>.
              </p>
              <p>
                1.2. Возврат возможен при&nbsp;условии, что букет:
              </p>
              <ul>
                <li>сохранил товарный вид и&nbsp;потребительские свойства;</li>
                <li>не&nbsp;имеет следов использования или&nbsp;повреждений;</li>
                <li>сохранена комплектация (кашпо, сертификат, упаковка).</li>
              </ul>
              <p>
                1.3. Возврат денежных средств производится в&nbsp;течение 10&nbsp;дней
                на&nbsp;тот&nbsp;же способ оплаты, которым был оплачен заказ. Стоимость доставки
                до&nbsp;Покупателя удерживается; обратную доставку Покупатель оплачивает
                самостоятельно.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">02</span>
                <span>Возврат товара ненадлежащего качества</span>
              </h2>
              <p>
                2.1. При&nbsp;получении букета осмотрите его в&nbsp;присутствии курьера. Если
                обнаружены повреждения (помятые лепестки, нарушенная композиция, отсутствие
                элементов)&nbsp;— зафиксируйте это в&nbsp;акте при&nbsp;курьере или&nbsp;на&nbsp;фото
                в&nbsp;течение 1&nbsp;часа после получения.
              </p>
              <p>
                2.2. Покупатель вправе по&nbsp;своему выбору требовать:
              </p>
              <ul>
                <li>замены на&nbsp;аналогичный или&nbsp;другой букет;</li>
                <li>возврата уплаченной за&nbsp;товар суммы;</li>
                <li>устранения недостатков (если возможно).</li>
              </ul>
              <p>
                2.3. Возврат денег за&nbsp;брак&nbsp;— в&nbsp;течение 10&nbsp;дней. Обратная
                доставка&nbsp;— за&nbsp;счёт Продавца.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">03</span>
                <span>Товары, не подлежащие возврату</span>
              </h2>
              <p>
                3.1. Согласно п.&nbsp;4 ст.&nbsp;26.1 Закона&nbsp;РФ, не&nbsp;подлежат возврату
                товары надлежащего качества, имеющие <strong>индивидуально-определённые
                свойства</strong>, если указанный товар может быть использован исключительно
                приобретающим его потребителем.
              </p>
              <p>
                3.2. К&nbsp;таким товарам относятся букеты, изготовленные по&nbsp;индивидуальному
                заказу&nbsp;— подбор оттенков, надписи, кастомизация. Эти заказы возврату
                не&nbsp;подлежат, если только не&nbsp;имеют производственных дефектов.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">04</span>
                <span>Как оформить возврат</span>
              </h2>
              <p>4.1. Свяжитесь с&nbsp;нами одним из&nbsp;способов:</p>
              <ul>
                <li>
                  телефон:{' '}
                  <a href="tel:+79600483996" style={{ color: 'var(--vermilion)' }}>
                    +7 960 048 39 96
                  </a>
                </li>
                <li>
                  e-mail:{' '}
                  <a href="mailto:rozacvetov@list.ru" style={{ color: 'var(--vermilion)' }}>
                    rozacvetov@list.ru
                  </a>
                </li>
              </ul>
              <p>4.2. В&nbsp;обращении укажите:</p>
              <ul>
                <li>номер заказа;</li>
                <li>причину возврата;</li>
                <li>при&nbsp;возврате брака&nbsp;— фото повреждений;</li>
                <li>реквизиты для&nbsp;возврата денежных средств.</li>
              </ul>
              <p>
                4.3. Менеджер согласует с&nbsp;вами способ возврата товара (передача курьеру,
                самостоятельная отправка в&nbsp;студию) и&nbsp;сроки.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">05</span>
                <span>Уход за букетом</span>
              </h2>
              <p>
                Стабилизированный букет служит 3–5&nbsp;лет при&nbsp;соблюдении условий:
              </p>
              <ul>
                <li>не&nbsp;поливать;</li>
                <li>беречь от&nbsp;прямых солнечных лучей и&nbsp;высокой влажности;</li>
                <li>держать при&nbsp;температуре от&nbsp;+15&nbsp;°C до&nbsp;+25&nbsp;°C;</li>
                <li>избегать резких перепадов температур.</li>
              </ul>
              <p>
                Несоблюдение этих условий считается ненадлежащим использованием товара&nbsp;—
                в&nbsp;этом случае возврат не&nbsp;производится.
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
