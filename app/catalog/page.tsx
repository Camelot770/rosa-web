import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { CatalogSpread } from '@/app/components/sections/CatalogSpread';
import { loadCatalog } from '@/lib/catalog';

export const revalidate = 60;

type FilterValue = 'All' | 'Solo' | 'Duet' | 'Quartet' | 'Orchestra';
const VALID_FILTERS: FilterValue[] = ['All', 'Solo', 'Duet', 'Quartet', 'Orchestra'];

/** Russian display label for each filter value (English in URL → Russian on page). */
const FILTER_LABEL_RU: Record<FilterValue, string> = {
  All: 'Каталог букетов',
  Solo: 'Соло',
  Duet: 'Дуэт',
  Quartet: 'Квартет',
  Orchestra: 'Оркестр',
};

interface PageProps {
  searchParams: Promise<{ filter?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const raw = ((await searchParams)?.filter ?? '').toString();
  const f: FilterValue = (VALID_FILTERS as string[]).includes(raw) ? (raw as FilterValue) : 'All';
  const titleHead =
    f === 'All' ? 'Каталог букетов' : `Коллекция «${FILTER_LABEL_RU[f]}»`;
  const description =
    f === 'All'
      ? 'Полный каталог стабилизированных букетов студии «Роза Цветов» — четыре коллекции от Соло до Оркестра. Цены, наличие, доставка по России.'
      : `Букеты коллекции «${FILTER_LABEL_RU[f]}» — стабилизированные композиции студии «Роза Цветов», которые живут 3–5 лет. Доставка из Казани по всей России.`;
  return {
    title: `${titleHead} · Роза Цветов`,
    description,
    openGraph: { title: `${titleHead} · Роза Цветов`, description },
  };
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const bouquets = await loadCatalog('catalog');

  const rawFilter = ((await searchParams)?.filter ?? '').toString();
  const initialFilter: FilterValue = (VALID_FILTERS as string[]).includes(rawFilter)
    ? (rawFilter as FilterValue)
    : 'All';

  return (
    <>
      <Header bouquetCount={bouquets.length} />
      <main>
        {/* key: links like ?filter=Solo navigate without a reload, so the filter state must reset. */}
        <CatalogSpread key={initialFilter} bouquets={bouquets} initialFilter={initialFilter} />
      </main>
      <Footer />
    </>
  );
}
