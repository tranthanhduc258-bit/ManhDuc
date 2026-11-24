import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/gio-hang", destination: "/mua-hang", permanent: true },
      { source: "/dat-hang", destination: "/mua-hang", permanent: true },
      { source: "/dat-hang/:path*", destination: "/mua-hang", permanent: true },
    ];
  },
};

export default nextConfig;
