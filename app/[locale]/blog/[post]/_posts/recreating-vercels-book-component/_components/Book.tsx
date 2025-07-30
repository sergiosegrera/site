const boxShadow =
  "0 1px 1px 0 rgba(0, 0, 0, .02), 0 4px 8px -4px rgba(0, 0, 0, .1), 0 16px 24px -8px rgba(0, 0, 0, .03)";
const bgShadow =
  "linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 12%, rgba(255, 255, 255, 0.25) 29.25%, rgba(255, 255, 255, 0) 50.5%, rgba(255, 255, 255, 0) 75.25%, rgba(255, 255, 255, 0.25) 91%, rgba(255, 255, 255, 0)), linear-gradient(90deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.1) 12%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.02) 50%, rgba(0, 0, 0, 0.2) 73.5%, rgba(0, 0, 0, 0.5) 75.25%, rgba(0, 0, 0, 0.15) 85.25%, rgba(0, 0, 0, 0))";
const bookTexture =
  "url(https://assets.vercel.com/image/upload/v1720554484/front/design/book-texture.avif)";

const defaultColor = "oklch(27.4% 0.006 286.033)";

const Triangle = () => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Triangle</title>
    <path d="M8 2L14 14H2L8 2Z" fill="currentColor" />
  </svg>
);

export default function Book({
  textured = false,
  width = 150,
  color = defaultColor,
  variant = "default",
  title = "How to make AI agents",
  icon = <Triangle />,
  illustration,
}: {
  textured?: boolean;
  width?: number;
  color?: string;
  variant?: "default" | "simple";
  title?: string;
  icon?: React.ReactNode;
  illustration?: React.ReactNode;
}) {
  return (
    // Container
    <div className="perspective-[900px] inline-block w-fit">
      {/* Rotate Wrapper */}
      <div
        className="aspect-[49/60] w-fit relative transform-3d transform-[rotate(0deg)] hover:-rotate-y-[20deg] hover:scale-[1.066] hover:-translate-x-[8px] transition-transform duration-[.25s] ease-out"
        style={{
          containerType: "inline-size",
          minWidth: `${width}px`,
        }}
      >
        {/* Book */}
        <div
          className="h-full rounded-[6px_4px_4px_6px] overflow-hidden relative transform-[translateZ(0)]"
          style={{
            backgroundColor: variant === "default" ? defaultColor : color,
            boxShadow,
            minWidth: `${width}px`,
          }}
        >
          {/* Book Body */}
          <div className="h-full w-full grid grid-rows-[1fr_auto]">
            {/* Book Stripe */}
            {variant === "default" && (
              <div
                className="flex w-full flex-row relative overflow-hidden items-stretch justify-start flex-initial transform-[translateZ(0)]"
                style={{
                  background: color,
                }}
              >
                {/* Book Illustration */}
                {illustration && (
                  <div className="object-cover absolute top-0 left-0 w-full h-full">
                    {illustration}
                  </div>
                )}
                {/* Book Bind */}
                <div
                  className="min-w-[8.2%] h-full w-[8.2%] opacity-[.2]"
                  style={{ background: bgShadow }}
                />
                {/* Book Content */}
                <div
                  className="p-[6.1%] w-full"
                  style={{ containerType: "inline-size" }}
                />
              </div>
            )}
            {/* Book Cover */}
            <div className="flex flex-row overflow-hidden items-stretch flex-initial w-full justify-start">
              {/* Book Bind */}
              <div
                className="min-w-[8.2%] h-full w-[8.2%] opacity-[.2]"
                style={{ background: bgShadow }}
              />
              {/* Book Content */}
              <div
                className="p-[6.1%] w-full flex flex-col gap-2 text-white"
                style={{ containerType: "inline-size" }}
              >
                <p className="font-bold text-balance tracking-tighter text-[10.5cqw]">
                  {title}
                </p>
                {/* Book Illustration */}
                {variant === "simple" && illustration && (
                  <div>{illustration}</div>
                )}
                {/* Book Icon */}
                {variant === "default" && icon}
              </div>
            </div>
            {/* Book Texture */}
            {textured && (
              <div
                className="absolute transform-[rotate(180deg)] inset-0 rounded-[6px_4px_4px_6px] mix-blend-hard-light bg-cover bg-no-repeat opacity-50 pointer-events-none filter brightness-110"
                style={{
                  backgroundImage: bookTexture,
                }}
              />
            )}
          </div>
        </div>
        {/* Book Pages */}
        <div
          aria-hidden="true"
          className="absolute top-[3px]"
          style={{
            height: "calc(100% - 2 * 3px)",
            width: "calc(29cqw - 2px)",
            transform: `translateX(calc(${width}px - 29cqw / 2 - 3px)) rotateY(90deg) translateX(calc(29cqw / 2))`,
            background:
              "linear-gradient(90deg, #eaeaea, transparent 70%), linear-gradient(#fff, #fafafa)",
          }}
        />
        {/* Book Back */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 rounded-[6px_4px_4px_6px] h-full"
          style={{
            width: `${width}px`,
            transform: "translateZ(calc(-1 * 29cqw))",
            backgroundColor: variant === "default" ? defaultColor : color,
            boxShadow,
          }}
        />
      </div>
    </div>
  );
}
