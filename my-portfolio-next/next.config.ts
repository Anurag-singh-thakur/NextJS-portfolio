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
    ],
  },
  // Increase header size limits
  httpAgentOptions: {
    keepAlive: true,
  },
  webpack: (config, { isServer }) => {
    // Reduce chunk size for better performance
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 250000,
    };

    return config;
  },
  // Compress responses
  compress: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
  // Performance optimizations
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig;