"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  monthly: number;
  yearly: number;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  ctaTrust?: string;
  highlighted?: boolean;
  features: string[];
  featuresHeading: string;
};

const plans: Plan[] = [
  {
    name: "Starter",
    monthly: 19,
    yearly: 15,
    tagline: "Single outlet",
    description: "Single-outlet cafes shipping their first POS.",
    ctaLabel: "Start Free Trial",
    ctaHref: "/contact",
    ctaTrust: "No credit card required",
    featuresHeading: "What you get",
    features: [
      "Real-time sales dashboard",
      "Dine-in & takeaway order and payment",
      "Basic inventory management",
      "Transaction history & daily reports",
      "Single outlet management",
      "Basic staff role access",
      "Email support",
    ],
  },
  {
    name: "Growth",
    monthly: 49,
    yearly: 39,
    tagline: "Up to 3 outlets",
    description: "Brands expanding past their first location.",
    ctaLabel: "Start Free Trial",
    ctaHref: "/contact",
    ctaTrust: "14-day trial · cancel anytime",
    highlighted: true,
    featuresHeading: "Everything in Starter, plus",
    features: [
      "Kitchen Display System (KDS)",
      "Customer membership & loyalty",
      "Multi-outlet up to 3 branches",
      "Advanced sales & financial analytics",
      "Table & floor management",
      "Split bill & multi-payment options",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    monthly: 99,
    yearly: 79,
    tagline: "Unlimited outlets",
    description: "Multi-branch operators and franchise groups.",
    ctaLabel: "Talk to Sales",
    ctaHref: "/contact",
    ctaTrust: "Custom onboarding included",
    featuresHeading: "Everything in Growth, plus",
    features: [
      "Unlimited outlet management",
      "Centralized reporting across branches",
      "Custom workflow configuration",
      "Dedicated account manager",
      "API & system integration support",
      "Priority onboarding assistance",
      "99.9% uptime SLA",
    ],
  },
];

function useAnimatedPrice(target: number, duration = 380) {
  const [value, setValue] = useState(target);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }
    const start = value;
    const delta = target - start;
    if (delta === 0) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(start + delta * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, prefersReducedMotion]);

  return value;
}

function AnimatedPrice({ value, highlighted }: { value: number; highlighted?: boolean }) {
  const animated = useAnimatedPrice(value);
  return (
    <span
      className={cn(
        "tabular-nums font-display font-medium tracking-tight",
        highlighted ? "text-white" : "text-ink-title",
      )}
    >
      ${Math.round(animated)}
    </span>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="pricing" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, rgba(162,123,92,0.08) 0%, rgba(162,123,92,0) 60%)",
        }}
      />

      <Container>
        <SectionHeader
          eyebrow="Pricing"
          title={
            <>
              Simple Pricing That Grows With <br className="hidden md:block" />
              Your Business
            </>
          }
          description="Start with what you need today and upgrade as your operations expand. No hidden fees, no complicated setup, just a clear plan that supports your growth."
        />

        <div className="mt-10 flex items-center justify-center gap-3">
          <BillingToggle yearly={yearly} setYearly={setYearly} />
          <motion.span
            animate={{ scale: yearly ? 1 : 0.95, opacity: yearly ? 1 : 0.6 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-1 rounded-full bg-primary-10 px-2.5 py-1 text-[11px] font-medium text-primary-90 ring-1 ring-primary/25"
          >
            <Sparkles className="size-3" /> Save 20%
          </motion.span>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -4, transition: { duration: 0.25, ease: "easeOut" } }
              }
              className={cn(
                "relative",
                p.highlighted ? "lg:-my-3" : "",
              )}
            >
              {p.highlighted ? <AnimatedGradientBorder /> : null}

              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[22px] p-7 md:p-8 ring-1 transition-shadow duration-300",
                  p.highlighted
                    ? "bg-secondary-90 ring-secondary-80 text-white shadow-[0_30px_60px_-30px_rgba(63,78,79,0.5)] lg:py-10"
                    : "bg-surface ring-line text-ink-title hover:shadow-[0_20px_40px_-25px_rgba(12,12,12,0.18)]",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3
                      className={cn(
                        "text-2xl font-medium tracking-tight",
                        p.highlighted ? "text-white" : "text-ink-title",
                      )}
                    >
                      {p.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 text-[12px] uppercase tracking-[0.14em]",
                        p.highlighted ? "text-primary-10/60" : "text-ink-muted",
                      )}
                    >
                      {p.tagline}
                    </p>
                  </div>
                  {p.highlighted ? <PopularBadge /> : null}
                </div>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      "text-5xl",
                      p.highlighted ? "text-white" : "text-ink-title",
                    )}
                  >
                    <AnimatedPrice
                      value={yearly ? p.yearly : p.monthly}
                      highlighted={p.highlighted}
                    />
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      p.highlighted ? "text-primary-10/70" : "text-ink-muted",
                    )}
                  >
                    /month
                  </span>
                </div>
                {yearly ? (
                  <p
                    className={cn(
                      "mt-1.5 text-xs",
                      p.highlighted ? "text-primary-10/70" : "text-ink-muted",
                    )}
                  >
                    ${p.yearly * 12} billed annually
                  </p>
                ) : (
                  <p
                    className={cn(
                      "mt-1.5 text-xs",
                      p.highlighted ? "text-primary-10/70" : "text-ink-muted",
                    )}
                  >
                    Billed monthly · taxes excluded
                  </p>
                )}

                <p
                  className={cn(
                    "mt-4 text-sm",
                    p.highlighted ? "text-primary-10/80" : "text-ink-muted",
                  )}
                >
                  {p.description}
                </p>

                <div
                  className={cn(
                    "mt-6 mb-5 border-t",
                    p.highlighted ? "border-white/10" : "border-line",
                  )}
                />

                <p
                  className={cn(
                    "text-[11px] uppercase tracking-[0.14em] font-semibold",
                    p.highlighted ? "text-primary-10/70" : "text-ink-muted",
                  )}
                >
                  {p.featuresHeading}
                </p>
                <ul className="mt-3 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <span
                        className={cn(
                          "mt-0.5 inline-flex size-[18px] items-center justify-center rounded-full shrink-0",
                          p.highlighted
                            ? "bg-primary/30 text-primary-10 ring-1 ring-primary/40"
                            : "bg-primary/10 text-primary ring-1 ring-primary/15",
                        )}
                      >
                        <Check className="size-2.5" strokeWidth={3} />
                      </span>
                      <span
                        className={
                          p.highlighted ? "text-primary-10/90" : "text-ink-muted"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button
                    href={p.ctaHref}
                    variant={p.highlighted ? "primary" : "secondary"}
                    size="lg"
                    className="w-full justify-center"
                  >
                    {p.ctaLabel}
                  </Button>
                  {p.ctaTrust ? (
                    <p
                      className={cn(
                        "mt-3 text-center text-[11px]",
                        p.highlighted ? "text-primary-10/60" : "text-ink-muted",
                      )}
                    >
                      {p.ctaTrust}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-muted">
          Prices in USD. Pay-as-you-go transaction fees and add-on hardware sold
          separately. Need a custom contract?{" "}
          <a
            href="/contact"
            className="font-medium text-primary underline underline-offset-4"
          >
            Talk to sales
          </a>
          .
        </p>
      </Container>
    </section>
  );
}

function BillingToggle({
  yearly,
  setYearly,
}: {
  yearly: boolean;
  setYearly: (v: boolean) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Billing period"
      className="inline-flex items-center gap-1 rounded-full bg-surface-muted ring-1 ring-line p-1"
    >
      <button
        type="button"
        onClick={() => setYearly(false)}
        aria-pressed={!yearly}
        className={cn(
          "relative rounded-full px-5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          !yearly ? "text-white" : "text-ink-muted hover:text-ink-title",
        )}
      >
        {!yearly ? (
          <motion.span
            layoutId="pricing-toggle"
            className="absolute inset-0 rounded-full bg-ink shadow-[0_4px_12px_-4px_rgba(12,12,12,0.45)]"
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          />
        ) : null}
        <span className="relative">Monthly</span>
      </button>
      <button
        type="button"
        onClick={() => setYearly(true)}
        aria-pressed={yearly}
        className={cn(
          "relative rounded-full px-5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          yearly ? "text-white" : "text-ink-muted hover:text-ink-title",
        )}
      >
        {yearly ? (
          <motion.span
            layoutId="pricing-toggle"
            className="absolute inset-0 rounded-full bg-ink shadow-[0_4px_12px_-4px_rgba(12,12,12,0.45)]"
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          />
        ) : null}
        <span className="relative">Yearly</span>
      </button>
    </div>
  );
}

function PopularBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white ring-1 ring-primary-70">
      <span className="size-1.5 rounded-full bg-white" />
      Most Popular
    </span>
  );
}

function AnimatedGradientBorder() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-px rounded-[24px] opacity-90"
      style={{
        background:
          "conic-gradient(from var(--angle, 0deg), rgba(162,123,92,0) 0%, rgba(162,123,92,0.85) 18%, rgba(108,82,61,0.85) 30%, rgba(162,123,92,0) 50%, rgba(162,123,92,0) 100%)",
        animation: "pricing-rotate 6s linear infinite",
      }}
    >
      <style>{`
        @property --angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes pricing-rotate {
          to { --angle: 360deg; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pricing-rotate { animation: none; }
        }
      `}</style>
    </div>
  );
}
