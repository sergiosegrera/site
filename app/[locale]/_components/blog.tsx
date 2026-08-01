"use client";

import { CalendarIcon } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useScramble } from "use-scramble";
import { Link } from "@/i18n/navigation";
import { posts } from "../blog/[post]/_posts/data";

export default function Blog() {
  const t = useTranslations("blog");

  const { ref: headerRef, replay: headerReplay } = useScramble({
    text: t("title"),
    playOnMount: false,
  });

  return (
    <section id="blog" className="flex flex-col gap-4">
      <h2
        className="text-sm font-medium h-4"
        ref={headerRef}
        onMouseEnter={headerReplay}
      >
        {t("title")}
      </h2>
      <ul id="blog-list" className="flex flex-col gap-6">
        {posts
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((post) => {
            return <BlogItem key={post.slug} post={post} />;
          })}
      </ul>
    </section>
  );
}

function BlogItem({ post }: { post: (typeof posts)[number] }) {
  const t = useTranslations(`blog.${post.slug}`);
  const format = useFormatter();

  const { ref: titleRef, replay: titleReplay } = useScramble({
    text: t("title"),
    playOnMount: false,
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <li key={post.slug} id={post.slug} className="flex flex-col gap-0.5">
        <h3
          className="text-xs font-medium"
          ref={titleRef}
          onMouseEnter={titleReplay}
        >
          {t("title")}
        </h3>
        <time
          className="text-xs text-slate-500 flex gap-1 items-center"
          dateTime={post.date}
        >
          <CalendarIcon size={12} />
          {/* `timeZone: "UTC"` matters: "2025-06-28" parses as UTC midnight, so
              formatting it in any negative-offset zone renders the previous day. */}
          {format.dateTime(new Date(post.date), {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </time>
      </li>
    </Link>
  );
}
