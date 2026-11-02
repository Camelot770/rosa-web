import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { AddToCartButton } from '@/app/components/AddToCartButton';
import { FavoriteToggle } from '@/app/components/FavoriteToggle';
import { ProductGallery } from '@/app/components/ProductGallery';
import { loadCatalog } from '@/lib/catalog';

export const revalidate = 60;

interface PageProps {
  params: { id: string };
}

const fmt = (n: number) => n.toLocaleString('ru-RU');

// Built from the snapshot when the API is down, so a deploy during an outage
// still has every product page as its last good version.
export async function generateStaticParams() {
  const all = await loadCatalog('product params');
  return all.map((b) => ({ id: String(b.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return { title: 'Букет · Роза Цветов' };
  const all = await loadCatalog('product metadata').catch(() => null);
  if (!all) return { title: 'Букет · Роза Цветов' };
  const bouquet = all.find((b) => b.id === id);
  if (!bouquet) return { title: 'Букет не найден · Роза Цветов' };
  return {
    title: `«${bouquet.name}» · ${bouquet.collection} · Роза Цветов`,
    description: bouquet.description.slice(0, 160) || undefined,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const all = await loadCatalog('product');
  const bouquet = all.find((b) => b.id === id);
  if (!bouquet) notFound();

  const related = all
    .filter((b) => b.collection === bouquet.collection && b.id !== bouquet.id)
    .slice(0, 4);
  const totalBouquets = all.length;

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
            <ProductGallery images={bouquet.images} stamp={ix} collection={bouquet.collection} />

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

              {bouquet.customOrder ? (
                <p className="desc">Изготавливаем под заказ, срок уточним при подтверждении.</p>
              ) : null}

              <div className="product-cta">
                <AddToCartButton bouquet={bouquet} />
                <FavoriteToggle bouquet={bouquet} variant="inline" />
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
