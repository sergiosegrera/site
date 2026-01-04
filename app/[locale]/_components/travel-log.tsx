"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useScramble } from "use-scramble";
import { Link } from "@/i18n/navigation";

export default function TravelLog() {
  const t = useTranslations("travels");

  const { ref: headerRef, replay: headerReplay } = useScramble({
    text: t("title"),
    playOnMount: false,
  });

  return (
    <section id="travel-log">
      <Link href="/travels" className="flex gap-3">
        <Image
          src="/static/earth.gif"
          width={64}
          height={64}
          alt="Rotating Earth"
          className="object-fit"
          unoptimized
        />
        <div className="flex-col flex gap-1">
          <h2
            className="text-sm font-medium h-4"
            ref={headerRef}
            onMouseEnter={headerReplay}
          >
            {t("title")}
          </h2>

          <p className="text-xs text-slate-500">{t("subtitle")}</p>
        </div>
      </Link>
    </section>
  );
}
