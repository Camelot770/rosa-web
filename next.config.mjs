/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // For M1 catalog images live in /public/bouquets/. In M2 we'll switch to
    // remote URLs from the API and enumerate remotePatterns here.
  },
};

export default nextConfig;
