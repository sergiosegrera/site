import fs from "node:fs/promises";
import path from "node:path";
import { AUTHOR, SITE_URL } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Fonts and the avatar have to be passed to Satori as buffers/data URLs — it has
 * no filesystem or network access of its own.
 */
export async function loadOgAssets() {
  const asset = (file: string) =>
    fs.readFile(path.join(process.cwd(), "public/static", file));
  const font = (file: string) =>
    fs.readFile(path.join(process.cwd(), "app/fonts", file));

  const [profile, regular, bold] = await Promise.all([
    // JPEG rather than the site's webp: Satori has no reliable webp decoder.
    asset("profile-og.jpg"),
    font("Averia-Regular.ttf"),
    font("Averia-Bold.ttf"),
  ]);

  return {
    profileSrc: `data:image/jpeg;base64,${profile.toString("base64")}`,
    fonts: [
      {
        name: "Averia",
        data: regular,
        weight: 400 as const,
        style: "normal" as const,
      },
      {
        name: "Averia",
        data: bold,
        weight: 700 as const,
        style: "normal" as const,
      },
    ],
  };
}

export function OgCard({
  profileSrc,
  eyebrow,
  title,
  subtitle,
  // The home card's title is already the author's name; repeating it in the
  // byline just prints it twice.
  showAuthor = true,
}: {
  profileSrc: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  showAuthor?: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        padding: 80,
        fontFamily: "Averia",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {eyebrow ? (
          <div style={{ fontSize: 28, color: "#94a3b8" }}>{eyebrow}</div>
        ) : null}
        <div
          style={{
            fontSize: title.length > 48 ? 60 : 72,
            fontWeight: 700,
            color: "#0f172a",
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontSize: 30, color: "#64748b", lineHeight: 1.4 }}>
            {subtitle.length > 120 ? `${subtitle.slice(0, 117)}…` : subtitle}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* biome-ignore lint/performance/noImgElement: Satori only renders raw img */}
        <img
          src={profileSrc}
          alt=""
          width={88}
          height={88}
          style={{ borderRadius: 16 }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {showAuthor ? (
            <div style={{ fontSize: 32, fontWeight: 700, color: "#0f172a" }}>
              {AUTHOR.name}
            </div>
          ) : null}
          <div
            style={{
              fontSize: showAuthor ? 26 : 32,
              color: showAuthor ? "#94a3b8" : "#64748b",
            }}
          >
            {SITE_URL.replace("https://", "")}
          </div>
        </div>
      </div>
    </div>
  );
}
