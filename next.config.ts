import type { NextConfig } from "next";

const noIndexHeaders = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 604800,
  },
  async headers() {
    return [
      { source: "/brand-preview/:path*", headers: noIndexHeaders },
      { source: "/brand-campaign/:path*", headers: noIndexHeaders },
      { source: "/api/:path*", headers: noIndexHeaders },
    ];
  },
};

export default nextConfig;
