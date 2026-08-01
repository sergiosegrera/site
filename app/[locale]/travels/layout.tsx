import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AUTHOR, languageAlternates, SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "travels" });

  const title = t("title");
  const description = t("subtitle");

  return {
    title,
    description,
    authors: [{ name: AUTHOR.name, url: SITE_URL }],
    creator: AUTHOR.name,
    alternates: {
      canonical: `/${locale}/travels`,
      languages: languageAlternates("/travels"),
    },
    openGraph: {
      type: "website",
      url: `/${locale}/travels`,
      title,
      description,
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
