"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function BlurTextEffect({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const chars = containerRef.current.querySelectorAll("span.char");

    if (prefersReducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.set(chars, { opacity: 0, y: 10, filter: "blur(8px)" });
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.015,
      clearProps: "filter",
    });
  }, [children]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      aria-label={children}
    >
      {children.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden="true"
          className="char inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
