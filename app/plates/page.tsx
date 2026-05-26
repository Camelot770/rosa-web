import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { PlatesSection } from '@/app/components/sections/PlatesSection';
import { fetchBouquets } from '@/lib/api';
import { BOUQUETS } from '@/lib/bouquets-data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Plates · Четыре коллекции · Роза Цветов',
  description:
    'Четыре коллекции стабилизированных букетов: Соло, Дуэт, Квартет, Оркестр. От одного голоса до оркестра.',
};

export default async function PlatesPage() {
  let bouquets;
  try {
    bouquets = await fetchBouquets();
  } catch (err) {
    console.warn('[plates] live API unavailable, using bundled snapshot:', err);
    bouquets = BOUQUETS;
  }

  return (
    <>
      <Header bouquetCount={bouquets.length} />
      <main>
        <PlatesSection bouquets={bouquets} />
      </main>
      <Footer />
    </>
  );
}
