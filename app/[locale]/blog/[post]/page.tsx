import { routing } from "@/i18n/routing";
import MdxLayout from "@/components/mdx-layout";
import { notFound } from "next/navigation";
import Image from "next/image";
import { LucideMapPin } from "lucide-react";
import LanguageSwitcher from "../../_components/language-switcher";
import { Link } from "@/i18n/navigation";
import Contact from "../../_components/contact";
import { getTranslations } from "next-intl/server";
import { posts } from "./_posts/data";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, post: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; post: string }>;
}) {
  const { post } = await params;

  const t = await getTranslations(`blog.${post}`);

  return {
    title: `${t("title")}`,
    description: `${t("description")}`,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string; post: string }>;
}) {
  const { locale, post } = await params;

  const t = await getTranslations("home");

  try {
    const Content = (await import(`./_posts/${post}/${locale}.mdx`)).default;
    return (
      <main className="md:w-[600px] mx-auto my-8 md:my-16 px-4 flex flex-col gap-12">
        <nav
          id="header"
          className="grid grid-cols-[64px_1fr_auto] gap-4 w-full"
        >
          <Link href="/">
            <Image
              src="/static/profile.webp"
              alt="profile"
              width={64}
              height={64}
              className="rounded-lg shadow-md"
              priority
              placeholder="blur"
              blurDataURL="/static/profile-blur.webp"
            />
          </Link>
          <div id="info" className="flex flex-col h-full justify-between gap-1">
            <h1 className="text-base font-medium">
              <Link href="/">Sergio Segrera</Link>
            </h1>
            <p className="text-xs text-slate-500">{t("title")}</p>
            <p className="text-xs text-slate-500 flex flex-row items-center">
              <LucideMapPin
                className="inline-block mr-1 text-slate-400"
                size={12}
              />
              {t("location")}
            </p>
          </div>
          <div id="lang-switcher" className="flex justify-end">
            <LanguageSwitcher />
          </div>
        </nav>
        <MdxLayout>
          <Content />
        </MdxLayout>

        <Contact animate={false} />
      </main>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
