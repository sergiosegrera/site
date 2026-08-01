import type { MetadataRoute } from "next";
import { AUTHOR } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const icon = (size: number) => ({
    src: `/web-app-manifest-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: "image/png",
  });

  return {
    id: "/",
    name: AUTHOR.name,
    short_name: AUTHOR.name,
    start_url: "/",
    scope: "/",
    // Both purposes are declared: `maskable` alone leaves platforms that want a
    // plain icon to crop the padded artwork.
    icons: [
      { ...icon(192), purpose: "any" },
      { ...icon(512), purpose: "any" },
      { ...icon(192), purpose: "maskable" },
      { ...icon(512), purpose: "maskable" },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
