import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    astroI18next(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});