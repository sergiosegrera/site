import { LucideMapPin } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/app/[locale]/_components/language-switcher";
import { Link } from "@/i18n/navigation";
import { AUTHOR } from "@/lib/site";
import profile from "@/public/static/profile.webp";

/**
 * `asH1` is for the home page, where the name is the page heading. Every other
 * page has its own h1 (the article title, "Travel Log"), so the name renders as
 * plain text there to keep exactly one h1 per document.
 */
export default async function Header({ asH1 = false }: { asH1?: boolean }) {
  const t = await getTranslations("home");

  // The static import lets Next generate the blur placeholder at build time and
  // inline it, rather than the placeholder costing its own network request.
  const avatar = (
    <Image
      src={profile}
      alt={AUTHOR.name}
      width={64}
      height={64}
      className="rounded-lg shadow-md"
      priority
      placeholder="blur"
    />
  );

  return (
    <nav id="header" className="grid grid-cols-[64px_1fr_auto] gap-4 w-full">
      {asH1 ? avatar : <Link href="/">{avatar}</Link>}
      <div id="info" className="flex flex-col h-full justify-between gap-1">
        {asH1 ? (
          <h1 className="text-base font-medium">{AUTHOR.name}</h1>
        ) : (
          <p className="text-base font-medium">
            <Link href="/">{AUTHOR.name}</Link>
          </p>
        )}
        <p className="text-xs text-slate-500">{t("title")}</p>
        <p className="text-xs text-slate-500 flex flex-row items-center">
          <LucideMapPin
            className="inline-block mr-1 text-slate-400"
            size={12}
          />
          {t("location")}
        </p>
      </div>
      <div id="lang-switcher" className="flex justify-end">
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
