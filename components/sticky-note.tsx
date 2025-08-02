import { cn } from "@/lib/utils";

const colors = {
  border: {
    yellow: "oklch(90.5% 0.182 98.111)",
    pink: "oklch(82.3% 0.12 346.018)",
    orange: "oklch(83.7% 0.128 66.29)",
    blue: "oklch(82.8% 0.111 230.318)",
  },
  background: {
    yellow: "oklch(94.5% 0.129 101.54)",
    pink: "oklch(89.9% 0.061 343.231)",
    orange: "oklch(90.1% 0.076 70.697)",
    blue: "oklch(90.1% 0.058 230.902)",
  },
};

export default function StickyNote({
  width = 200,
  rotation = 5,
  color = "pink",
  position,
  onClick,
  children,
  folded = true,
}: {
  width?: number;
  rotation?: number;
  color?: "yellow" | "pink" | "orange" | "blue";
  position?: {
    x: number;
    y: number;
  };
  onClick?: () => void;
  children?: React.ReactNode;
  folded?: boolean;
}) {
  return (
    // Container
    <button
      type="button"
      style={{
        width: `${width}px`,
        transform: `rotate(${rotation}deg)`,
        position: position ? "absolute" : "static",
        top: position?.y ?? 0,
        left: position?.x ?? 0,
      }}
      className="flex flex-col aspect-square hover:scale-[1.025] transition-all duration-300 cursor-pointer drop-shadow-sm"
      onClick={onClick}
      suppressHydrationWarning
    >
      <div
        className="border border-b-0 rounded-t-xs flex-1 p-1 overflow-hidden flex justify-center items-center"
        style={{
          borderColor: colors.border[color],
          backgroundColor: colors.background[color],
        }}
      >
        {children}
      </div>
      {/* Sticky note folded corner */}
      <div className="h-6 flex w-full">
        <div
          className={cn(
            "flex-1 border-l border-b rounded-bl-xs",
            !folded && "border-r rounded-br-xs",
          )}
          style={{
            borderColor: colors.border[color],
            backgroundColor: colors.background[color],
          }}
        />
        {/* Folded corner */}
        {folded && (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Sticky note folded corner"
          >
            <title>Sticky note folded corner</title>
            <path
              d="M22.793 0.5L0.5 22.793V0.5H22.793Z"
              fill={colors.background[color]}
              stroke={colors.border[color]}
            />
          </svg>
        )}
      </div>
    </button>
  );
}
