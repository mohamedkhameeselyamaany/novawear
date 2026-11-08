/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  reactStrictMode: true,
  output: isGithubActions ? 'export' : undefined,
  basePath: isGithubActions ? '/novawear' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

export default nextConfig;
