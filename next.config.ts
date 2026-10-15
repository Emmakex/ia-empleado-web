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
  async redirects() {
    return [
      { source: "/empleado-ia-vs-chatbot", destination: "/comparativas/chatbot", permanent: true },
      { source: "/blog/cuando-elegir-empleado-ia-o-chatbot", destination: "/comparativas/chatbot", permanent: true },
      { source: "/en/ai-employee-vs-chatbot", destination: "/en/comparisons/chatbot", permanent: true },
      { source: "/en/blog/when-to-choose-ai-employee-or-chatbot", destination: "/en/comparisons/chatbot", permanent: true },
      { source: "/agente-ia-vs-rpa", destination: "/comparativas/rpa", permanent: true },
      { source: "/blog/cuando-usar-agente-ia-rpa-o-ambos", destination: "/comparativas/rpa", permanent: true },
      { source: "/en/ai-agent-vs-rpa", destination: "/en/comparisons/rpa", permanent: true },
      { source: "/en/blog/when-to-use-ai-agent-rpa-or-both", destination: "/en/comparisons/rpa", permanent: true },
    ];
  },
};

export default nextConfig;
