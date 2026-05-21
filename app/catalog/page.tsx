import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { CatalogSpread } from '@/app/components/sections/CatalogSpread';
import { fetchBouquets } from '@/lib/api';
import { BOUQUETS } from '@/lib/bouquets-data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Каталог букетов · Роза Цветов',
  description:
    'Полный каталог стабилизированных букетов студии «Роза Цветов» — четыре коллекции, от Утреннего света до Atelier Luxe. Цены, наличие, доставка по России.',
  openGraph: {
    title: 'Каталог · Роза Цветов',
    description:
      'Стабилизированные букеты, которые живут 3–5 лет. 4 коллекции, доставка из Казани по всей России.',
  },
};

type FilterValue = 'All' | 'Morning Light' | 'Silk' | 'Boudoir' | 'Atelier Luxe';
const VALID_FILTERS: FilterValue[] = ['All', 'Morning Light', 'Silk', 'Boudoir', 'Atelier Luxe'];

interface PageProps {
  searchParams: { filter?: string };
}

export default async function CatalogPage({ searchParams }: PageProps) {
  let bouquets;
  try {
    bouquets = await fetchBouquets();
  } catch (err) {
    console.warn('[catalog] live API unavailable, using bundled snapshot:', err);
    bouquets = BOUQUETS;
  }

  const rawFilter = (searchParams?.filter ?? '').toString();
  const initialFilter: FilterValue = (VALID_FILTERS as string[]).includes(rawFilter)
    ? (rawFilter as FilterValue)
    : 'All';

  return (
    <>
      <Header bouquetCount={bouquets.length} />
      <main>
        <CatalogSpread bouquets={bouquets} initialFilter={initialFilter} />
      </main>
      <Footer />
    </>
  );
}
