// Thin API client for rosa-flowers-server.
//
// We keep the shape transformation here so the rest of the app speaks our
// own `Bouquet` type (with collection by price tier, first image as a flat
// string url) rather than the raw API shape with related image rows.

import type { Bouquet, Collection, CollectionEn } from './bouquets-data';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'https://rosa-cvetov-camelot770.amvera.io';

interface ApiImage {
  id: number;
  bouquetId: number;
  url: string;
  sortOrder: number;
}

interface ApiBouquet {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number | null;
  category: string;
  tags: string[] | null;
  inStock: boolean;
  isHit: boolean;
  isNew: boolean;
  customOrder: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  images: ApiImage[];
}

function collectionForPrice(price: number): Collection {
  if (price < 2700) return 'Штиль';
  if (price < 4500) return 'Бриз';
  if (price < 7000) return 'Полёт';
  return 'Высота';
}

function collectionEnFor(c: Collection): CollectionEn {
  const map: Record<Collection, CollectionEn> = {
    Штиль: 'Calm',
    Бриз: 'Breeze',
    Полёт: 'Flight',
    Высота: 'Altitude',
  };
  return map[c];
}

/**
 * Resolve an image URL.
 *
 * The API mixes two image origins:
 *   - absolute URLs (legacy data, e.g. https://rosa-flowers-client.vercel.app/bouquets/bouquet-01.jpeg)
 *   - relative paths (newer admin uploads, e.g. /uploads/<uuid>.jpg)
 *
 * Relative paths are served by the Amvera backend via `app.use('/uploads', express.static(...))`,
 * so we prepend the API origin. Absolute URLs are returned untouched.
 */
function absoluteImage(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) return `${API_BASE}${url}`;
  return `${API_BASE}/${url}`;
}

function shape(api: ApiBouquet, no: number): Bouquet {
  const c = collectionForPrice(api.price);
  const images = (api.images ?? [])
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => absoluteImage(i.url));
  return {
    id: api.id,
    no,
    name: api.name,
    description: api.description ?? '',
    price: api.price,
    oldPrice: api.oldPrice,
    collection: c,
    collectionEn: collectionEnFor(c),
    isHit: !!api.isHit,
    isNew: !!api.isNew,
    images,
  };
}

/**
 * Fetch the full bouquet catalog from the API and return it shaped for the UI.
 *
 * - Sorts by isHit (hits first), then ascending price.
 * - Assigns a stable `no` ordinal for display ("№ 001 / 40").
 *
 * Uses ISR: cached at the edge for 60s, then re-fetched in the background.
 */
export async function fetchBouquets(): Promise<Bouquet[]> {
  const res = await fetch(`${API_BASE}/api/bouquets`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`fetchBouquets: ${res.status} ${res.statusText}`);
  }
  const raw = (await res.json()) as ApiBouquet[];
  const stockOnly = raw.filter((b) => b.inStock);
  stockOnly.sort((a, b) => {
    if (a.isHit !== b.isHit) return a.isHit ? -1 : 1;
    return a.price - b.price;
  });
  return stockOnly.map((b, i) => shape(b, i + 1));
}

export async function fetchBouquet(id: number): Promise<Bouquet | null> {
  const all = await fetchBouquets();
  return all.find((b) => b.id === id) ?? null;
}
