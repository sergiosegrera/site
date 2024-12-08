"use client";

import Image from "next/image";
import Link from "next/link";
import { LucideExternalLink } from "lucide-react";
import { m } from "motion/react";
import { useScramble } from "use-scramble";

export default function Projects({ dictionary }: { dictionary: any }) {
  const { ref: headerRef, replay: headerReplay } = useScramble({
    text: dictionary.previousEndeavors,
    playOnMount: false,
  });

  const { ref: ascendoRef, replay: ascendoReplay } = useScramble({
    text: "Ascendo Studio",
    playOnMount: false,
  });

  const { ref: mesmaxillosRef, replay: mesmaxillosReplay } = useScramble({
    text: "MesMaxillos",
    playOnMount: false,
  });

  const { ref: leasiteRef, replay: leasiteReplay } = useScramble({
    text: "leadsr.ca",
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

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
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
      />
      <m.div
        id="project-list"
        className="flex flex-col gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div
          id="ascendo-studio"
          className="grid grid-cols-[48px_1fr] gap-3 items-start"
          variants={item}
        >
          <Image
            src="/static/ascendo-studio.png"
            alt="ascendo studio"
            width={48}
            height={48}
            className="rounded-lg shadow-sm"
          />
          <div className="flex flex-col gap-0.5">
            <h3
              className="text-xs font-medium"
              ref={ascendoRef}
              onMouseEnter={ascendoReplay}
            >
              Ascendo Studio
            </h3>
            <p className="text-xs text-slate-500">{dictionary.ascendoStudio}</p>
          </div>
        </m.div>
        <m.div
          id="mesmaxillos"
          className="grid grid-cols-[48px_1fr] gap-3 items-start"
          variants={item}
        >
          <Image
            src="/static/mesmaxillos.png"
            alt="mesmaxillos"
            width={48}
            height={48}
            className="rounded-lg shadow-sm"
          />
          <div className="flex flex-col gap-0.5">
            <Link
              href="https://mesmaxillos.com"
              className="hover:underline flex flex-row items-center gap-1"
            >
              <h3
                className="text-xs font-medium"
                ref={mesmaxillosRef}
                onMouseEnter={mesmaxillosReplay}
              >
                MesMaxillos
              </h3>
              <LucideExternalLink size={12} />
            </Link>
            <p className="text-xs text-slate-500">{dictionary.mesmaxillos}</p>
          </div>
        </m.div>
        <m.div
          id="leadsr"
          className="grid grid-cols-[48px_1fr] gap-3 items-start"
          variants={item}
        >
          <Image
            src="/static/leasite.png"
            alt="leadsr"
            width={48}
            height={48}
            className="rounded-lg shadow-sm"
          />
          <div className="flex flex-col gap-0.5">
            <Link
              href="https://leadsr.ca"
              className="hover:underline flex flex-row items-center gap-1"
            >
              <h3
                className="text-xs font-medium"
                ref={leasiteRef}
                onMouseEnter={leasiteReplay}
              >
                leadsr.ca
              </h3>
              <LucideExternalLink size={12} />
            </Link>
            <p className="text-xs text-slate-500">{dictionary.leasite}</p>
          </div>
        </m.div>
      </m.div>
    </m.div>
  );
}
