/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/k',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/k',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
  },
  distDir: 'out',
}

export default nextConfig
