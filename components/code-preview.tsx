"use client";

import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/github.css";
import { CopyIcon } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "./button";
import { cn } from "@/lib/utils";

hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("html", html);
hljs.registerLanguage("xml", xml);

interface CodeTab {
  label: string;
  language: "tsx" | "ts" | "js" | "jsx" | "html";
  code: string;
}

export default function CodePreview({
  children,
  codeTabs,
}: {
  children: React.ReactNode;
  codeTabs: CodeTab[];
}) {
  const [view, setView] = useState<string>("preview");

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab?.code ?? "");
  };

  const activeTab = codeTabs.find((tab) => tab.label === view);

  const code = useMemo(() => {
    return hljs.highlight(activeTab?.code ?? "", {
      language: activeTab?.language ?? "tsx",
    }).value;
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <Button
            onClick={() => setView("preview")}
            className={cn(view === "preview" && "bg-slate-200")}
          >
            Preview
          </Button>
          {codeTabs.map((tab) => (
            <Button
              key={tab.label}
              onClick={() => setView(tab.label)}
              className={cn(view === tab.label && "bg-slate-200")}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        {activeTab && (
          <div className="flex gap-2 items-center">
            <div className="text-xs font-mono">{activeTab?.language}</div>
            <Button onClick={handleCopy} size="icon">
              <CopyIcon className="size-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="border-slate-200 border-2 rounded-lg h-[300px] relative overflow-hidden">
        {view === "preview" ? (
          <div className="w-full h-full flex justify-center items-center">
            {children}
          </div>
        ) : (
          <div className="h-full overflow-auto bg-slate-100">
            <pre className="not-prose font-mono p-2 relative text-xs select-all">
              <code
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe
                dangerouslySetInnerHTML={{ __html: code }}
              />
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
