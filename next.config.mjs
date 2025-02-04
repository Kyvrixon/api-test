import withMDX from '@next/mdx';

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'], // Allow MDX files in pages
};

export default withMDX()(nextConfig);
