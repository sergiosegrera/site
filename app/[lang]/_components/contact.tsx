"use client";

import { LucideGithub, LucideLinkedin, LucideMail } from "lucide-react";
import { useScramble } from "use-scramble";
import { m } from "motion/react";

export default function Contact({ dictionary }: { dictionary: any }) {
  const { ref, replay } = useScramble({
    text: dictionary.contact,
    playOnMount: false,
  });

  return (
    <m.div
      id="contact"
      className="flex flex-col gap-4 text-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 3 }}
    >
      <h2 className="text-sm font-medium h-4" ref={ref} onMouseEnter={replay} />
      <m.div
        id="contact-list"
        className="flex flex-col gap-2 text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3.5 }}
      >
        <div id="email" className="flex flex-row gap-1 items-center group">
          <LucideMail className="inline-block mr-1 text-slate-400" size={12} />
          <a
            href="mailto:me@sergiosegrera.com"
            className="group-hover:underline"
          >
            me@sergiosegrera.com
          </a>
        </div>
        <div id="linkedin" className="flex flex-row gap-1 items-center group">
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
        </div>
        <div id="github" className="flex flex-row gap-1 items-center group">
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
        </div>
      </m.div>
    </m.div>
  );
}
