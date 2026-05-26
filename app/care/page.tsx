import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { CONTACTS } from '@/lib/contacts';

export const metadata: Metadata = {
  title: 'Уход за стабилизированным букетом · Роза Цветов',
  description:
    'Как ухаживать за стабилизированными цветами, чтобы букет прожил 3–5 лет. Правила влажности, света, температуры и протирки.',
};

export default function CarePage() {
  return (
    <>
      <Header />

      <main className="legal-page">
        <div className="legal-container">
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;C1</span>
            <span className="lab">— Care</span>
            <span className="sub">/ Правила ухода</span>
          </div>

          <h1 className="disp disp-lg" style={{ margin: 0 }}>
            Уход за
            <br />
            <em>букетом.</em>
          </h1>
          <p className="lead">
            Стабилизированный букет служит <strong style={{ color: 'var(--ink)' }}>3–5&nbsp;лет</strong>{' '}
            — если соблюдать простые правила. Их три: не&nbsp;поливать, беречь от&nbsp;влаги,
            держать в&nbsp;тени.
          </p>

          {/* Quick 3-rule summary block */}
          <div
            className="info-block"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              padding: 28,
              marginBottom: 48,
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--vermilion)', marginBottom: 6 }}>
                — 01
              </div>
              <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 22 }}>
                Не поливать
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--vermilion)', marginBottom: 6 }}>
                — 02
              </div>
              <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 22 }}>
                Беречь от&nbsp;воды
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--vermilion)', marginBottom: 6 }}>
                — 03
              </div>
              <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 22 }}>
                Не&nbsp;на&nbsp;солнце
              </div>
            </div>
          </div>

          <article className="legal-doc">
            <section>
              <h2>
                <span className="num">01</span>
                <span>Почему так? Что такое стабилизация</span>
              </h2>
              <p>
                Стабилизированный букет — это настоящие срезанные цветы, в&nbsp;которых природный
                сок аккуратно заменён на&nbsp;безопасный раствор (пищевой глицерин + натуральные пигменты).
                Лепестки сохраняют упругость, мягкость и&nbsp;цвет на&nbsp;годы.
              </p>
              <p>
                Но&nbsp;этот раствор боится трёх вещей: <strong>воды, прямого солнца
                и&nbsp;экстремальных температур</strong>. Всё остальное буке́ту нипочём.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">02</span>
                <span>Влажность — главный враг</span>
              </h2>
              <p>
                Вода разрушает стабилизирующий состав. Поэтому строго&nbsp;нельзя:
              </p>
              <ul>
                <li>поливать букет;</li>
                <li>опрыскивать из&nbsp;пульверизатора;</li>
                <li>ставить в&nbsp;вазу с&nbsp;водой;</li>
                <li>держать в&nbsp;ванной комнате или&nbsp;на&nbsp;кухне у&nbsp;плиты;</li>
                <li>ставить рядом с&nbsp;увлажнителем воздуха;</li>
                <li>оставлять на&nbsp;балконе в&nbsp;дождь.</li>
              </ul>
              <p>
                Идеальная влажность в&nbsp;помещении&nbsp;— <strong>40–65%</strong>. Если у&nbsp;вас сильно
                сухо зимой или сыро летом&nbsp;— просто переставьте букет подальше от&nbsp;окна
                или&nbsp;от&nbsp;увлажнителя.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">03</span>
                <span>Свет — без фанатизма</span>
              </h2>
              <p>
                Стабилизированные пигменты постепенно выцветают под&nbsp;прямыми солнечными лучами.
                За&nbsp;3–6&nbsp;месяцев на&nbsp;южном окне розовый может стать пастельно-бежевым,
                красный&nbsp;— тусклым.
              </p>
              <ul>
                <li>
                  <strong>Хорошо:</strong> рассеянный свет, северное окно, любое место в&nbsp;глубине
                  комнаты, консоль в&nbsp;коридоре, прикроватная тумба.
                </li>
                <li>
                  <strong>Плохо:</strong> южный подоконник, лоджия с&nbsp;ярким светом, рабочая
                  лампа на&nbsp;близком расстоянии.
                </li>
              </ul>
              <p>
                Обычное комнатное освещение, даже ежедневное, букету не&nbsp;вредит&nbsp;— только
                прямые УФ-лучи.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">04</span>
                <span>Температура</span>
              </h2>
              <p>
                Идеальный диапазон&nbsp;— <strong>от&nbsp;+15&nbsp;°C до&nbsp;+25&nbsp;°C</strong>.
                Это обычная комнатная температура круглый год.
              </p>
              <p>Чего избегать:</p>
              <ul>
                <li>поставить вплотную к&nbsp;батарее зимой&nbsp;— лепестки пересушатся;</li>
                <li>оставить в&nbsp;машине летом на&nbsp;солнце или&nbsp;зимой на&nbsp;морозе;</li>
                <li>положить в&nbsp;холодильник&nbsp;— конденсат намочит лепестки.</li>
              </ul>
              <p>
                Если букет приехал зимой&nbsp;с&nbsp;курьером&nbsp;— дайте ему 30–40&nbsp;минут
                «отдохнуть» в&nbsp;коробке при&nbsp;комнатной температуре, прежде чем открывать.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">05</span>
                <span>Пыль — как протирать</span>
              </h2>
              <p>Раз в&nbsp;2–3&nbsp;недели:</p>
              <ul>
                <li>
                  Аккуратно сдуть пыль <strong>феном на&nbsp;холодном режиме</strong> с&nbsp;расстояния
                  20–30&nbsp;см. Самый простой способ.
                </li>
                <li>
                  Или мягкой кистью для&nbsp;макияжа / художественной&nbsp;— очень осторожно,
                  не&nbsp;нажимая на&nbsp;лепестки.
                </li>
              </ul>
              <p>
                <strong>Категорически нельзя:</strong>
              </p>
              <ul>
                <li>протирать влажной тряпкой;</li>
                <li>использовать спреи (пыли, для&nbsp;цветов, освежители&nbsp;воздуха) рядом;</li>
                <li>пылесосить.</li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">06</span>
                <span>Срок жизни</span>
              </h2>
              <p>При&nbsp;соблюдении правил:</p>
              <ul>
                <li>
                  <strong>Стабилизированные розы и&nbsp;мхи&nbsp;— до&nbsp;5–7&nbsp;лет.</strong>{' '}
                  Самые стойкие, цвет почти не&nbsp;уходит.
                </li>
                <li>
                  <strong>Гортензии, эвкалипт, гипсофила&nbsp;— 3–4&nbsp;года.</strong>{' '}
                  Средняя стойкость, постепенно становятся бледнее.
                </li>
                <li>
                  <strong>Нежные сухоцветы в&nbsp;составе (амарантус, лимониум)&nbsp;— 2–3&nbsp;года.</strong>
                </li>
              </ul>
              <p>
                Если букет постоял у&nbsp;вас 5&nbsp;лет и&nbsp;стал блёкнуть&nbsp;— это нормально,
                он&nbsp;честно отработал. Можно заменить отдельные элементы или&nbsp;заказать обновление.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">07</span>
                <span>Если что-то пошло не так</span>
              </h2>
              <ul>
                <li>
                  <strong>Лепестки помялись при&nbsp;транспортировке.</strong> Можно осторожно расправить
                  пинцетом или&nbsp;пальцами&nbsp;— материал упругий, восстанавливается.
                </li>
                <li>
                  <strong>Букет выцвел на&nbsp;солнце.</strong> К&nbsp;сожалению, необратимо.
                  Переставьте в&nbsp;тень&nbsp;— дальнейшее выцветание остановится.
                </li>
                <li>
                  <strong>Появился запах сырости.</strong> Скорее всего, букет хранится в&nbsp;слишком
                  влажном помещении. Переставьте в&nbsp;сухое место, проветрите.
                </li>
                <li>
                  <strong>Пыль не&nbsp;уходит феном.</strong> Иногда помогает мягкая кисть. Если совсем
                  не&nbsp;справляетесь&nbsp;— напишите нам, расскажем как.
                </li>
                <li>
                  <strong>Что-то странное.</strong> Свяжитесь с&nbsp;нами по&nbsp;телефону{' '}
                  <a href={CONTACTS.phoneHref} style={{ color: 'var(--vermilion)' }}>
                    {CONTACTS.phone}
                  </a>
                  &nbsp;— разберёмся.
                </li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">08</span>
                <span>Короткий список&nbsp;— что НЕ&nbsp;надо делать</span>
              </h2>
              <div className="info-block">
                <p>
                  <strong>Не&nbsp;поливать.</strong> Не&nbsp;опрыскивать. Не&nbsp;ставить в&nbsp;вазу
                  с&nbsp;водой.
                </p>
                <p>
                  <strong>Не&nbsp;держать на&nbsp;прямом солнце</strong> часами каждый день.
                </p>
                <p>
                  <strong>Не&nbsp;вплотную к&nbsp;батарее</strong> зимой.
                </p>
                <p>
                  <strong>Не&nbsp;протирать влажной тряпкой.</strong> Только сухой фен холодным режимом
                  или&nbsp;мягкая кисть.
                </p>
                <p>
                  <strong>Не&nbsp;дарить кошке поиграть.</strong> Хотя соблазн есть.
                </p>
              </div>
            </section>
          </article>

          <div style={{ marginTop: 56, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/catalog" className="btn">
              Открыть каталог →
            </Link>
            <Link href="/#faq" className="link-u">
              Частые вопросы →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
