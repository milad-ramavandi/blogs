import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hero.io",
        pathname: "/**",
       
      },
      {
        protocol: "https",
        hostname: "blog.hero.io",
        pathname: "/wp-content/uploads/**",
       
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**"
      },
    ],
  },
};

export default nextConfig;
