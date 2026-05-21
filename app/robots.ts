import type { MetadataRoute } from 'next';

// Falls back to the actual Vercel-generated canonical URL. Set
// NEXT_PUBLIC_SITE_URL in Vercel env once a custom domain (e.g.
// розацветов.рф) is wired up.
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://rosa-web-naums-projects-5189a309.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cart', '/checkout', '/thank-you', '/api/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
