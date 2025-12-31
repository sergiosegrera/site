"use client";

import { LucideImageOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type Picture = {
  src: string;
  alt: string;
};

export default function PictureStack({ pictures }: { pictures: Picture[] }) {
  const [isSelected, setIsSelected] = useState(false);

  if (pictures.length < 1) {
    return (
      <div className="bg-slate-200 w-[64px] h-[64px] rounded border-2 border-b-8 border-white shadow flex items-center justify-center text-white hover:scale-105 transition-transform duration-300 ease-out cursor-not-allowed">
        <LucideImageOff />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="relative group cursor-pointer overflow-visible h-[64px] w-[64px] transition-opacity duration-500 ease-out"
      style={
        {
          "--rotation-factor": 8,
          opacity: isSelected ? 0 : 1,
        } as React.CSSProperties & {
          "--rotation-factor": number;
        }
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.setProperty("--rotation-factor", "12");
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty("--rotation-factor", "8");
      }}
      onClick={(_) => {
        setIsSelected(!isSelected);
      }}
    >
      {pictures.slice(0, 3).map((picture, i) => (
        <div
          key={picture.src}
          className="absolute transition-transform duration-300 ease-out overflow-hidden border-2 rounded border-white border-b-8 shadow"
          style={{
            top: 0,
            transform: `translateX(calc(var(--rotation-factor, 8) * ${i - 1} * 1px))`,
            zIndex: -i,
            rotate: `calc(var(--rotation-factor, 8) * ${i - 1} * 1deg)`,
            width: 64,
            height: 64,
          }}
        >
          <Image
            src={picture.src}
            alt={picture.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
      {pictures.length > 3 && (
        <div className="absolute rounded-full size-6 bg-blue-400 border-2 border-white text-white bottom-[-8px] right-[-8px] flex justify-center items-center text-xs group-hover:scale-105 transition-transform duration-300 ease-out shadow-sm group-hover:shadow">
          +{pictures.length - 3}
        </div>
      )}
    </button>
  );
}

function PictureStackOverlay() {}
