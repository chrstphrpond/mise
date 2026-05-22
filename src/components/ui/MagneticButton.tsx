"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-70 shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_8px_24px_-12px_rgba(162,123,92,0.6)]",
        secondary:
          "bg-surface text-ink ring-1 ring-line hover:ring-ink/30 hover:bg-surface-cream",
        ghost: "bg-transparent text-ink hover:bg-ink/5",
        dark: "bg-ink text-surface hover:bg-secondary-80",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[15px]",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    asChild?: never;
    href?: string;
    icon?: boolean;
    magneticStrength?: number;
    magneticRadius?: number;
  };

const SPRING_CONFIG = { stiffness: 200, damping: 15, mass: 0.5 } as const;

export function MagneticButton({
  className,
  variant,
  size,
  href,
  icon,
  children,
  magneticStrength = 0.3,
  magneticRadius = 80,
  ...props
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const node = wrapperRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
      const outsideX = Math.max(0, Math.abs(dx) - halfW);
      const outsideY = Math.max(0, Math.abs(dy) - halfH);
      const distOutside = Math.hypot(outsideX, outsideY);

      if (distOutside > magneticRadius) {
        x.set(0);
        y.set(0);
        return;
      }
      x.set(dx * magneticStrength);
      y.set(dy * magneticStrength);
    },
    [magneticRadius, magneticStrength, prefersReducedMotion, x, y],
  );

  const handlePointerLeave = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const classes = cn(button({ variant, size }), className);

  const content = (
    <>
      {children}
      {icon ? <ChevronRight className="size-4 -mr-1" /> : null}
    </>
  );

  const wrapperStyle = prefersReducedMotion
    ? undefined
    : { x: springX, y: springY };

  if (href) {
    return (
      <motion.div
        ref={wrapperRef}
        className="inline-flex"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={wrapperStyle}
      >
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={wrapperRef}
      className="inline-flex"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={wrapperStyle}
    >
      <button className={classes} {...props}>
        {content}
      </button>
    </motion.div>
  );
}
