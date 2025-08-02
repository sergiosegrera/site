"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import StickyNote from "./sticky-note";

const MAX_QUOTES = 27;

export default function QuoteStickyNote() {
  const t = useTranslations("home");

  const [quote, setQuote] = useState(
    t(`quotes.${Math.floor(Math.random() * MAX_QUOTES)}`),
  );
  const [color, setColor] = useState<"yellow" | "pink" | "orange" | "blue">(
    "yellow",
  );
  const [rotation, setRotation] = useState(Math.random() * 20 - 10);

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Typing effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText("");

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= quote.length) {
        setDisplayedText(quote.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30); // Adjust speed here (lower = faster)

    return () => clearInterval(typingInterval);
  }, [quote]);

  return (
    <StickyNote
      color={color}
      rotation={rotation}
      width={140}
      onClick={() => {
        const newQuote = t(`quotes.${Math.floor(Math.random() * MAX_QUOTES)}`);
        setQuote(newQuote);
        setColor(
          ["yellow", "pink", "orange", "blue"][Math.floor(Math.random() * 4)] as
            | "yellow"
            | "pink"
            | "orange"
            | "blue",
        );
        setRotation(Math.random() * 20 - 10);
      }}
    >
      <q
        className="text-[10px] whitespace-pre-line text-left italic"
        suppressHydrationWarning
        style={{
          quotes: "none",
        }}
      >
        {displayedText}
        {isTyping && <span className="animate-pulse">|</span>}
      </q>
    </StickyNote>
  );
}
