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
      { source: "/blog/que-es-un-empleado-ia-y-como-se-diferencia-de-un-chatbot", destination: "/blog/que-es-un-agente-ia", permanent: true },
      { source: "/en/blog/what-is-an-ai-employee-and-how-is-it-different-from-a-chatbot", destination: "/en/blog/what-is-an-ai-agent", permanent: true },
      { source: "/blog/cuanto-cuesta-implementar-empleado-ia", destination: "/coste-empleado-ia", permanent: true },
      { source: "/en/blog/how-much-does-an-ai-employee-cost", destination: "/en/ai-employee-cost", permanent: true },
      { source: "/blog/como-calcular-roi-empleado-ia", destination: "/calculadora-roi", permanent: true },
      { source: "/en/blog/how-to-calculate-ai-employee-roi", destination: "/en/roi-calculator", permanent: true },
    ];
  },
};

export default nextConfig;
