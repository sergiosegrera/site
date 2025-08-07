"use client";

import { useTranslations } from "next-intl";

export default function Bio() {
  const t = useTranslations("home");

  return (
    <p id="bio" className="text-xs text-slate-500">
      {t("description")}
    </p>
  );
}
