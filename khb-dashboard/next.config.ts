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
}

export default nextConfig
