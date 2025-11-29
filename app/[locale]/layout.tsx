import "./../globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/next";

import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");

  return {
    title: t("siteName"),
    description: t("siteDescription"),
    authors: [{ name: "Sergio Segrera" }],
    creator: "Sergio Segrera",
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

  return (
    <html lang={locale}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Sergio Segrera" />
      </head>
      <Analytics />
      <body className={averia.className}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
