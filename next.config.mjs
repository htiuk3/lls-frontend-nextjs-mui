/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-images.kiotviet.vn',
        port: '',
        pathname: '/lolemshopct/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2-retail-images.kiotviet.vn',
        port: '',
        pathname: '/lolemshopct/**',
      },
    ],
  },
};

export default nextConfig;
