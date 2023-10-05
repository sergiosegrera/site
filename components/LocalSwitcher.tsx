"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "../i18n-config";
import GlobeIcon from "./icons/GlobeIcon";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LocaleSwitcher() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <motion.button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="relative self-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      aria-label="Change language"
    >
      <GlobeIcon />
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            className="absolute top-10 right-0 flex flex-col gap-2 p-2 bg-foreground rounded-md shadow-md z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="locale-switcher"
          >
            {i18n.locales.map((locale) => {
              return (
                <li key={locale} className="p-3">
                  <Link
                    href={redirectedPathName(locale)}
                    className="text-background"
                  >
                    {locale}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
