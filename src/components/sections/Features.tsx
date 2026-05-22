"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Feature = {
  tag: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  bg: string;
};

const features: Feature[] = [
  {
    tag: "Track sales in real time",
    title: "Real-Time Sales Dashboard",
    description:
      "Every order, every dollar, every outlet — on screen the moment it rings. Catch a soft Tuesday by 11am, not Friday's report.",
    image: "https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/feature-sales.png",
    alt: "Real-time sales dashboard",
    bg: "bg-primary-70",
  },
  {
    tag: "Control your dine-in flow",
    title: "Table & Floor Management",
    description:
      "Live floor map with dwell time, course status, and server assignments. Hand off a section at shift change in seconds — without losing the room.",
    image: "https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/feature-tables.png",
    alt: "Table and floor management",
    bg: "bg-primary-80",
  },
  {
    tag: "Customize your operations",
    title: "Flexible Operational Settings",
    description:
      "Tax, tipping, printers, channels, prep times, floor layouts — every knob in one panel. Push to one outlet or all of them at once.",
    image: "https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/feature-settings.png",
    alt: "Operational settings",
    bg: "bg-primary-90",
  },
  {
    tag: "Streamline kitchen orders",
    title: "Kitchen Display System (KDS)",
    description:
      "Tickets route by item to hot, cold, and bar. Bump bars, station colors, prep timers — no more shouting across the line, and no more missed mods.",
    image: "https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/feature-kds.png",
    alt: "Kitchen display system",
    bg: "bg-secondary-70",
  },
  {
    tag: "Manage stock and variants",
    title: "Smart Inventory & Variant Management",
    description:
      "Recipes deduct ingredients with every sale. Sizes, milks, add-ons — defined once and applied everywhere, so stock matches what's actually moving.",
    image: "https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/feature-inventory.png",
    alt: "Inventory and variant management",
    bg: "bg-secondary",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-surface py-24 md:py-32">
      <Container>
        <SectionHeader
          eyebrow="Key Features"
          title={
            <>
              Everything You Need to Run a <br className="hidden md:block" />
              Smarter F&amp;B Operation
            </>
          }
          description="From taking orders to analyzing revenue, Mise connects every part of your daily workflow into one integrated system."
        />

        <div className="mt-12 flex flex-col gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative isolate overflow-hidden rounded-[32px] ${f.bg}`}
            >
              <div className="grid grid-cols-1 items-stretch lg:grid-cols-2">
                <div className="flex flex-col gap-6 justify-center p-8 md:p-12">
                  <span className="self-start inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-70 px-4 py-1 text-sm font-medium text-white">
                    {f.tag}
                  </span>
                  <h3 className="text-3xl font-medium tracking-tight text-white md:text-[40px] md:leading-[1.05] max-w-xl">
                    {f.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed max-w-xl">
                    {f.description}
                  </p>
                </div>
                <div className="relative min-h-[300px] lg:min-h-[460px]">
                  <Image
                    src={f.image}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
