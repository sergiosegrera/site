import Link from "next/link";
import { Locale } from "@/i18n-config";

export default function LanguageSwitcher({
  currentLang,
}: {
  currentLang: Locale;
}) {
  const alternateLanguage = currentLang === "en" ? "fr" : "en";
  const displayText = alternateLanguage.toUpperCase();

  return (
    <div
      id="lang-switcher"
      className="flex flex-row gap-1 text-xs text-slate-500 hover:underline"
    >
      <Link href={`/${alternateLanguage}`}>{displayText}</Link>
    </div>
  );
}
