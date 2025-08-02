import "./../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/next";

import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
      <body className={inter.className}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
