import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure `pageExtensions` to include markdown and MDX files
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	// Optionally, add any other Next.js config below
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "mbip30pcdb.ufs.sh",
				pathname: "/f/**",
			},
		],
	},
};

const withMDX = createMDX({
	// Add markdown plugins here, as desired
});

const withNextIntl = createNextIntlPlugin();

// Merge MDX config with Next.js config
export default withNextIntl(withMDX(nextConfig));
