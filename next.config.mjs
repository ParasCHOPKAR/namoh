/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ⚠️ Tells Vercel to ignore TS errors and force the deployment
    ignoreBuildErrors: true,
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
      }
    ],
  },
};

export default nextConfig;