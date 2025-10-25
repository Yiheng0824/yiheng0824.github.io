import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/phd-homepage", // 仓库名，必须加上
  assetPrefix: "/phd-homepage/", // 静态资源路径前缀
  images: { unoptimized: true },
};

export default nextConfig;
