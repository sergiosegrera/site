import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteLanguageAlternates, SITE_URL } from "@/lib/site";
import { posts } from "./[locale]/blog/[post]/_posts/data";

/**
 * One entry per page rather than one per locale: the translations are declared
 * via `alternates.languages` so crawlers treat them as a single page in four
 * languages instead of four unrelated pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const canonical = (path: string) =>
    `${SITE_URL}/${routing.defaultLocale}${path}`;

  const newestPost = posts.reduce((newest, post) =>
    post.date > newest.date ? post : newest,
  );

  return [
    {
      url: canonical(""),
      lastModified: new Date(newestPost.date),
      alternates: { languages: absoluteLanguageAlternates("") },
    },
    {
      url: canonical("/travels"),
      alternates: { languages: absoluteLanguageAlternates("/travels") },
    },
    ...posts.map((post) => ({
      url: canonical(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      alternates: {
        languages: absoluteLanguageAlternates(`/blog/${post.slug}`),
      },
    })),
  ];
}
