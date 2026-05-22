"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Tab = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

const tabs: Tab[] = [
  {
    id: "cafe",
    label: "Coffee Shops & Cafes",
    eyebrow: "Coffee Shops & Cafes Solution",
    title: "Built for the 8am Rush",
    description:
      "Modifiers, milks, and sweetness levels ring up in two taps. Baristas keep the line moving while every shot pulls against live stock.",
    bullets: [
      "Two-tap modifiers for milk, sweetness, and size",
      "Recipe-linked stock — every shot deducts ingredients",
      "Shift tip pool and barista clock-in built in",
      "Daily covers and best-seller view at the bar",
    ],
  },
  {
    id: "restaurant",
    label: "Restaurants",
    eyebrow: "Restaurant Solution",
    title: "Service That Holds Together at 9pm",
    description:
      "Floor map, course pacing, and a KDS that keeps the pass synced with the till — even when the room is full and the bar is slammed.",
    bullets: [
      "Live floor map with table dwell time and turn count",
      "Course pacing routes apps, mains, and desserts on cue",
      "KDS bumps tickets across hot, cold, and bar stations",
      "Split bills, voids, and comps logged to the server",
    ],
  },
  {
    id: "cloud",
    label: "Cloud Kitchens",
    eyebrow: "Cloud Kitchen Solution",
    title: "Five Brands, One Ticket Stream",
    description:
      "Pull every aggregator order into one queue, batch by station, and watch per-channel margin in real time — no tablet wall required.",
    bullets: [
      "Aggregator orders consolidated into a single station view",
      "Per-brand menus, pricing, and 86 lists from one panel",
      "Driver handoff timestamps with prep-to-pickup tracking",
      "Per-channel margin after commissions and packaging",
    ],
  },
  {
    id: "multi",
    label: "Multi Outlet Brands",
    eyebrow: "Multi Outlet Solution",
    title: "Same Menu, Same Standards, Every Branch",
    description:
      "Push a price change to twelve outlets in one click. Drill from group revenue down to a single barista's voids in under a minute.",
    bullets: [
      "Menu, pricing, and promo updates push live to every outlet",
      "Outlet leaderboard with revenue, void rate, and attach rate",
      "Region and franchise roles with per-outlet permissions",
      "Group P&L roll-up with branch-level drill-down",
    ],
  },
];

export function Solution() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section id="solution" className="relative scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeader
          eyebrow="Business Solutions"
          title={
            <>
              The Right POS for Every Type of <br className="hidden md:block" />
              F&amp;B Business
            </>
          }
          description="A cafe at 8am, a 60-cover dining room at 9pm, a cloud kitchen running five brands — Imapos shapes itself to the operation, not the other way around."
        />

        {/* Segmented control */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Solution categories"
            className="inline-flex items-center bg-surface-muted rounded-2xl p-1 gap-0.5 max-w-full overflow-x-auto"
          >
            {tabs.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(t.id)}
                  className={`relative rounded-xl px-6 py-2.5 text-sm font-medium min-w-[140px] sm:min-w-[160px] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                    isActive ? "text-ink-title" : "text-ink-muted hover:text-ink-title"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="solution-tab-bg"
                      className="absolute inset-0 rounded-xl bg-white shadow-[0_0_0.5px_rgba(20,20,20,0.04),0_2px_8px_rgba(20,20,20,0.08)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                {current.eyebrow}
              </p>
              <h3 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight">
                {current.title}
              </h3>
              <p className="mt-4 text-ink-muted">{current.description}</p>
              <ul className="mt-6 space-y-3">
                {current.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3" />
                    </span>
                    <span className="text-sm text-ink-title">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <SolutionVisual />
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}

function SolutionVisual() {
  return (
    <div className="relative">
      <div className="relative aspect-[4/5] sm:aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-line">
        <Image
          src="/figma-assets/solution-cafe.png"
          alt="Cafe operations"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Floating stats card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "200px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute -bottom-4 -left-4 md:-left-10 w-[230px] rounded-2xl overflow-hidden ring-1 ring-line shadow-2xl"
      >
        <div className="bg-primary px-5 pt-4 pb-5 text-white">
          <p className="text-[11px] opacity-90">Today Revenue</p>
          <p className="mt-1 text-2xl font-display font-medium tracking-tight">
            $2,005
          </p>
          <div className="mt-3 flex items-end gap-1.5 h-12">
            {[36, 42, 58, 68, 74, 84, 50, 56].map((h, i) => (
              <div
                key={i}
                className={`w-2 rounded-t-md ${i % 2 ? "bg-white" : "bg-white/30"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="bg-white p-4 space-y-2 text-[11px]">
          {[
            { label: "Dine In", value: "$1,480.00" },
            { label: "Take Away", value: "$340.00" },
            { label: "Delivery", value: "$185.00" },
          ].map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between ${i < 2 ? "border-b border-line pb-2" : ""}`}
            >
              <span className="font-medium text-ink-title">{row.label}</span>
              <span className="font-semibold text-ink-title">{row.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
