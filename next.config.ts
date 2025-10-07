import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.cloudfront.net",
				port: "",
				pathname: "/**",
				search: "",
			},
		],
	},
};

export default withPlausibleProxy({
	customDomain: "https://plausible.ghostbyte.dev",
	scriptName: "script.hash.outbound-links",
})(nextConfig);
