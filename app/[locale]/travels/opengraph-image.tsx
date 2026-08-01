import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { loadOgAssets, OG_CONTENT_TYPE, OG_SIZE, OgCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "travels" });
  const { profileSrc, fonts } = await loadOgAssets();

  return new ImageResponse(
    <OgCard
      profileSrc={profileSrc}
      title={t("title")}
      subtitle={t("subtitle")}
    />,
    { ...size, fonts },
  );
}
