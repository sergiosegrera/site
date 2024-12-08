"use client";

import { m } from "motion/react";

export default function Bio({ dictionary }: { dictionary: any }) {
  return (
    <m.div
      id="bio"
      className="text-xs text-slate-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {dictionary.description}
    </m.div>
  );
}
