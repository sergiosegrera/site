import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("travels");

  return {
    title: t("title"),
    description: t("subtitle"),
    authors: [{ name: "Sergio Segrera" }],
    creator: "Sergio Segrera",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
