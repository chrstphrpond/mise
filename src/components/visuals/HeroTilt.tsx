"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeroTiltProps = {
  children: ReactNode;
  className?: string;
  scrollTargetRef: React.RefObject<HTMLElement | null>;
};

const MAX_TILT = 6;
const SPRING = { stiffness: 150, damping: 18, mass: 0.4 };

export function HeroTilt({ children, className, scrollTargetRef }: HeroTiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, SPRING);
  const rotateY = useSpring(rawY, SPRING);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start end", "end start"],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.02]);
  const scrollRotateX = useTransform(scrollYProgress, [0, 1], [0, -2]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 2 * MAX_TILT;
    const rx = -(py - 0.5) * 2 * MAX_TILT;
    rawX.set(rx);
    rawY.set(ry);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 1200 }} className={cn("relative", className)}>
      <motion.div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          scale: scrollScale,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative"
      >
        <motion.div
          style={{
            rotateX: scrollRotateX,
            transformStyle: "preserve-3d",
            translateZ: 0,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
