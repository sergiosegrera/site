"use client";

import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideImageOff,
  LucideX,
} from "lucide-react";
import Image from "next/image";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Picture = {
  src: string;
  alt: string;
};

type PictureStackContextType = {
  openOverlay: (pictures: Picture[]) => void;
  closeOverlay: () => void;
};

const PictureStackContext = createContext<PictureStackContextType | null>(null);

export function usePictureStack() {
  const context = useContext(PictureStackContext);
  if (!context) {
    throw new Error("usePictureStack must be used within PictureStackProvider");
  }
  return context;
}

export default function PictureStack({ pictures }: { pictures: Picture[] }) {
  const { openOverlay } = usePictureStack();
  //   const [isAnimating, setIsAnimating] = useState(false);

  if (pictures.length < 1) {
    return (
      <div className="bg-slate-200 w-[64px] h-[64px] rounded border-2 border-b-8 border-white shadow flex items-center justify-center text-white hover:scale-105 transition-transform duration-300 ease-out cursor-not-allowed">
        <LucideImageOff />
      </div>
    );
  }

  const handleClick = () => {
    // setIsAnimating(true);
    openOverlay(pictures);
    //   setIsAnimating(false);
  };

  return (
    <button
      type="button"
      className="relative group cursor-pointer overflow-visible h-[64px] w-[64px] transition-opacity duration-300 ease-out"
      style={
        {
          "--rotation-factor": 8,
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
      onClick={handleClick}
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
        <div className="absolute rounded-full size-6 bg-blue-400 border-2 border-white text-white bottom-[-8px] right-[-8px] flex justify-center items-center text-xs group-hover:scale-105 transition-all duration-300 ease-out shadow-sm group-hover:shadow md:opacity-0 group-hover:opacity-100">
          +{pictures.length - 3}
        </div>
      )}
    </button>
  );
}

export function PictureStackProvider({ children }: { children: ReactNode }) {
  const [pictures, setPictures] = useState<Picture[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openOverlay = useCallback((newPictures: Picture[]) => {
    setPictures(newPictures);
    setCurrentIndex(0);
    setIsOpen(true);
  }, []);

  const closeOverlay = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setPictures(null);
      setCurrentIndex(0);
    }, 300);
  }, []);

  const goToNext = useCallback(() => {
    if (pictures) {
      setCurrentIndex((prev) => (prev + 1) % pictures.length);
    }
  }, [pictures]);

  const goToPrevious = useCallback(() => {
    if (pictures) {
      setCurrentIndex((prev) => (prev - 1 + pictures.length) % pictures.length);
    }
  }, [pictures]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          closeOverlay();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOverlay, goToNext, goToPrevious]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <PictureStackContext.Provider value={{ openOverlay, closeOverlay }}>
      {children}
      {pictures && (
        <div
          className={`fixed inset-0 z-50 bg-black/95 transition-opacity duration-300 h-screen supports-[height:100dvh]:h-dvh ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            touchAction: "none",
            overscrollBehavior: "none",
          }}
          onClick={closeOverlay}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              closeOverlay();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <button
            type="button"
            onClick={closeOverlay}
            className="absolute top-4 right-4 z-10 text-white hover:text-slate-300 transition-colors p-2 hover:bg-white/10 rounded-full"
            aria-label="Close overlay"
          >
            <LucideX size={32} />
          </button>

          <div className="w-full h-full flex items-center justify-center p-4">
            <div
              className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="presentation"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={pictures[currentIndex].src}
                  alt={pictures[currentIndex].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>

              {pictures.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    className="absolute left-4 text-white hover:text-slate-300 transition-colors p-3 hover:bg-white/10 rounded-full z-10"
                    aria-label="Previous image"
                  >
                    <LucideChevronLeft size={32} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className="absolute right-4 text-white hover:text-slate-300 transition-colors p-3 hover:bg-white/10 rounded-full z-10"
                    aria-label="Next image"
                  >
                    <LucideChevronRight size={32} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {pictures.map((picture, index) => (
                      <button
                        key={`${picture.src}-${index}`}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {pictures.length > 1 && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                  {currentIndex + 1} / {pictures.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PictureStackContext.Provider>
  );
}
