"use client";

import { useTranslations } from "next-intl";
import { m } from "motion/react";

export default function Bio() {
  const t = useTranslations("home");

  return (
    <m.p
      id="bio"
      className="text-xs text-slate-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {t("description")}
    </m.p>
  );
}
