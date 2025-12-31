"use client";

import { useScramble } from "use-scramble";
import { Link } from "@/i18n/navigation";

export default function TravelLog() {
  const { ref: headerRef, replay: headerReplay } = useScramble({
    text: "Travel Log",
    playOnMount: false,
  });

  return (
    <section id="travel-log">
      <Link href="/travels" className="flex flex-col gap-4">
        <h2
          className="text-sm font-medium h-4 underline"
          ref={headerRef}
          onMouseEnter={headerReplay}
        >
          Travel Log
        </h2>

        <p className="text-xs text-slate-500">
          A digital travel log of notables cities I have visited.
        </p>
      </Link>
    </section>
  );
}
