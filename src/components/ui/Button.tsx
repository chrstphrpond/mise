"use client";

import * as React from "react";
import Link from "next/link";
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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    asChild?: never;
    href?: string;
    icon?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  href,
  icon,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(button({ variant, size }), className);
  const content = (
    <>
      {children}
      {icon ? <ChevronRight className="size-4 -mr-1" /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
