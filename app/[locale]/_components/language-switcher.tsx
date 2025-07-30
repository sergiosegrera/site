"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const currentPath = usePathname();

  // Remove the locale from the pathname
  const pathWithoutLocale = currentPath.replace(`/${locale}`, "");

  const displayText = locale.toUpperCase();

  return (
    <div
      id="lang-switcher"
      className="flex flex-row gap-1 text-xs text-slate-500 hover:underline"
    >
      <Link href={`/${locale === "en" ? "fr" : "en"}${pathWithoutLocale}`}>
        {displayText}
      </Link>
    </div>
  );
}
