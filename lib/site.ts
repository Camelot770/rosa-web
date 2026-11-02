// Canonical site URL for metadata, robots and the sitemap. Set
// NEXT_PUBLIC_SITE_URL in Vercel env once a custom domain is wired up.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://rosa-web.vercel.app';
