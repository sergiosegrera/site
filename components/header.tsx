"use server";

import { LucideMapPin } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/app/[locale]/_components/language-switcher";
import { Link } from "@/i18n/navigation";

export default async function Header() {
  const t = await getTranslations("home");

  return (
    <nav id="header" className="grid grid-cols-[64px_1fr_auto] gap-4 w-full">
      <Link href="/">
        <Image
          src="/static/profile.webp"
          alt="profile"
          width={64}
          height={64}
          className="rounded-lg shadow-md"
          priority
          placeholder="blur"
          blurDataURL="/static/profile-blur.webp"
        />
      </Link>
      <div id="info" className="flex flex-col h-full justify-between gap-1">
        <h1 className="text-base font-medium">Sergio Segrera</h1>
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
