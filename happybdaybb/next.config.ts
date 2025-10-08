import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack(config, options) {
    // Handle .mp3 files using file-loader (if you want to store them in 'src/assets')
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'static/audio/', // stores audio files in _next/static/audio/
          publicPath: '/_next/static/audio/', // URL path to access the file
        },
      },
    });

    // Return the config object
    return config;
  },
};

export default nextConfig;
