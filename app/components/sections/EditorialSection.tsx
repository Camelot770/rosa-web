'use client';

import Link from 'next/link';
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
              {['От соло —', '<em>к&nbsp;оркестру.</em>']}
            </Split>
          </div>
          <R delay={200}>
            <div className="standfirst">
              «Четыре коллекции&nbsp;— это <em>четыре состава.</em> От&nbsp;одного голоса
              до&nbsp;оркестра. Чем больше букет&nbsp;— тем больше «инструментов»
              в&nbsp;композиции».
            </div>
          </R>
        </div>

        <R>
          <div className="editorial-body">
            <p>
              Букет похож на&nbsp;музыкальную пьесу: у&nbsp;него есть тема, есть голоса
              и&nbsp;есть громкость. Чем сложнее композиция, тем больше «исполнителей»
              в&nbsp;ней участвует&nbsp;— и&nbsp;тем заметнее она в&nbsp;комнате.
            </p>
            <p>
              <strong>Соло.</strong> Один голос, одна тема. Самые лёгкие букеты каталога:
              тонкая зелень, дымчатая гипсофила, пастельные розы, воздух между стеблями.
              Их ставят у&nbsp;окна, на&nbsp;прикроватную тумбу, дарят без&nbsp;повода.
            </p>
            <p>
              <strong>Дуэт.</strong> Два голоса в&nbsp;разговоре. Появляются акценты,
              контраст, плотность. Больше слоёв, насыщеннее тон&nbsp;— но&nbsp;ещё камерно.
              Хорошо стоят на&nbsp;консоли, у&nbsp;входа, на&nbsp;рабочем столе.
            </p>
            <p className="pull-quote">
              Чем дальше по&nbsp;каталогу&nbsp;— тем больше голосов в&nbsp;букете.
              От&nbsp;одного&nbsp;— к&nbsp;десяткам.
            </p>
            <p>
              <strong>Квартет.</strong> Камерное многоголосие. Сложные многослойные
              композиции с&nbsp;пионовидными розами, эвкалиптом, сухоцветами. Их ставят
              на&nbsp;каминную полку, обеденный стол, в&nbsp;нишу гостиной&nbsp;— туда,
              где они становятся центром комнаты.
            </p>
            <p>
              <strong>Оркестр.</strong> Полный состав, парадные композиции. Объёмные
              кашпо, плотные слои, редкие сорта, премиум-материалы. Двенадцать штучных
              букетов&nbsp;— каждый занимает пространство как интерьерный объект.
            </p>
            <p>
              Четыре коллекции в&nbsp;одном каталоге. Имя сразу подсказывает,
              на&nbsp;сколько «голосов» рассчитан букет&nbsp;— ещё до&nbsp;того, как
              вы откроете карточку.
            </p>
          </div>
        </R>

        <R>
          <div className="scale-row">
            <Link href="/catalog?filter=Solo" className="scale-cell scale-cell-1" aria-label="Открыть коллекцию Соло">
              <span className="sn">— 01 / Один голос</span>
              <span className="sttl">
                <em>Соло</em>
              </span>
              <span className="sex">лёгкие · воздушные · пастельные</span>
              <span className="scap">8 букетов · 1 400–2 550 ₽</span>
              <span className="scale-cta">Открыть →</span>
            </Link>
            <Link href="/catalog?filter=Duet" className="scale-cell scale-cell-2" aria-label="Открыть коллекцию Дуэт">
              <span className="sn">— 02 / Два голоса</span>
              <span className="sttl">
                <em>Дуэт</em>
              </span>
              <span className="sex">контраст · акценты · камерно</span>
              <span className="scap">11 букетов · 2 850–4 380 ₽</span>
              <span className="scale-cta">Открыть →</span>
            </Link>
            <Link href="/catalog?filter=Quartet" className="scale-cell scale-cell-3" aria-label="Открыть коллекцию Квартет">
              <span className="sn">— 03 / Камерно</span>
              <span className="sttl">
                <em>Квартет</em>
              </span>
              <span className="sex">многослойные · крупные · сложные</span>
              <span className="scap">9 букетов · 4 500–6 500 ₽</span>
              <span className="scale-cta">Открыть →</span>
            </Link>
            <Link href="/catalog?filter=Orchestra" className="scale-cell scale-cell-4" aria-label="Открыть коллекцию Оркестр">
              <span className="sn">— 04 / Полный состав</span>
              <span className="sttl">
                <em>Оркестр</em>
              </span>
              <span className="sex">парадные · штучные · премиум</span>
              <span className="scap">12 букетов · 7 000–12 000 ₽</span>
              <span className="scale-cta">Открыть →</span>
            </Link>
          </div>
        </R>
      </div>
    </section>
  );
}
