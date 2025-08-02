"use client";

import {
  CalendarCheck2Icon,
  LucideGithub,
  LucideLinkedin,
  LucideMail,
} from "lucide-react";
import { useScramble } from "use-scramble";
import { m } from "motion/react";
import { useTranslations } from "next-intl";
import QuoteStickyNote from "@/components/quote-sticky-note";

export default function Contact({ animate = true }: { animate?: boolean }) {
  const t = useTranslations("home");

  const { ref, replay } = useScramble({
    text: t("contact"),
    playOnMount: false,
  });

  return (
    <m.footer
      id="contact"
      className="flex flex-row gap-4 text-xs relative"
      initial={animate ? { opacity: 0 } : undefined}
      animate={animate ? { opacity: 1 } : undefined}
      transition={animate ? { duration: 0.5, delay: 4.5 } : undefined}
    >
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-sm font-medium h-4" ref={ref} onMouseEnter={replay}>
          {t("contact")}
        </h2>
        <m.ul
          id="contact-list"
          className="flex flex-col gap-2 text-slate-500"
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={animate ? { duration: 0.5, delay: 5 } : undefined}
        >
          <li id="email" className="flex flex-row gap-1 items-center group">
            <LucideMail
              className="inline-block mr-1 text-slate-400"
              size={12}
            />
            <a
              href="mailto:me@sergiosegrera.com"
              className="group-hover:underline"
            >
              me@sergiosegrera.com
            </a>
          </li>
          <li id="linkedin" className="flex flex-row gap-1 items-center group">
            <LucideLinkedin
              className="inline-block mr-1 text-slate-400"
              size={12}
            />
            <a
              href="https://www.linkedin.com/in/ssegrera/"
              className="group-hover:underline"
            >
              Sergio Segrera
            </a>
          </li>
          <li id="github" className="flex flex-row gap-1 items-center group">
            <LucideGithub
              className="inline-block mr-1 text-slate-400"
              size={12}
            />
            <a
              href="https://github.com/sergiosegrera"
              className="group-hover:underline"
            >
              sergiosegrera
            </a>
          </li>
          <li
            id="book-a-call"
            className="flex flex-row gap-1 items-center group"
          >
            <CalendarCheck2Icon
              className="inline-block mr-1 text-slate-400"
              size={12}
            />
            <a
              href="https://cal.com/sergiosegrera/30min"
              className="group-hover:underline"
            >
              {t("bookACall")}
            </a>
          </li>
        </m.ul>
      </div>
      <QuoteStickyNote />
    </m.footer>
  );
}
