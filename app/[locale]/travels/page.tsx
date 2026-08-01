import fs from "node:fs";
import path from "node:path";
import { LucideMapPin } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/header";
import PictureStack, {
  type Picture,
  PictureStackClickArea,
  PictureStackProvider,
} from "@/components/picture-stack";
import Contact from "../_components/contact";
import TRAVEL_DATA from "./data";

/**
 * Blur placeholders are inlined as base64, so every one costs document bytes for
 * every visitor. Only the pictures visible in the collapsed stack get one; the
 * rest are behind a click and can load without a placeholder.
 */
const BLURRED_PICTURES = 3;

function readBlurDataURL(year: string, code: string, index: number) {
  const file = path.join(
    process.cwd(),
    "public",
    "static",
    "travels",
    year,
    `${code}-${index}-blur.jpeg`,
  );

  if (!fs.existsSync(file)) return undefined;

  return `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}`;
}

export default async function TravelsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("travels");

  return (
    <PictureStackProvider>
      <main className="md:w-[600px] mx-auto my-8 md:my-16 px-4 flex flex-col gap-12">
        <Header />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-medium">{t("title")}</h1>
            <p className="text-xs text-slate-500">{t("subtitle")}</p>
          </div>
          {(
            Object.keys(TRAVEL_DATA) as unknown as Array<
              keyof typeof TRAVEL_DATA
            >
          )
            .reverse()
            .map((year) => {
              return (
                <div key={year} className="flex flex-col gap-4 mb-4">
                  <h2>{year}</h2>
                  {TRAVEL_DATA[year].map(
                    (place: { code: string; picture_count: number }) => {
                      const key = `${year}.${place.code}`;
                      const name = t.has(`${key}.name`)
                        ? t(`${key}.name`)
                        : null;
                      const description = t.has(`${key}.d`)
                        ? t(`${key}.d`)
                        : null;

                      const pictures = Array.from(
                        { length: place.picture_count },
                        (_, i): Picture => ({
                          src: `/static/travels/${year}/${place.code}-${i + 1}.jpeg`,
                          alt: name
                            ? `${name} — photo ${i + 1}`
                            : `Travel photo ${i + 1}`,
                          blurDataURL:
                            i < BLURRED_PICTURES
                              ? readBlurDataURL(String(year), place.code, i + 1)
                              : undefined,
                        }),
                      );

                      return (
                        <Place
                          name={name}
                          pictures={pictures}
                          code={place.code}
                          key={key}
                        >
                          {description}
                        </Place>
                      );
                    },
                  )}
                </div>
              );
            })}
        </div>
        <Contact />
      </main>
    </PictureStackProvider>
  );
}

function Place({
  name,
  code,
  children,
  pictures,
}: {
  name: string | null;
  code: string | null;
  children: React.ReactNode;
  pictures: Picture[];
}) {
  return (
    <PictureStackClickArea pictures={pictures}>
      <PictureStack pictures={pictures} />
      <div className="flex-col flex gap-1 mt-1">
        <div className="flex items-center">
          <LucideMapPin size={16} className="text-slate-500" />
          {code && (
            // Decorative: the place name sits right next to it, so an alt would
            // just be read out twice.
            <Image
              src={`/static/flags/${code}.png`}
              alt=""
              width={16}
              height={16}
              unoptimized
              className="rounded border border-slate-500"
            />
          )}
          <h3 className="text-sm ml-2">{name ?? "?"}</h3>
        </div>
        <p className="text-slate-500 text-xs">{children}</p>
      </div>
    </PictureStackClickArea>
  );
}
