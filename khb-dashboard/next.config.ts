/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/k',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/k/',
  trailingSlash: true,
}

export default nextConfig
