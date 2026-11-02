// Thin API client for rosa-flowers-server.
//
// We keep the shape transformation here so the rest of the app speaks our
// own `Bouquet` type (with collection by price tier, first image as a flat
// string url) rather than the raw API shape with related image rows.

import type { Bouquet, Collection, CollectionEn } from './bouquets-data';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'https://roza-cvetov-camelot770.msk1.amvera.tech';

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
  isFeatured?: boolean;
  customOrder: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  images: ApiImage[];
}

function collectionForPrice(price: number): Collection {
  if (price < 2700) return 'Соло';
  if (price < 4500) return 'Дуэт';
  if (price < 7000) return 'Квартет';
  return 'Оркестр';
}

function collectionEnFor(c: Collection): CollectionEn {
  const map: Record<Collection, CollectionEn> = {
    Соло: 'Solo',
    Дуэт: 'Duet',
    Квартет: 'Quartet',
    Оркестр: 'Orchestra',
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
    isFeatured: !!api.isFeatured,
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

/** fetch() that gives up instead of hanging when the API stops answering. */
export async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = 10_000,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export type LiveBouquet =
  | { status: 'ok'; bouquet: Bouquet; orderable: boolean }
  | { status: 'missing' }
  | { status: 'error' };

/**
 * Current state of one bouquet, for checking cart lines from the browser.
 * Unlike the catalog list this also returns out-of-stock bouquets, so
 * `missing` really means the id is gone and `error` means we could not ask.
 */
export async function fetchBouquetLive(id: number): Promise<LiveBouquet> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/bouquets/${id}`, { cache: 'no-store' });
    if (res.status === 404 || res.status === 400) return { status: 'missing' };
    if (!res.ok) return { status: 'error' };
    const raw = (await res.json()) as ApiBouquet;
    return {
      status: 'ok',
      bouquet: shape(raw, 0),
      orderable: !!raw.inStock || !!raw.customOrder,
    };
  } catch {
    return { status: 'error' };
  }
}

export interface ShopSettings {
  deliveryPrice: number;
  freeDeliveryFrom: number;
  minOrder: number;
}

/** Used until /api/settings answers. Delivery matches the server's fallbacks;
 *  the minimum stays off so an API hiccup can't block a valid cart. */
export const DEFAULT_SHOP_SETTINGS: ShopSettings = {
  deliveryPrice: 500,
  freeDeliveryFrom: 5000,
  minOrder: 0,
};

function intSetting(value: string | undefined, fallback: number): number {
  const n = parseInt(value ?? '', 10);
  return Number.isFinite(n) ? n : fallback;
}

export async function fetchShopSettings(): Promise<ShopSettings | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    const raw = (await res.json()) as Record<string, string | undefined>;
    return {
      deliveryPrice: intSetting(raw.delivery_price, DEFAULT_SHOP_SETTINGS.deliveryPrice),
      freeDeliveryFrom: intSetting(raw.free_delivery_from, DEFAULT_SHOP_SETTINGS.freeDeliveryFrom),
      minOrder: intSetting(raw.min_order, DEFAULT_SHOP_SETTINGS.minOrder),
    };
  } catch {
    return null;
  }
}
