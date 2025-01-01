<<<<<<< HEAD
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/k',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/k',
}

export default nextConfig
>>>>>>> d243c2a9ec35577cde683cb942a0a7e90566b490
