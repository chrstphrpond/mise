"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  // Bypass Lenis entirely when the user prefers reduced motion. Native scroll
  // is the accessible default; smoothing is a craft layer, not a baseline.
  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        // Intercept in-page anchor links and offset for the sticky navbar.
        anchors: { offset: 80 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
