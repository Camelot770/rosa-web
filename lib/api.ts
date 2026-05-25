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

/**
 * Frontend-only display name overrides. The DB still has the original female-name /
 * musical-term titles (Татьяна, Соната, etc.) — they show as is in the admin and
 * the Telegram/MAX mini-apps. On rosa-web we display thematic names that match
 * each price tier's collection (Штиль / Бриз / Полёт / Высота).
 *
 * Important caveat: when a customer orders via web, the guest order route on
 * the backend stores the OrderItem.name from the DB (not the renamed one).
 * So the admin sees "Соната 1600 ₽" while the customer saw "Шёпот 1600 ₽".
 * To fix the drift either (a) push the new names to admin, or (b) extend the
 * guest order route to accept a client-supplied display name.
 */
const NAME_OVERRIDES: Record<number, string> = {
  // Штиль (8) — тишина
  120: 'Тишина', 11: 'Шёпот', 137: 'Дымка', 14: 'Иней',
  71: 'Пауза', 125: 'Полусон', 117: 'Безмолвие', 136: 'Утро',
  // Бриз (11) — лёгкий ветер
  143: 'Бриз', 121: 'Свежесть', 60: 'Рассвет', 129: 'Прибой', 128: 'Парус',
  135: 'Залив', 138: 'Побережье', 139: 'Муссон', 147: 'Узор', 114: 'Маре',
  116: 'Тёплый ветер',
  // Полёт (9)
  140: 'Парение', 115: 'Перо', 113: 'Крыло', 112: 'Ласточка', 141: 'Полёт',
  127: 'Вираж', 57: 'Взмах', 133: 'Лебедь', 134: 'Ястреб',
  // Высота (12)
  110: 'Облако', 130: 'Стратосфера', 19: 'Высь', 124: 'Орбита', 119: 'Альпы',
  118: 'Космос', 111: 'Эфир', 148: 'Звезда', 144: 'Эльбрус', 145: 'Монблан',
  146: 'Эверест', 142: 'Вершина',
};

function shape(api: ApiBouquet, no: number): Bouquet {
  const c = collectionForPrice(api.price);
  const images = (api.images ?? [])
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => absoluteImage(i.url));
  return {
    id: api.id,
    no,
    name: NAME_OVERRIDES[api.id] ?? api.name,
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
