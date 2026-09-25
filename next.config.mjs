/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/order-warehouse-management', destination: '/order-and-warehouse-management' },
      { source: '/solutions/order-warehouse-management', destination: '/order-and-warehouse-management' },
      { source: '/solutions/order-and-warehouse-management', destination: '/order-and-warehouse-management' },
      { source: '/solutions/d2c-marketplace-fulfillment', destination: '/d2c-marketplace-fulfillment' },
      { source: '/Modern Commerce Requires.dc.html', destination: '/order-and-warehouse-management' },
      { source: '/D2C and Marketplace Fulfillment.dc.html', destination: '/d2c-marketplace-fulfillment' },
      { source: '/One Platform. Absolute Control copy.dc.html', destination: '/platform' },
      { source: '/Warevolt Homepage.dc.html', destination: '/' },
    ];
  },
};

export default nextConfig;
