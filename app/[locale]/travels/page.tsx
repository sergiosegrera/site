import { LucideMapPin } from "lucide-react";
import Image from "next/image";
import Header from "@/components/header";
import PictureStack, { type Picture } from "@/components/picture-stack";
import Contact from "../_components/contact";
import TRAVEL_DATA from "./data";

type TravelPlace = {
  code: string | null;
  name: string;
  pictures: Picture[];
};

export default async function TravelsPage() {
  return (
    <main className="md:w-[600px] mx-auto my-8 md:my-16 px-4 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-4">
        {Object.keys(TRAVEL_DATA)
          .reverse()
          .map((year) => {
            return (
              <div key={year} className="flex flex-col gap-4 mb-4">
                <h2>{year}</h2>
                {TRAVEL_DATA[year].map(
                  (place: {
                    code: string;
                    picture_count: number;
                    name: string;
                  }) => {
                    return (
                      <Place
                        name={place.name}
                        pictures={[...Array(place.picture_count).keys()].map(
                          (i) => {
                            return {
                              src: `/static/travels/${year}/${place.code}-${i + 1}.jpeg`,
                              alt: `${place.code}-${i + 1}`,
                            };
                          },
                        )}
                        code={place.code}
                        key={place.name}
                      >
                        it was a nice place
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
  );
}

function Place({
  name,
  code,
  children,
  pictures,
}: {
  name: string;
  code: string | null;
  children: React.ReactNode;
  pictures: Picture[];
}) {
  return (
    <div className="flex gap-8">
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
            />
          )}
          <h3 className="text-sm ml-2">{name}</h3>
        </div>
        <p className="text-slate-500 text-xs">{children}</p>
      </div>
    </div>
  );
}
