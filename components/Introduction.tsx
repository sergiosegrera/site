"use client";

import { motion } from "framer-motion";
import LocaleSwitcher from "@/components/LocalSwitcher";
import GitHubButton from "./buttons/GitHubButton";
import LinkedInButton from "./buttons/LinkedInButton";

function Links() {
  return (
    <motion.nav
      className="flex flex-row justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <div className="flex flex-row gap-2">
        <GitHubButton />
        <LinkedInButton />
      </div>
      <LocaleSwitcher />
    </motion.nav>
  );
}

export default function Introduction({
  intro,
  subtitle,
}: {
  intro: string;
  subtitle: string;
}) {
  return (
    <>
      <Links />
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
