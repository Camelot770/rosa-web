import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Что такое стабилизированные цветы · Роза Цветов',
  description:
    'Технология стабилизации цветов: как из живой розы получается букет, который служит 3–5 лет без воды и ухода. Чем отличается от сухоцветов и искусственных цветов.',
};

export default function StabilizationPage() {
  return (
    <>
      <Header />

      <main className="legal-page">
        <div className="legal-container">
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;S1</span>
            <span className="lab">— Stabilization</span>
            <span className="sub">/ Что это такое</span>
          </div>

          <h1 className="disp disp-lg" style={{ margin: 0 }}>
            Что такое
            <br />
            <em>стабилизированные цветы</em>
          </h1>
          <p className="lead">
            Это настоящие живые цветы, в&nbsp;которых природный сок аккуратно заменён
            на&nbsp;безопасный раствор. Лепестки сохраняют упругость, цвет и&nbsp;мягкость&nbsp;—
            <strong style={{ color: 'var(--ink)' }}> на&nbsp;3–5&nbsp;лет</strong>. Без воды,
            без&nbsp;ухода.
          </p>

          {/* Quick three-block summary */}
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
                — 3–5 лет
              </div>
              <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.1 }}>
                срок жизни
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--vermilion)', marginBottom: 6 }}>
                — 100%
              </div>
              <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.1 }}>
                натуральные
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--vermilion)', marginBottom: 6 }}>
                — 0
              </div>
              <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.1 }}>
                ухода в&nbsp;год
              </div>
            </div>
          </div>

          <article className="legal-doc">
            <section>
              <h2>
                <span className="num">01</span>
                <span>Как это делается</span>
              </h2>
              <p>
                Цветок срезают в&nbsp;момент идеального раскрытия&nbsp;— когда лепестки максимально
                свежие и&nbsp;плотные. Сразу после среза стебель погружают в&nbsp;специальный раствор:
                смесь натуральных растительных соков, пищевого глицерина и&nbsp;пищевых пигментов.
              </p>
              <p>
                По&nbsp;законам капиллярного давления раствор поднимается по&nbsp;стеблю и&nbsp;медленно&nbsp;—
                в&nbsp;течение 2–4&nbsp;недель&nbsp;— заменяет собой природный сок цветка.
                В&nbsp;результате клетки растения сохраняют свою структуру, но&nbsp;перестают
                нуждаться в&nbsp;воде и&nbsp;питании.
              </p>
              <p>
                Цветок остаётся живым на&nbsp;вид и&nbsp;на&nbsp;ощупь&nbsp;— гибкий стебель,
                бархатистые лепестки, естественный аромат. Но&nbsp;при&nbsp;этом
                не&nbsp;вянет, не&nbsp;осыпается, не&nbsp;требует ухода.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">02</span>
                <span>Чем отличается от сухоцветов</span>
              </h2>
              <p>
                Сухоцвет&nbsp;— это цветок, полностью обезвоженный путём сушки. Лепестки становятся
                ломкими, хрупкими, теряют насыщенность цвета, легко осыпаются от&nbsp;любого
                прикосновения.
              </p>
              <p>Стабилизированный цветок&nbsp;— наоборот:</p>
              <ul>
                <li>
                  <strong>Эластичный</strong>&nbsp;— лепестки гнутся, как у&nbsp;живой розы;
                </li>
                <li>
                  <strong>Не&nbsp;осыпается</strong>&nbsp;— даже при&nbsp;транспортировке;
                </li>
                <li>
                  <strong>Сохраняет цвет</strong>&nbsp;— насыщенный, как в&nbsp;первый день;
                </li>
                <li>
                  <strong>Тактильно неотличим от&nbsp;живого</strong>&nbsp;— гости часто
                  не&nbsp;понимают, что цветок не&nbsp;нужно поливать.
                </li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">03</span>
                <span>Чем отличается от искусственных</span>
              </h2>
              <p>
                Искусственные цветы&nbsp;— это пластик, ткань или&nbsp;латекс, имитация. Они никогда
                не&nbsp;были живыми, не&nbsp;имеют запаха и&nbsp;при&nbsp;близком рассмотрении сразу
                видны: швы, литые лепестки, неестественный блеск.
              </p>
              <p>Стабилизированный цветок&nbsp;— настоящий:</p>
              <ul>
                <li>
                  <strong>Это конкретная роза</strong>, которая росла в&nbsp;конкретной теплице;
                </li>
                <li>
                  Сохраняется естественная микротекстура лепестка&nbsp;— на&nbsp;ней видны
                  жилки, оттенки, неровности;
                </li>
                <li>
                  Сохраняется природный аромат (нежный, ненавязчивый);
                </li>
                <li>
                  Под микроскопом&nbsp;— живая клеточная структура.
                </li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">04</span>
                <span>Технология и патент</span>
              </h2>
              <p>
                Технология стабилизации цветов, мха и&nbsp;растений разработана компанией
                <strong> «Роза Цветов»</strong> и&nbsp;запатентована в&nbsp;Роспатенте&nbsp;—
                <strong> патент RU&nbsp;№&nbsp;2&#8202;698&#8202;058</strong>. Цветы,
                стабилизированные по&nbsp;нашей технологии, будут радовать не&nbsp;один год.
              </p>
              <p>
                Состав раствора, температурный режим, время выдержки&nbsp;— всё определено
                и&nbsp;стандартизировано. Студия работает по&nbsp;этой технологии
                с&nbsp;2017&nbsp;года, делая стабилизацию вручную небольшими партиями&nbsp;—
                каждый цветок проходит индивидуальный контроль.
              </p>
              <p>
                Раствор экологически безопасен:
              </p>
              <ul>
                <li>натуральные растительные соки&nbsp;— основа;</li>
                <li>пищевой глицерин&nbsp;— проводник;</li>
                <li>пищевые пигменты&nbsp;— для&nbsp;закрепления цвета;</li>
                <li>без формальдегидов и&nbsp;токсичных консервантов.</li>
              </ul>
              <p>
                Поэтому стабилизированные букеты <strong>гипоаллергенные</strong>: подходят даже
                людям с&nbsp;аллергией на&nbsp;живые срезанные цветы или&nbsp;пыльцу.
              </p>
            </section>

            <section>
              <h2>
                <span className="num">05</span>
                <span>Что можно стабилизировать</span>
              </h2>
              <p>Технология работает почти со&nbsp;всеми растительными материалами:</p>
              <ul>
                <li>
                  <strong>Розы</strong>&nbsp;— главный материал, держат форму и&nbsp;цвет лучше всех
                  (до&nbsp;5–7&nbsp;лет);
                </li>
                <li>
                  <strong>Гортензии, пионы, ранункулюсы</strong>&nbsp;— нежные интерьерные;
                </li>
                <li>
                  <strong>Эвкалипт, рускус, оливковые ветви</strong>&nbsp;— зелень и&nbsp;ароматы;
                </li>
                <li>
                  <strong>Стабилизированный мох</strong>&nbsp;— для&nbsp;интерьерных композиций
                  и&nbsp;фитостен;
                </li>
                <li>
                  <strong>Стабилизированные деревья</strong>&nbsp;— для&nbsp;офисов, ресторанов, лобби
                  (озеленение без полива).
                </li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">06</span>
                <span>Где это используется</span>
              </h2>
              <ul>
                <li>
                  <strong>Подарок «со&nbsp;смыслом».</strong> Букет, который остаётся годами, а&nbsp;не&nbsp;неделю;
                </li>
                <li>
                  <strong>Интерьер дома.</strong> Композиция на&nbsp;консоли, у&nbsp;окна, на&nbsp;каминной полке;
                </li>
                <li>
                  <strong>Корпоративные подарки</strong> с&nbsp;брендированием&nbsp;— партнёрам,
                  клиентам, сотрудникам;
                </li>
                <li>
                  <strong>Интерьерное озеленение</strong> офисов, ресторанов, лобби, спа&nbsp;—
                  без&nbsp;затрат на&nbsp;полив и&nbsp;замену;
                </li>
                <li>
                  <strong>Свадебные букеты «навсегда».</strong> Который не&nbsp;нужно засушивать
                  кустарно&nbsp;— уже стабилизирован профессионально.
                </li>
              </ul>
            </section>

            <section>
              <h2>
                <span className="num">07</span>
                <span>Сравнительная таблица</span>
              </h2>
              <div className="info-block" style={{ padding: 0, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: 'var(--paper)', textAlign: 'left' }}>
                      <th style={{ padding: '14px 18px', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                        Параметр
                      </th>
                      <th style={{ padding: '14px 18px', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--vermilion)' }}>
                        Стабилизированные
                      </th>
                      <th style={{ padding: '14px 18px', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                        Свежие срезанные
                      </th>
                      <th style={{ padding: '14px 18px', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                        Сухоцвет
                      </th>
                      <th style={{ padding: '14px 18px', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                        Искусственные
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ fontFamily: 'var(--body)' }}>
                    {[
                      ['Срок жизни', '3–5 лет', '5–10 дней', '1–2 года', '∞ (но видно)'],
                      ['Уход', 'не нужен', 'вода каждый день', 'вытирать пыль', 'вытирать пыль'],
                      ['Натуральные', 'да', 'да', 'да', 'нет (пластик)'],
                      ['Тактильно живой', 'да', 'да', 'нет, хрупкий', 'нет, имитация'],
                      ['Запах', 'природный', 'природный', 'выветрился', 'нет / химия'],
                      ['Аллергия', 'нет (без пыльцы)', 'возможна', 'нет', 'нет'],
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: '1px solid var(--ink-line)' }}>
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            style={{
                              padding: '12px 18px',
                              color: j === 1 ? 'var(--ink)' : 'var(--ink-soft)',
                              fontWeight: j === 0 ? 500 : 400,
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2>
                <span className="num">08</span>
                <span>Какие минусы?</span>
              </h2>
              <p>
                Честно: <strong>они есть</strong>. Стабилизированный букет:
              </p>
              <ul>
                <li>
                  <strong>Дороже свежего&nbsp;в моменте.</strong> Но&nbsp;дешевле, если считать
                  «стоимость на&nbsp;год эстетики»: один букет за&nbsp;5&nbsp;000&nbsp;₽
                  на&nbsp;3&nbsp;года&nbsp;≈ 140&nbsp;₽ в&nbsp;месяц;
                </li>
                <li>
                  <strong>Боится воды.</strong> Нельзя поливать, опрыскивать, держать в&nbsp;ванной;
                </li>
                <li>
                  <strong>Постепенно выцветает на&nbsp;ярком солнце.</strong> Поэтому в&nbsp;тень;
                </li>
                <li>
                  <strong>Меньше выбор сортов</strong>, чем у&nbsp;свежих&nbsp;— стабилизации поддаются
                  не&nbsp;все виды.
                </li>
              </ul>
              <p>
                Всё это компенсируется главным: цветы <strong>живут годами</strong>, не&nbsp;вянут,
                не&nbsp;требуют ухода. Подробнее об&nbsp;уходе&nbsp;—{' '}
                <Link href="/care" style={{ color: 'var(--vermilion)' }}>
                  на&nbsp;странице правил ухода
                </Link>
                .
              </p>
            </section>
          </article>

          <div style={{ marginTop: 56, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/catalog" className="btn">
              Открыть каталог →
            </Link>
            <Link href="/care" className="link-u">
              Как ухаживать →
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
