/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tdc-matchmaker-1-mkrj.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
