import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "dlxdegv87k9ck.cloudfront.net",
				port: "",
				pathname: "/**",
				search: "",
			},
		],
	},
};

export default nextConfig;
