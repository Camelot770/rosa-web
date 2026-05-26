import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { CatalogSpread } from '@/app/components/sections/CatalogSpread';
import { fetchBouquets } from '@/lib/api';
import { BOUQUETS } from '@/lib/bouquets-data';

export const revalidate = 60;

type FilterValue = 'All' | 'Calm' | 'Breeze' | 'Flight' | 'Altitude';
const VALID_FILTERS: FilterValue[] = ['All', 'Calm', 'Breeze', 'Flight', 'Altitude'];

/** Russian display label for each filter value (English in URL → Russian on page). */
const FILTER_LABEL_RU: Record<FilterValue, string> = {
  All: 'Каталог букетов',
  Calm: 'Штиль',
  Breeze: 'Бриз',
  Flight: 'Полёт',
  Altitude: 'Высота',
};

interface PageProps {
  searchParams: { filter?: string };
}

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const raw = (searchParams?.filter ?? '').toString();
  const f: FilterValue = (VALID_FILTERS as string[]).includes(raw) ? (raw as FilterValue) : 'All';
  const titleHead =
    f === 'All' ? 'Каталог букетов' : `Коллекция «${FILTER_LABEL_RU[f]}»`;
  const description =
    f === 'All'
      ? 'Полный каталог стабилизированных букетов студии «Роза Цветов» — четыре коллекции от Штиля до Высоты. Цены, наличие, доставка по России.'
      : `Букеты коллекции «${FILTER_LABEL_RU[f]}» — стабилизированные композиции студии «Роза Цветов», которые живут 3–5 лет. Доставка из Казани по всей России.`;
  return {
    title: `${titleHead} · Роза Цветов`,
    description,
    openGraph: { title: `${titleHead} · Роза Цветов`, description },
  };
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
