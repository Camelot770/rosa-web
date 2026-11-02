import type { MetadataRoute } from 'next';
import { loadCatalog } from '@/lib/catalog';
import { SITE_URL as BASE } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/catalog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/indice`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/editorial`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/plates`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/atelier`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/care`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/stabilization`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/b2b`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/offer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/delivery`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/returns`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Rethrows at runtime so Next keeps the last good sitemap: a short API outage
  // must not drop every product URL.
  const bouquets = await loadCatalog('sitemap');
  const products: MetadataRoute.Sitemap = bouquets.map((b) => ({
    url: `${BASE}/product/${b.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticUrls, ...products];
}
