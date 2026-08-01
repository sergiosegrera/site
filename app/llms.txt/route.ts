import { posts } from "@/app/[locale]/blog/[post]/_posts/data";
import en from "@/dictionaries/en.json";
import { routing } from "@/i18n/routing";
import { projects } from "@/lib/projects";
import { AUTHOR, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

/**
 * Generated rather than hand-written so it can't drift from the dictionaries and
 * post data the site itself renders.
 */
export function GET() {
  const locale = routing.defaultLocale;

  const sections = [
    `# ${AUTHOR.name} – Portfolio`,
    [
      "## Overview",
      `- **Name:** ${AUTHOR.name}`,
      `- **Role:** ${en.home.title}`,
      `- **Location:** ${en.home.location}`,
      `- **Email:** ${AUTHOR.email}`,
      `- **LinkedIn:** ${AUTHOR.linkedin}`,
      `- **GitHub:** ${AUTHOR.github}`,
      `- **Book a call:** ${AUTHOR.calendar}`,
    ].join("\n"),
    ["### About Me", en.home.description].join("\n"),
    [
      `## ${en.home.previousEndeavors}`,
      ...projects.map((project) => {
        const meta = en.projects[project.slug as keyof typeof en.projects];
        return [
          `### ${meta.title}`,
          `- **Link:** ${project.url}`,
          `- **Description:** ${meta.description}`,
        ].join("\n");
      }),
    ].join("\n\n"),
    [
      `## ${en.blog.title}`,
      ...[...posts]
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((post) => {
          const meta = en.blog[post.slug as keyof typeof en.blog] as {
            title: string;
            description: string;
          };
          return [
            `### [${meta.title}](${SITE_URL}/${locale}/blog/${post.slug})`,
            `- **Date:** ${formatDate(post.date)}`,
            `- **Summary:** ${meta.description}`,
          ].join("\n");
        }),
    ].join("\n\n"),
    [
      `## ${en.travels.title}`,
      `${en.travels.subtitle}`,
      `- **Link:** ${SITE_URL}/${locale}/travels`,
    ].join("\n"),
    [
      `## ${en.home.contact}`,
      `- **Email:** ${AUTHOR.email}`,
      `- **LinkedIn:** ${AUTHOR.linkedin}`,
      `- **GitHub:** ${AUTHOR.github}`,
      `- **Book a call:** ${AUTHOR.calendar}`,
    ].join("\n"),
  ];

  return new Response(`${sections.join("\n\n---\n\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
