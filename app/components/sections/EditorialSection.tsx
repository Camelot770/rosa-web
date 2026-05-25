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
              {['От штиля —', '<em>к&nbsp;высоте.</em>']}
            </Split>
          </div>
          <R delay={200}>
            <div className="standfirst">
              «Имена наших коллекций&nbsp;— это <em>шкала воздуха.</em> От&nbsp;полного штиля
              к&nbsp;высотному потоку. От&nbsp;букета, который хочется поставить у&nbsp;окна
              и&nbsp;забыть&nbsp;— к&nbsp;парадной композиции, которая дышит на&nbsp;всю комнату».
            </div>
          </R>
        </div>

        <R>
          <div className="editorial-body">
            <p>
              Имена коллекций «Розы Цветов»&nbsp;— это не&nbsp;маркетинговая упаковка
              и&nbsp;не&nbsp;настроение копирайтера. Это <strong>структура</strong>: шкала плотности
              композиции, которая нарастает от&nbsp;самого лёгкого букета до&nbsp;самого крупного.
            </p>
            <p>
              На&nbsp;первой ступени&nbsp;— <strong>Штиль.</strong> Самые лёгкие композиции каталога:
              открытый воздух между стеблями, тонкая зелень, дымчатая гипсофила, нежные сорта роз
              пастельных оттенков. Минималистично&nbsp;— и&nbsp;потому пронзительно. Их хочется
              поставить у&nbsp;окна, на&nbsp;прикроватную тумбу, подарить «просто так».
            </p>
            <p>
              Дальше&nbsp;— <strong>Бриз.</strong> Свежесть, движение, ясность. Более насыщенные
              композиции: больше слоёв, гуще тон, плотнее лепестки. Но&nbsp;всё ещё лёгкие&nbsp;— как
              утренний приморский ветер: чувствуется, наполняет, не&nbsp;давит. Хорошо стоят
              на&nbsp;консоли, у&nbsp;входа, на&nbsp;рабочем столе.
            </p>
            <p className="pull-quote">
              Когда вы листаете каталог, вы движетесь по&nbsp;этой шкале&nbsp;— от&nbsp;тишины
              к&nbsp;звучанию, от&nbsp;точки на&nbsp;тумбе&nbsp;— к&nbsp;объекту в&nbsp;интерьере.
            </p>
            <p>
              На&nbsp;третьей ступени&nbsp;— <strong>Полёт.</strong> Букеты, которые начинают занимать
              пространство. Сложные многослойные композиции с&nbsp;пионовидными розами,
              эвкалиптом, сухоцветами. Их ставят туда, где они становятся центром комнаты:
              каминная полка, обеденный стол, ниша гостиной.
            </p>
            <p>
              Наконец&nbsp;— <strong>Высота.</strong> Парадные композиции в&nbsp;единичном
              исполнении. Большие кашпо, плотные слои, редкие сорта, премиум-материалы.
              Двенадцать букетов, каждый штучный&nbsp;— это уже не&nbsp;просто подарок,
              это интерьерный объект.
            </p>
            <p>
              Так в&nbsp;одном каталоге живут все четыре регистра&nbsp;— от&nbsp;тишины
              до&nbsp;парадного звучания. И&nbsp;каждое имя выбрано не&nbsp;случайно: оно
              сообщает вам <strong>вес</strong> композиции до&nbsp;того, как вы её&nbsp;увидите.
            </p>
          </div>
        </R>

        <R>
          <div className="scale-row">
            <Link href="/catalog?filter=Calm" className="scale-cell scale-cell-1" aria-label="Открыть коллекцию Штиль">
              <span className="sn">— 01 / Тишина</span>
              <span className="sttl">
                <em>Штиль</em>
              </span>
              <span className="sex">безветрие · минимализм · открытое пространство</span>
              <span className="scap">8 букетов · 1 400–2 550 ₽</span>
              <span className="scale-cta">Открыть →</span>
            </Link>
            <Link href="/catalog?filter=Breeze" className="scale-cell scale-cell-2" aria-label="Открыть коллекцию Бриз">
              <span className="sn">— 02 / Движение</span>
              <span className="sttl">
                <em>Бриз</em>
              </span>
              <span className="sex">свежесть · ясность · ритм</span>
              <span className="scap">11 букетов · 2 850–4 380 ₽</span>
              <span className="scale-cta">Открыть →</span>
            </Link>
            <Link href="/catalog?filter=Flight" className="scale-cell scale-cell-3" aria-label="Открыть коллекцию Полёт">
              <span className="sn">— 03 / Подъём</span>
              <span className="sttl">
                <em>Полёт</em>
              </span>
              <span className="sex">слоистость · парение · масштаб</span>
              <span className="scap">9 букетов · 4 500–6 500 ₽</span>
              <span className="scale-cta">Открыть →</span>
            </Link>
            <Link href="/catalog?filter=Altitude" className="scale-cell scale-cell-4" aria-label="Открыть коллекцию Высота">
              <span className="sn">— 04 / Вершина</span>
              <span className="sttl">
                <em>Высота</em>
              </span>
              <span className="sex">премиум · штучное · парадное</span>
              <span className="scap">12 букетов · 7 000–12 000 ₽</span>
              <span className="scale-cta">Открыть →</span>
            </Link>
          </div>
        </R>
      </div>
    </section>
  );
}
