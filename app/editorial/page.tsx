import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { EditorialSection } from '@/app/components/sections/EditorialSection';
import { loadCatalog } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Editorial · Философия названий · Роза Цветов',
  description:
    'Имена коллекций «Розы Цветов» — это четыре состава. От одного голоса до оркестра. Четыре ступени: Соло, Дуэт, Квартет, Оркестр.',
};

export const revalidate = 60;

export default async function EditorialPage() {
  const bouquets = await loadCatalog('editorial');

  return (
    <>
      <Header bouquetCount={bouquets.length} />
      <main>
        <EditorialSection bouquets={bouquets} />
      </main>
      <Footer />
    </>
  );
}
