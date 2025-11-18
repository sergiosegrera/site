"use client";

"use client";

import { locales } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
	const locale = useLocale();
	const currentPath = usePathname();

	// Remove the locale from the pathname
	const pathWithoutLocale = currentPath.replace(`/${locale}`, "");

	// Find the index of the current locale
	const currentLocaleIndex = locales.indexOf(locale);
	// Determine the next locale
	const nextLocale = locales[(currentLocaleIndex + 1) % locales.length];

	const displayText = locale.toUpperCase();

	return (
		<div
			id="lang-switcher"
			className="text-slate-500 hover:underline flex flex-row gap-1 text-xs"
		>
			<Link href={`/${nextLocale}${pathWithoutLocale}`}>{displayText}</Link>
		</div>
	);
}
