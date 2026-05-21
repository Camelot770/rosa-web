import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { IndexSection } from '@/app/components/sections/IndexSection';
import { fetchBouquets } from '@/lib/api';
import { BOUQUETS } from '@/lib/bouquets-data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Indice · Содержание · Роза Цветов',
  description:
    'Навигация по сайту «Роза Цветов»: Editorial, коллекции, студия, каталог, уход, подписка.',
};

export default async function IndicePage() {
  let bouquets;
  try {
    bouquets = await fetchBouquets();
  } catch (err) {
    console.warn('[indice] live API unavailable, using bundled snapshot:', err);
    bouquets = BOUQUETS;
  }

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
