import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { loadOgAssets, OG_CONTENT_TYPE, OG_SIZE, OgCard } from "@/lib/og";
import { posts } from "./_posts/data";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, post: post.slug })),
  );
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; post: string }>;
}) {
  const { locale, post } = await params;
  const t = await getTranslations({ locale, namespace: `blog.${post}` });
  const blog = await getTranslations({ locale, namespace: "blog" });
  const { profileSrc, fonts } = await loadOgAssets();

  return new ImageResponse(
    <OgCard
      profileSrc={profileSrc}
      eyebrow={blog("title")}
      title={t("title")}
      subtitle={t("description")}
    />,
    { ...size, fonts },
  );
}
