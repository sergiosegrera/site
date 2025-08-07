"use client";

import { Link } from "@/i18n/navigation";
import { useScramble } from "use-scramble";
import { useTranslations } from "next-intl";
import { posts } from "../blog/[post]/_posts/data";
import { CalendarIcon } from "lucide-react";

export default function Blog() {
  const { ref: headerRef, replay: headerReplay } = useScramble({
    text: "Blog",
    playOnMount: false,
  });

  return (
    <section id="blog" className="flex flex-col gap-4">
      <h2
        className="text-sm font-medium h-4"
        ref={headerRef}
        onMouseEnter={headerReplay}
      >
        Blog
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
          className="text-xs text-slate-500 flex gap-1"
          dateTime={post.date}
        >
          <CalendarIcon size={12} />
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </li>
    </Link>
  );
}
