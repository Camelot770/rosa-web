'use client';

import { R, Split } from '../Reveal';

export function EditorialSection() {
  return (
    <section className="editorial" id="editorial">
      <div className="container">
        <R>
          <div className="page-marker" style={{ marginBottom: 24 }}>
            <span className="num">P.&nbsp;04</span>
            <span className="lab">— Editorial</span>
            <span className="sub">/ Спред № 01</span>
          </div>
        </R>

        <div className="editorial-head">
          <div>
            <R>
              <div className="kicker">✦ Философия названий</div>
            </R>
            <Split as="h2" className="disp disp-xl">
              {['От воздуха —', '<em>к&nbsp;камню.</em>']}
            </Split>
          </div>
          <R delay={200}>
            <div className="standfirst">
              «Имена нашего каталога живут <em>в&nbsp;одном&nbsp;ряду</em>&nbsp;— от&nbsp;лёгкого
              к&nbsp;плотному, от&nbsp;воздуха к&nbsp;камню. Чем сложнее композиция,
              тем&nbsp;«весомее» её&nbsp;имя».
            </div>
          </R>
        </div>

        <R>
          <div className="editorial-body">
            <p>
              Имена в&nbsp;каталоге «Розы Цветов»&nbsp;— это не&nbsp;маркетинговая упаковка и&nbsp;не&nbsp;настроение
              копирайтера. Это <strong>структура</strong>: шкала, по которой движется композиция
              от&nbsp;самого лёгкого букета до&nbsp;самого плотного.
            </p>
            <p>
              На&nbsp;первой ступени&nbsp;— <strong>Утренний свет.</strong> Эти букеты названы как утренние
              явления: <em>заря, иней, дымка, шёпот, мерцание, просвет.</em> Их хочется поставить
              у&nbsp;окна, на&nbsp;прикроватную тумбу, подарить «просто так». Внутри&nbsp;— нежные сорта роз
              пастельных оттенков, дымчатая гипсофила, тонкий лимониум.
            </p>
            <p>
              Дальше&nbsp;— <strong>Шёлковая.</strong> Имена тканей и&nbsp;прозрачных минералов:{' '}
              <em>шёлк, бархат, кашемир, парча, опал, янтарь, аметист.</em> На&nbsp;ощупь эти букеты
              тяжелее: больше слоёв, гуще тон, плотнее лепестки. Их вес уже ощущается на ладони.
            </p>
            <p className="pull-quote">
              Когда вы листаете каталог, вы движетесь по&nbsp;этой шкале&nbsp;— от&nbsp;утра к&nbsp;ночи,
              от&nbsp;воздуха к&nbsp;мрамору.
            </p>
            <p>
              На&nbsp;третьей ступени&nbsp;— <strong>Будуарная.</strong> Драгоценные камни и&nbsp;интерьерные
              состояния: <em>сапфир, изумруд, истома, нега, мираж, веранда, полнолуние.</em> Это уже
              крупные композиции, выбираемые в&nbsp;интерьер: они занимают место на&nbsp;консоли,
              на&nbsp;каминной полке, в&nbsp;нише гостиной.
            </p>
            <p>
              Наконец&nbsp;— <strong>Atelier Luxe.</strong> Имена дворцов и&nbsp;замков Европы:{' '}
              <em>Палаццо, Бельведер, Шеверни, Шамбор, Шенонсо, Версаль, Альгамбра, Фонтенбло, Барокко.</em>{' '}
              Двенадцать редких букетов, каждый в&nbsp;единичном экземпляре. Это уже не&nbsp;подарок&nbsp;— это
              наследие.
            </p>
            <p>
              Так в&nbsp;одном каталоге сосуществуют все четыре регистра&nbsp;— от&nbsp;утренней дымки до&nbsp;дворцовой
              архитектуры. И&nbsp;каждое имя выбрано не&nbsp;случайно: оно сообщает вам <strong>вес</strong>{' '}
              композиции до&nbsp;того, как вы её&nbsp;увидите.
            </p>
          </div>
        </R>

        <R>
          <div className="scale-row">
            <div className="scale-cell scale-cell-1">
              <span className="sn">— 01 / Воздух</span>
              <span className="sttl">
                <em>Утренний</em> свет
              </span>
              <span className="sex">Заря · Дымка · Шёпот · Мерцание · Иней</span>
              <span className="scap">8 букетов · 1 400–2 550 ₽</span>
            </div>
            <div className="scale-cell scale-cell-2">
              <span className="sn">— 02 / Ткань</span>
              <span className="sttl">
                <em>Шёлковая</em>
              </span>
              <span className="sex">Шёлк · Бархат · Кашемир · Опал · Янтарь</span>
              <span className="scap">11 букетов · 2 850–4 380 ₽</span>
            </div>
            <div className="scale-cell scale-cell-3">
              <span className="sn">— 03 / Камень</span>
              <span className="sttl">
                <em>Будуарная</em>
              </span>
              <span className="sex">Сапфир · Истома · Веранда · Каскад · Полнолуние</span>
              <span className="scap">9 букетов · 4 500–6 500 ₽</span>
            </div>
            <div className="scale-cell scale-cell-4">
              <span className="sn">— 04 / Дворец</span>
              <span className="sttl">
                Atelier <em>Luxe</em>
              </span>
              <span className="sex">Палаццо · Шамбор · Версаль · Альгамбра · Фонтенбло</span>
              <span className="scap">12 букетов · 7 000–12 000 ₽</span>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}
