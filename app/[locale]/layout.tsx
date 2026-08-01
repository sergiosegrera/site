import "./../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { AUTHOR, languageAlternates, SITE_URL } from "@/lib/site";

const averia = localFont({
  src: [
    {
      path: "../fonts/Averia-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Averia-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Averia-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Averia-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/Averia-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Averia-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-averia",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Passing `locale` explicitly keeps metadata statically renderable — without
  // it `next-intl` falls back to reading headers, which opts the route out.
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("siteName"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("siteDescription"),
    authors: [{ name: AUTHOR.name, url: SITE_URL }],
    creator: AUTHOR.name,
    appleWebApp: { title: AUTHOR.name },
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: t("siteName"),
      title: t("siteName"),
      description: t("siteDescription"),
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteName"),
      description: t("siteDescription"),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={averia.className}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
