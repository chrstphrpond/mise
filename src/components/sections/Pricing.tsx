"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Starter",
    monthly: 19,
    yearly: 15,
    description: "Single-outlet cafes shipping their first POS.",
    ctaLabel: "Start Free Trial",
    ctaHref: "/contact",
    features: [
      "Real-time sales dashboard",
      "Dine-in, takeaway, and card payments",
      "Inventory with recipe-linked deduction",
      "Daily close-out report and transaction history",
      "Single outlet, up to 3 staff accounts",
      "Role-based permissions for cashier and manager",
      "Email support, 24-hour reply",
    ],
  },
  {
    name: "Growth",
    monthly: 49,
    yearly: 39,
    description: "Two to five outlets, growing fast, need the same numbers everywhere.",
    ctaLabel: "Start Free Trial",
    ctaHref: "/contact",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Kitchen Display System with station routing",
      "Membership, points, and stored credit",
      "Up to 3 outlets, unlimited staff accounts",
      "Cost-of-goods, margin, and shift-level P&L",
      "Floor map, course pacing, and table dwell view",
      "Split bills, multi-tender, QR and BNPL",
      "Priority support, 4-hour reply",
    ],
  },
  {
    name: "Enterprise",
    monthly: 99,
    yearly: 79,
    description: "Franchise networks and brands running six or more outlets.",
    ctaLabel: "Contact Sales",
    ctaHref: "/contact",
      features: [
      "Everything in Growth",
      "Unlimited outlets and franchise hierarchy",
      "Group P&L with per-branch drill-down",
      "Custom workflows, tax rules, and roles",
      "Named account manager and quarterly review",
      "REST API, webhooks, and accounting sync",
      "White-glove onboarding and on-site training",
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeader
          eyebrow="Pricing"
          title={
            <>
              Simple Pricing That Grows With <br className="hidden md:block" />
              Your Business
            </>
          }
          description="Start where you are. Move up when you open the second outlet. No per-terminal fees, no transaction cuts, no 12-month lock-in."
        />

        <div className="mt-8 flex items-center justify-center gap-3">
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
                "relative rounded-full px-4 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                !yearly ? "text-white" : "text-ink-muted",
              )}
            >
              {!yearly ? (
                <motion.span
                  layoutId="pricing-toggle"
                  className="absolute inset-0 rounded-full bg-ink"
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
                "relative rounded-full px-4 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                yearly ? "text-white" : "text-ink-muted",
              )}
            >
              {yearly ? (
                <motion.span
                  layoutId="pricing-toggle"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              ) : null}
              <span className="relative">Yearly</span>
            </button>
          </div>
          <span className="rounded-full bg-primary-10 px-2.5 py-1 text-[11px] font-medium text-primary-90 ring-1 ring-primary/20">
            -20%
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={cn(
                "relative flex flex-col rounded-3xl p-7 md:p-8 ring-1",
                p.highlighted
                  ? "bg-secondary-90 ring-secondary-80 text-white lg:-my-3 lg:py-10"
                  : "bg-surface ring-line text-ink-title",
              )}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={cn(
                    "text-2xl font-medium tracking-tight",
                    p.highlighted ? "text-white" : "text-ink-title",
                  )}
                >
                  {p.name}
                </h3>
                {p.highlighted ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-white">
                    <span className="size-1.5 rounded-full bg-white" />
                    Most Popular
                  </span>
                ) : null}
              </div>

              <div className="mt-5 flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-5xl font-display font-medium tracking-tight",
                    p.highlighted ? "text-white" : "text-ink-title",
                  )}
                >
                  ${yearly ? p.yearly : p.monthly}
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
              <p
                className={cn(
                  "mt-2 text-sm",
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
                  "text-sm font-semibold",
                  p.highlighted ? "text-white" : "text-ink-title",
                )}
              >
                What You Get
              </p>
              <ul className="mt-3 space-y-2.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 inline-flex size-4 items-center justify-center rounded-full",
                        p.highlighted
                          ? "bg-primary/30 text-primary-10"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      <Check className="size-2.5" />
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

              <Button
                href={p.ctaHref}
                variant={p.highlighted ? "primary" : "secondary"}
                size="lg"
                className="mt-7 w-full justify-center"
              >
                {p.ctaLabel}
              </Button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
