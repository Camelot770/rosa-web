import type { MetadataRoute } from 'next';
import { fetchBouquets } from '@/lib/api';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://rosa-web.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/catalog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/b2b`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/cart`, lastModified: now, changeFrequency: 'never', priority: 0.1 },
    { url: `${BASE}/checkout`, lastModified: now, changeFrequency: 'never', priority: 0.1 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/offer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/delivery`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/returns`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  let products: MetadataRoute.Sitemap = [];
  try {
    const bouquets = await fetchBouquets();
    products = bouquets.map((b) => ({
      url: `${BASE}/product/${b.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (e) {
    console.warn('[sitemap] could not fetch bouquets:', e);
  }

  return [...staticUrls, ...products];
}
