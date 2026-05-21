import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { AddToCartButton } from '@/app/components/AddToCartButton';
import { fetchBouquet, fetchBouquets } from '@/lib/api';

export const revalidate = 60;

interface PageProps {
  params: { id: string };
}

const fmt = (n: number) => n.toLocaleString('ru-RU');

export async function generateStaticParams() {
  try {
    const all = await fetchBouquets();
    return all.map((b) => ({ id: String(b.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return { title: 'Букет · Роза Цветов' };
  const bouquet = await fetchBouquet(id).catch(() => null);
  if (!bouquet) return { title: 'Букет не найден · Роза Цветов' };
  return {
    title: `«${bouquet.name}» · ${bouquet.collection} · Роза Цветов`,
    description: bouquet.description.slice(0, 160) || undefined,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const bouquet = await fetchBouquet(id);
  if (!bouquet) notFound();

  const all = await fetchBouquets().catch(() => [] as typeof bouquet[]);
  const related = all
    .filter((b) => b.collection === bouquet.collection && b.id !== bouquet.id)
    .slice(0, 4);
  const totalBouquets = all.length;

  const heroImg = bouquet.images[0];
  const otherImages = bouquet.images.slice(1);
  const ix = `№ ${String(bouquet.no).padStart(3, '0')}`;
  const hasDiscount = bouquet.oldPrice && bouquet.oldPrice > bouquet.price;
  const savePct = hasDiscount
    ? Math.round(((bouquet.oldPrice! - bouquet.price) / bouquet.oldPrice!) * 100)
    : 0;

  return (
    <>
      <Header bouquetCount={totalBouquets || undefined} />
      <main className="product-page">
        <div className="container">
          <Link href="/#catalog" className="product-back">
            ← Каталог
          </Link>

          <div className="product-grid">
            <div>
              <div className="product-photo">
                <span className="stamp-no">{ix}</span>
                <span className="plate-tag">{bouquet.collection}</span>
                <div
                  className="image"
                  style={
                    heroImg ? { backgroundImage: `url("${heroImg}")` } : undefined
                  }
                />
              </div>
              {otherImages.length > 0 && (
                <div className="product-thumbs">
                  {bouquet.images.map((img, i) => (
                    <div
                      key={i}
                      className={`thumb ${i === 0 ? 'active' : ''}`}
                      style={{ backgroundImage: `url("${img}")` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="product-info">
              <div className="kicker">✦ {bouquet.collectionEn}</div>
              <h1>
                «<em>{bouquet.name}</em>»
              </h1>

              <div className="meta-row">
                <span className="dot" />
                <span>Запатентованная стабилизация · RU 2 698 058</span>
              </div>

              <div className="price-row">
                {hasDiscount ? <span className="old">{fmt(bouquet.oldPrice!)} ₽</span> : null}
                <span className="price">{fmt(bouquet.price)} ₽</span>
                {hasDiscount ? <span className="save">−{savePct}%</span> : null}
              </div>

              {bouquet.description ? (
                <p className="desc">{bouquet.description}</p>
              ) : null}

              <div className="product-cta">
                <AddToCartButton bouquet={bouquet} />
                <Link href="/cart" className="link-u">
                  Перейти в корзину →
                </Link>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="related-row">
              <h3>
                Ещё из <em>{bouquet.collection.toLowerCase()}</em>
              </h3>
              <div className="related-grid">
                {related.map((b) => {
                  const img = b.images[0];
                  return (
                    <Link key={b.id} className="spread-card" href={`/product/${b.id}`}>
                      <div className="ph">
                        <div
                          className="photo"
                          data-label=""
                          style={
                            img
                              ? {
                                  backgroundImage: `url("${img}")`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                }
                              : undefined
                          }
                        />
                        <span className="stamp-no">№ {String(b.no).padStart(3, '0')}</span>
                      </div>
                      <div className="body">
                        <div>
                          <div className="cap">{b.collection}</div>
                          <div className="nm">
                            <em>«{b.name}»</em>
                          </div>
                        </div>
                        <div className="pr">{fmt(b.price)} ₽</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
