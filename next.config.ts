import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		qualities: [70, 75, 90, 100],
		localPatterns: [{ pathname: "/**" }],
	},
};

export default nextConfig;
