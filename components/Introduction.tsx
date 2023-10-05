"use client";

import { motion } from "framer-motion";
import LocaleSwitcher from "@/components/LocalSwitcher";

export default function Introduction({
  intro,
  subtitle,
}: {
  intro: string;
  subtitle: string;
}) {
  return (
    <>
      <LocaleSwitcher />
      <motion.h1
        className="text-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {intro}
        <strong>Sergio Segrera</strong>
      </motion.h1>
      <motion.h2
        className="text-xl font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {subtitle}
      </motion.h2>
    </>
  );
}
