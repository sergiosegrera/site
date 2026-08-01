import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/header";
import { AUTHOR, jsonLd, SITE_URL } from "@/lib/site";
import Bio from "./_components/bio";
import Blog from "./_components/blog";
import Contact from "./_components/contact";
import Projects from "./_components/projects";
import TravelLog from "./_components/travel-log";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/static/profile.webp`,
    jobTitle: t("title"),
    description: t("siteDescription"),
    email: `mailto:${AUTHOR.email}`,
    sameAs: [AUTHOR.github, AUTHOR.linkedin],
  };

  return (
    <main className="md:w-[600px] mx-auto my-8 md:my-16 px-4 flex flex-col gap-12">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be raw; escaped by `jsonLd`
        dangerouslySetInnerHTML={{ __html: jsonLd(person) }}
      />

      {/* Header */}
      <Header asH1 />

      {/* Bio */}
      <Bio />

      {/* Projects */}
      <Projects />

      {/* Blog */}
      <Blog />

      {/* Travel Log */}
      <TravelLog />

      {/* Contact */}
      <Contact />
    </main>
  );
}
