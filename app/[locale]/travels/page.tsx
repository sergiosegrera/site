import fs from "node:fs";
import path from "node:path";
import { LucideMapPin } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import PictureStack, {
  type Picture,
  PictureStackClickArea,
  PictureStackProvider,
} from "@/components/picture-stack";
import Contact from "../_components/contact";
import TRAVEL_DATA from "./data";

export default async function TravelsPage() {
  const t = await getTranslations("travels");

  return (
    <PictureStackProvider>
      <main className="md:w-[600px] mx-auto my-8 md:my-16 px-4 flex flex-col gap-12">
        <Header />
        <div className="flex flex-col gap-4">
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

                      return (
                        <Place
                          name={name}
                          pictures={Array.from(
                            { length: place.picture_count },
                            (_, i) => {
                              const src = `/static/travels/${year}/${place.code}-${i + 1}.jpeg`;
                              const blurRelativePath = `static/travels/${year}/${place.code}-${i + 1}-blur.jpeg`;
                              const blurAbsolutePath = path.join(
                                process.cwd(),
                                "public",
                                blurRelativePath,
                              );
                              let blurDataURL: string | undefined;

                              if (fs.existsSync(blurAbsolutePath)) {
                                const buffer =
                                  fs.readFileSync(blurAbsolutePath);
                                blurDataURL = `data:image/jpeg;base64,${buffer.toString(
                                  "base64",
                                )}`;
                              }

                              return {
                                src,
                                alt: `${place.code}-${i + 1}`,
                                blurDataURL,
                              };
                            },
                          )}
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
            <Image
              src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icons/7.5.0/flags/1x1/${code}.svg`}
              alt={`${code}=flag`}
              width={16}
              height={16}
              unoptimized
              className="rounded border border-slate-500"
              priority
            />
          )}
          <h3 className="text-sm ml-2">{name ?? "?"}</h3>
        </div>
        <p className="text-slate-500 text-xs">{children}</p>
      </div>
    </PictureStackClickArea>
  );
}
