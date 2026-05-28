/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // We added this earlier for Vercel
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kommodo.ai',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // 👇 Added to allow Google Image links
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      // 👇 Added to allow IndiaMart image links
      {
        protocol: 'https',
        hostname: '5.imimg.com',
      }
    ],
  },
};

export default nextConfig;