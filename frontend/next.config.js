/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Pour Vercel, permet de charger les images locales
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Assure que les fichiers statiques sont servis correctement
  trailingSlash: false,
  // Configuration pour Vercel
  output: 'standalone',
}

module.exports = nextConfig
