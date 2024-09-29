import withBundleAnalyzer from '@next/bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ticket-sagradafamilia.com',
        pathname: '/**',
      },
    ],
  },
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      // Minificación del código
      config.optimization.minimize = true;
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ];
    }

    // Configuración de caché
    if (!isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: path.resolve(__dirname, '.next/cache'),
        name: 'development-cache',
      };

      if (!config.optimization.splitChunks) {
        config.optimization.splitChunks = {};
      }
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      };
    }

    return config;
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);