/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The site does not use next/image: pictures are plain backgrounds from the API.
    unoptimized: true,
  },
};

export default nextConfig;
