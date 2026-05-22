"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type StatItem = {
  target: number;
  format: (value: number) => string;
  label: string;
};

const STATS: StatItem[] = [
  {
    target: 1200,
    format: (v) => `${Math.round(v).toLocaleString()}+`,
    label: "Outlets running Imapos daily",
  },
  {
    target: 1.8,
    format: (v) => `$${v.toFixed(1)}B`,
    label: "GMV processed last year",
  },
  {
    target: 99.98,
    format: (v) => `${v.toFixed(2)}%`,
    label: "Uptime across peak hours",
  },
  {
    target: 18,
    format: (v) => `${Math.round(v)} min`,
    label: "From signup to first sale",
  },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let rafId = 0;

    function tick(now: number) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return value;
}

function StatBlock({
  stat,
  start,
  immediate,
  index,
}: {
  stat: StatItem;
  start: boolean;
  immediate: boolean;
  index: number;
}) {
  const value = useCountUp(stat.target, 1500, start && !immediate);
  const display = immediate ? stat.format(stat.target) : stat.format(value);

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 px-2 py-2",
        index > 0 && "lg:border-l lg:border-line lg:pl-10",
      )}
    >
      <span
        className="font-display text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-br from-primary via-[#6c523d] to-primary bg-clip-text text-transparent tabular-nums"
        aria-label={stat.format(stat.target)}
      >
        {display}
      </span>
      <span className="text-sm text-ink-muted leading-relaxed max-w-[14ch]">
        {stat.label}
      </span>
    </div>
  );
}

export function Stats() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });
  const prefersReducedMotion = useReducedMotion();
  const immediate = prefersReducedMotion ?? false;

  return (
    <section id="stats" className="py-20 md:py-24 bg-surface-cream">
      <Container>
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <Eyebrow>The proof, in numbers</Eyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-ink-title tracking-tight">
            Four years of running F&amp;B, measured honestly
          </h2>
          <p className="mt-3 text-ink-muted max-w-xl">
            Pulled from our own dashboards — not a pitch deck. Updated quarterly.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={immediate ? false : { opacity: 0, y: 24 }}
          animate={inView || immediate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 lg:gap-x-2"
        >
          {STATS.map((stat, i) => (
            <StatBlock
              key={stat.label}
              stat={stat}
              start={inView}
              immediate={immediate}
              index={i}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
