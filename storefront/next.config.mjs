import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*.tunnel.amboras.com'],
  outputFileTracingRoot: __dirname,
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  env: {
    NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',
    NEXT_PUBLIC_ANALYTICS_ENDPOINT: process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || '',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90, 100],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        // Supabase Storage (production)
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@tanstack/react-query',
      '@medusajs/js-sdk',
      'sonner',
    ],
  },
  // Faster incremental builds
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  // Turbopack handles dev bundling; no webpack overrides needed.
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
