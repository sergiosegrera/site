"use client";

import { useScramble } from "use-scramble";

export function ScrambleH1({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { ref, replay } = useScramble({
    text: children as string,
    playOnMount: true,
  });

  return (
    <h1 ref={ref} onMouseEnter={replay} {...props}>
      {children}
    </h1>
  );
}

export function ScrambleH2({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { ref, replay } = useScramble({
    text: children as string,
    playOnMount: false,
  });

  return (
    <h2 ref={ref} onMouseEnter={replay} {...props}>
      {children}
    </h2>
  );
}

export function ScrambleH3({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { ref, replay } = useScramble({
    text: children as string,
    playOnMount: false,
  });

  return (
    <h3 ref={ref} onMouseEnter={replay} {...props}>
      {children}
    </h3>
  );
}
