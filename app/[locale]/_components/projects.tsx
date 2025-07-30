"use client";

import { m } from "motion/react";
import { useScramble } from "use-scramble";
import { useTranslations } from "next-intl";
import HoverImage from "@/components/hover-image";
import Link from "next/link";
import { LucideExternalLink } from "lucide-react";

const projects = [
  {
    slug: "spendo-budget",
    url: "https://spendobudget.com",
  },
  {
    slug: "claycon",
    url: "https://claycon.app",
  },
  {
    slug: "mesmaxillos",
    url: "https://mesmaxillos.com",
  },
];

export default function Projects() {
  const t = useTranslations("home");

  const { ref: headerRef, replay: headerReplay } = useScramble({
    text: t("previousEndeavors"),
    playOnMount: false,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 1.5,
      },
    },
  };

  return (
    <m.div
      id="projects"
      className="flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <h2
        className="text-sm font-medium h-4"
        ref={headerRef}
        onMouseEnter={headerReplay}
      >
        {t("previousEndeavors")}
      </h2>
      <m.div
        id="project-list"
        className="flex flex-col gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project) => (
          <ProjectItem key={project.slug} project={project} />
        ))}
      </m.div>
    </m.div>
  );
}

export const ProjectItem = ({
  project,
}: {
  project: { slug: string; url: string };
}) => {
  const t = useTranslations(`projects.${project.slug}`);

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const { ref: titleRef, replay: titleReplay } = useScramble({
    text: t("title"),
    playOnMount: false,
  });

  return (
    <Link href={project.url} target="_blank">
      <m.div
        id={project.slug}
        className="grid grid-cols-[48px_1fr] gap-3 items-start group"
        variants={item}
      >
        <HoverImage
          blurredImage={`/static/${project.slug}-blur.png`}
          image={`/static/${project.slug}.png`}
          alt={project.slug}
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <h3
              className="text-xs font-medium"
              ref={titleRef}
              onMouseEnter={titleReplay}
            >
              {t("title")}
            </h3>
            <LucideExternalLink size={12} />
          </div>
          <p className="text-xs text-slate-500">{t("description")}</p>
        </div>
      </m.div>
    </Link>
  );
};
