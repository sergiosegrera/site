"use client";

import { motion } from "motion/react";

export default function Bio({ dictionary }: { dictionary: any }) {
  return (
    <motion.div
      id="bio"
      className="text-xs text-slate-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {dictionary.description}
    </motion.div>
  );
}
