import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { PlatesSection } from '@/app/components/sections/PlatesSection';
import { loadCatalog } from '@/lib/catalog';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Plates · Четыре коллекции · Роза Цветов',
  description:
    'Четыре коллекции стабилизированных букетов: Соло, Дуэт, Квартет, Оркестр. От одного голоса до оркестра.',
};

export default async function PlatesPage() {
  const bouquets = await loadCatalog('plates');

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
