import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-slate-100 hover:bg-slate-200",
  outline: "border border-slate-200",
};

const sizes = {
  sm: "px-3 py-1 rounded-md text-sm",
  icon: "p-1 size-6 rounded-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "sm",
  className,
  icon,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  size?: keyof typeof sizes;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        variants[variant],
        sizes[size],
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
