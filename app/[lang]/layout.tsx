import "./../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { type Locale, i18n } from "../../i18n-config";
import { getDictionary } from "@/get-dictionaries";
import GoogleAnalytics from "./_components/google-analytics";

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }));
}

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(props: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
	const params = await props.params;
	const dictionary = await getDictionary(params.lang);

	return {
		title: dictionary.siteName,
		description: dictionary.siteDescription,
	};
}

export default async function RootLayout(props: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const params = await props.params;

	const { children } = props;

	return (
		<html lang={params.lang}>
			<GoogleAnalytics id="G-VQEBLMPXH4" />
			<body className={inter.className}>
				<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
				{children}
			</body>
		</html>
	);
}
