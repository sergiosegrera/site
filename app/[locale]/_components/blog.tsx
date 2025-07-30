"use client";

import { Link } from "@/i18n/navigation";
import { m } from "motion/react";
import { useScramble } from "use-scramble";
import { useTranslations } from "next-intl";
import { posts } from "../blog/[post]/_posts/data";
import { CalendarIcon } from "lucide-react";

export default function Blog() {
  const { ref: headerRef, replay: headerReplay } = useScramble({
    text: "Blog",
    playOnMount: false,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 3.5,
      },
    },
  };

  return (
    <m.div
      id="blog"
      className="flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 3 }}
    >
      <h2
        className="text-sm font-medium h-4"
        ref={headerRef}
        onMouseEnter={headerReplay}
      >
        Blog
      </h2>
      <m.div
        id="blog-list"
        className="flex flex-col gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {posts
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((post) => {
            return <BlogItem key={post.slug} post={post} />;
          })}
      </m.div>
    </m.div>
  );
}

function BlogItem({ post }: { post: (typeof posts)[number] }) {
  const t = useTranslations(`blog.${post.slug}`);

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const { ref: titleRef, replay: titleReplay } = useScramble({
    text: t("title"),
    playOnMount: false,
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <m.div
        key={post.slug}
        id={post.slug}
        className="flex flex-col gap-0.5"
        variants={item}
      >
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
      </m.div>
    </Link>
  );
}
