"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-32 bg-surface">
      <Container>
        <SectionHeader
          eyebrow="Services"
          title={
            <>
              Supporting Every Layer of Your <br className="hidden md:block" />
              F&amp;B Operations
            </>
          }
          description="From the first order at open to the close-out report — Mise covers the moving parts your floor, kitchen, and back office hit every day."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* LEFT COLUMN — 2 stacked cards */}
          <div className="flex flex-col gap-5">
            <BrownCard
              title="Order Flow & Payment"
              description="Open a check, fire to the kitchen, split four ways, accept card, cash, or QR — without the cashier ever leaving the order screen."
              visual={<OrderFlowMockup />}
              minH="min-h-[420px]"
            />
            <CreamCard
              title="Inventory & Menu"
              description="Build variants and add-ons once. Recipes deduct ingredients on every sale, and 86'ing an item hides it across every outlet."
              visual={<InventoryRows />}
              minH="min-h-[320px]"
            />
          </div>

          {/* RIGHT COLUMN — 1 tall card */}
          <BrownCard
            title="Sales & Operations, Centralized"
            description="See live revenue, void rate, attach rate, and staff activity across every outlet. Drill from group total down to a single ticket without leaving the dashboard."
            visual={<CentralizedSalesMockup />}
            stack
            minH="lg:min-h-[760px]"
          />
        </div>
      </Container>
    </section>
  );
}

function BrownCard({
  title,
  description,
  visual,
  stack,
  minH,
}: {
  title: string;
  description: string;
  visual: React.ReactNode;
  stack?: boolean;
  minH?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{ duration: 0.6 }}
      className={`relative isolate overflow-hidden rounded-3xl bg-primary text-white ${minH ?? ""}`}
    >
      <div className={`grid ${stack ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1fr_1.2fr]"} h-full`}>
        <div className="p-8 md:p-10 flex flex-col justify-start gap-3">
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white max-w-md">
            {title}
          </h3>
          <p className="text-sm md:text-base text-primary-10/80 max-w-md leading-relaxed">
            {description}
          </p>
        </div>
        <div className={`relative ${stack ? "px-6 pb-8 md:px-10 md:pb-10" : "p-6 md:py-10 md:pr-10"}`}>
          {visual}
        </div>
      </div>
    </motion.article>
  );
}

function CreamCard({
  title,
  description,
  visual,
  minH,
}: {
  title: string;
  description: string;
  visual: React.ReactNode;
  minH?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{ duration: 0.6, delay: 0.05 }}
      className={`relative isolate overflow-hidden rounded-3xl bg-surface-cream ring-1 ring-primary/10 ${minH ?? ""}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.3fr] h-full">
        <div className="p-8 md:p-10 flex flex-col justify-center gap-3">
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink-title max-w-xs">
            {title}
          </h3>
          <p className="text-sm md:text-base text-ink-muted max-w-sm leading-relaxed">
            {description}
          </p>
        </div>
        <div className="relative pl-2 pr-6 py-6 md:py-8 md:pr-10">{visual}</div>
      </div>
    </motion.article>
  );
}

function OrderFlowMockup() {
  const items = [
    { name: "Soda Beverage", price: "$5.00", color: "#a27b5c" },
    { name: "French Toast Sugar", price: "$8.50", color: "#3f4e4f" },
    { name: "Iced Coffee", price: "$4.50", color: "#c9a78a" },
  ];
  return (
    <div className="rounded-2xl bg-white text-ink-title p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] max-w-[300px] ml-auto">
      <div className="flex items-center justify-between px-2 pb-2">
        <p className="text-xs font-semibold">Order Detail</p>
        <span className="rounded-full bg-primary-10 px-2 py-0.5 text-[10px] text-primary-90">
          Active
        </span>
      </div>
      <div className="space-y-1.5">
        {items.map((o) => (
          <div
            key={o.name}
            className="flex items-center gap-2.5 rounded-xl bg-surface-muted p-2"
          >
            <div
              className="size-8 rounded-lg shrink-0"
              style={{ backgroundColor: o.color }}
            />
            <span className="flex-1 text-[12px] font-medium">{o.name}</span>
            <span className="text-[12px] font-semibold">{o.price}</span>
          </div>
        ))}
      </div>
      <button className="mt-2.5 w-full rounded-full bg-primary text-white py-2 text-xs font-medium">
        Payment
      </button>
    </div>
  );
}

function CentralizedSalesMockup() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2 rounded-2xl bg-white text-ink-title p-4 shadow-2xl">
        <p className="text-[11px] text-emerald-600 font-medium">
          Sales up to 56% compared to yesterday
        </p>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-ink-muted">Today Revenue</p>
            <p className="mt-1 text-2xl font-display font-medium">$559,102</p>
          </div>
          <div>
            <p className="text-xs text-ink-muted">Today Profit</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-display font-medium">$223,640</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-600 px-1.5 py-0.5 text-[10px] font-medium">
              +40%
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 items-end h-24">
          {[
            { pct: "40%", label: "Dine In", h: 88, h2: 70 },
            { pct: "15%", label: "Takeaway", h: 56, h2: 40 },
            { pct: "35%", label: "Delivery", h: 76, h2: 55 },
            { pct: "10%", label: "Pick Up", h: 44, h2: 30 },
          ].map((c) => (
            <div key={c.label} className="flex flex-col gap-1 text-[10px]">
              <div className="flex items-end gap-0.5 h-16">
                <div
                  className="flex-1 rounded-md bg-primary"
                  style={{ height: `${c.h}%` }}
                />
                <div
                  className="flex-1 rounded-md bg-primary-20"
                  style={{ height: `${c.h2}%` }}
                />
              </div>
              <div>
                <p className="font-semibold">{c.pct}</p>
                <p className="text-ink-muted">{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white text-ink-title p-3 shadow-xl">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold">Reservation Order</span>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[9px]">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div
              key={i}
              className={`rounded-md py-1.5 ${i === 3 ? "bg-primary text-white" : "bg-surface-muted"}`}
            >
              <p>{d}</p>
              <p className="font-semibold mt-0.5">{12 + i}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 space-y-1">
          {["Karl Akira", "Earl Grey", "Ravi K."].map((n, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg bg-surface-muted px-2 py-1.5"
            >
              <div className="size-5 rounded-full bg-primary/40" />
              <span className="text-[10px] flex-1">{n}</span>
              <span className="text-[9px] text-ink-muted">T-0{i + 4}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white text-ink-title p-3 shadow-xl">
        <p className="text-xs font-semibold">New Self Order</p>
        <div className="mt-2 space-y-1.5">
          {[
            { name: "Cappuccino", qty: 2 },
            { name: "Croissant", qty: 1 },
            { name: "Latte", qty: 1 },
            { name: "Earl Grey", qty: 3 },
          ].map((o) => (
            <div
              key={o.name}
              className="flex items-center justify-between rounded-lg bg-surface-muted px-2 py-1.5 text-[10px]"
            >
              <span className="font-medium">{o.name}</span>
              <span className="text-ink-muted">×{o.qty}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InventoryRows() {
  const rows = [
    { name: "Orange Juice", cat: "Coffee & Beverage", stock: "520 Pcs", price: "$4.00", color: "#f4c084" },
    { name: "Iced Creamy Latte", cat: "Coffee & Beverage", stock: "240 Pcs", price: "$4.00", color: "#d4a576" },
    { name: "Ristretto Bianco", cat: "Coffee & Beverage", stock: "180 Pcs", price: "$4.00", color: "#8a6442" },
  ];
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div
          key={r.name}
          className="flex items-center gap-3 rounded-xl bg-white ring-1 ring-line/80 p-2.5"
        >
          <div
            className="size-9 rounded-full shrink-0"
            style={{ backgroundColor: r.color }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold truncate">{r.name}</p>
            <p className="text-[10px] text-ink-muted">{r.cat}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-ink-muted">Ready Stock</p>
            <p className="text-[12px] font-semibold">{r.stock}</p>
          </div>
          <p className="text-[14px] font-semibold text-ink-title">{r.price}</p>
        </div>
      ))}
    </div>
  );
}
