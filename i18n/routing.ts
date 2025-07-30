import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr"];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "en",
});
