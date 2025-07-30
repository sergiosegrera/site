import { CalendarIcon, ExternalLinkIcon } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { Link } from "@/i18n/navigation";
import { ScrambleH2, ScrambleH3 } from "./components/scramble-text";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, ...props }) => {
      return (
        <Link
          href={href}
          className="items-center hover:underline group no-underline gap-1 inline-flex"
          {...props}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          {props.children}
          <ExternalLinkIcon size={12} />
        </Link>
      );
    },
    p: ({ children, ...props }) => (
      <p className="text-slate-500" {...props}>
        {children}
      </p>
    ),
    li: ({ children, ...props }) => (
      <li className="text-slate-500" {...props}>
        {children}
      </li>
    ),
    h1: ({ children, ...props }) => {
      return (
        <h1 className="text-lg font-bold min-h-14" {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ children, ...props }) => {
      return (
        <ScrambleH2 className="text-base font-semibold" {...props}>
          {children}
        </ScrambleH2>
      );
    },
    h3: ({ children, ...props }) => {
      return (
        <ScrambleH3 className="text-sm font-semibold" {...props}>
          {children}
        </ScrambleH3>
      );
    },
    time: ({ children, ...props }) => {
      return (
        <time className="text-slate-500 flex items-center gap-1" {...props}>
          <CalendarIcon size={12} />
          {children}
        </time>
      );
    },
  };
}
