import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { posts } from "./[locale]/blog/[post]/_posts/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sergiosegrera.com";

  const pages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const blogs: MetadataRoute.Sitemap = posts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  );

  return [
    ...pages,
    ...blogs,
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];
}
