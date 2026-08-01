import { locales, routing } from "@/i18n/routing";

export const SITE_URL = "https://sergiosegrera.com";

export const AUTHOR = {
  name: "Sergio Segrera",
  email: "me@sergiosegrera.com",
  github: "https://github.com/sergiosegrera",
  linkedin: "https://www.linkedin.com/in/ssegrera/",
  calendar: "https://cal.com/sergiosegrera/30min",
} as const;

/**
 * hreflang map for a locale-agnostic path (`""`, `"/travels"`, `"/blog/slug"`).
 * Relative values resolve against `metadataBase`, so this is only for `Metadata`.
 */
export function languageAlternates(path = ""): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, `/${locale}${path}`]),
    ),
    "x-default": `/${routing.defaultLocale}${path}`,
  };
}

/** Same map, but absolute — sitemap entries can't use relative URLs. */
export function absoluteLanguageAlternates(path = ""): Record<string, string> {
  return Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([key, value]) => [
      key,
      `${SITE_URL}${value}`,
    ]),
  );
}

/**
 * Serializes JSON-LD for embedding in a `<script>` tag. Escaping `<` prevents a
 * `</script>` sequence in any string field from breaking out of the tag.
 */
export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
