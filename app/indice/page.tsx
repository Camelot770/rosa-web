import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { IndexSection } from '@/app/components/sections/IndexSection';
import { loadCatalog } from '@/lib/catalog';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Indice · Содержание · Роза Цветов',
  description:
    'Навигация по сайту «Роза Цветов»: Editorial, коллекции, студия, каталог, уход, подписка.',
};

export default async function IndicePage() {
  const bouquets = await loadCatalog('indice');

  return (
    <>
      <Header bouquetCount={bouquets.length} />
      <main>
        <IndexSection totalBouquets={bouquets.length} />
      </main>
      <Footer />
    </>
  );
}
