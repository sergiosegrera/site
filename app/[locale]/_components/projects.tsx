"use client";

import { LucideExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useScramble } from "use-scramble";
import HoverImage from "@/components/hover-image";
import { projects } from "@/lib/projects";

export default function Projects() {
  const t = useTranslations("home");

  const { ref: headerRef, replay: headerReplay } = useScramble({
    text: t("previousEndeavors"),
    playOnMount: false,
  });

  return (
    <section id="projects" className="flex flex-col gap-4">
      <h2
        className="text-sm font-medium h-4"
        ref={headerRef}
        onMouseEnter={headerReplay}
      >
        {t("previousEndeavors")}
      </h2>
      <ul id="project-list" className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectItem key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  );
}

export const ProjectItem = ({
  project,
}: {
  project: { slug: string; url: string };
}) => {
  const t = useTranslations(`projects.${project.slug}`);

  const { ref: titleRef, replay: titleReplay } = useScramble({
    text: t("title"),
    playOnMount: false,
  });

  return (
    <li id={project.slug}>
      <Link
        href={project.url}
        target="_blank"
        className="grid grid-cols-[48px_1fr] gap-3 items-start group"
      >
        <HoverImage
          blurredImage={`/static/${project.slug}-blur.png`}
          image={`/static/${project.slug}.png`}
          alt={t("title")}
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
      </Link>
    </li>
  );
};
