import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    });

    return config;
  },
};

export default nextConfig;
