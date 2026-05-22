"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "default",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  variant?: "default" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.4 }}
        >
          <Eyebrow variant={variant}>{eyebrow}</Eyebrow>
        </motion.div>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "200px" }}
        transition={{ duration: 0.6 }}
        className={cn(
          "max-w-[920px] text-[clamp(2rem,4.2vw,3.625rem)] leading-[1.08] tracking-[-0.025em] font-medium",
          variant === "dark" ? "text-white" : "text-ink-title",
        )}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className={cn(
            "max-w-2xl text-base md:text-lg",
            variant === "dark" ? "text-primary-10/80" : "text-ink-muted",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
