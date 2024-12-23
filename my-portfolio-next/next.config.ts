/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  webpack: (config: any, { isServer }: { isServer: boolean }) => { 
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 250000,
    };

    return config;
  },
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig;