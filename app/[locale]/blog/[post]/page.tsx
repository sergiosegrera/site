import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/header";
import MdxLayout from "@/components/mdx-layout";
import { routing } from "@/i18n/routing";
import { AUTHOR, jsonLd, languageAlternates, SITE_URL } from "@/lib/site";
import Contact from "../../_components/contact";
import { posts } from "./_posts/data";

// Every post is known at build time, so anything else is a 404 rather than an
// on-demand render attempt.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, post: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; post: string }>;
}): Promise<Metadata> {
  const { locale, post } = await params;

  const t = await getTranslations({ locale, namespace: `blog.${post}` });
  const meta = posts.find((p) => p.slug === post);

  const title = t("title");
  const description = t("description");
  const path = `/blog/${post}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "article",
      url: `/${locale}${path}`,
      title,
      description,
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
      publishedTime: meta?.date,
      authors: [AUTHOR.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string; post: string }>;
}) {
  const { locale, post } = await params;
  setRequestLocale(locale);

  const meta = posts.find((p) => p.slug === post);
  if (!meta) {
    notFound();
  }

  const t = await getTranslations(`blog.${post}`);

  let Content: React.ComponentType;
  try {
    Content = (await import(`./_posts/${post}/${locale}.mdx`)).default;
  } catch (error) {
    console.error(
      `Missing MDX for post "${post}" in locale "${locale}"`,
      error,
    );
    notFound();
  }

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: t("title"),
    description: t("description"),
    datePublished: meta.date,
    dateModified: meta.date,
    inLanguage: locale,
    author: { "@type": "Person", name: AUTHOR.name, url: SITE_URL },
    publisher: { "@type": "Person", name: AUTHOR.name, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/${locale}/blog/${post}`,
  };

  return (
    <main className="md:w-[600px] mx-auto my-8 md:my-16 px-4 flex flex-col gap-12">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be raw; escaped by `jsonLd`
        dangerouslySetInnerHTML={{ __html: jsonLd(article) }}
      />

      <Header />

      <MdxLayout>
        <Content />
      </MdxLayout>

      <Contact />
    </main>
  );
}
