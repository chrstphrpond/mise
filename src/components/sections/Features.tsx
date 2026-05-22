"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Layout = "hero" | "tall" | "wide" | "compact";

type Feature = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  bg: string;
  layout: Layout;
};

const features: Feature[] = [
  {
    eyebrow: "See it live",
    title: "Real-time sales dashboard",
    description:
      "Every order, every dollar, every outlet — on screen the moment it rings. Catch a soft Tuesday by 11am, not Friday's report.",
    image: "/figma-assets/feature-sales.png",
    alt: "Live sales dashboard",
    bg: "bg-primary-70",
    layout: "hero",
  },
  {
    eyebrow: "Kitchen sync",
    title: "Kitchen Display System",
    description:
      "Tickets route by item to hot, cold, and bar. Bump bars, station colors, prep timers.",
    image: "/figma-assets/feature-kds.png",
    alt: "Kitchen display system",
    bg: "bg-primary-90",
    layout: "tall",
  },
  {
    eyebrow: "Read the room",
    title: "Table & Floor Management",
    description:
      "Live floor map with dwell time, course status, and server assignments. Hand off a section in seconds.",
    image: "/figma-assets/feature-tables.png",
    alt: "Table and floor management",
    bg: "bg-secondary-90",
    layout: "wide",
  },
  {
    eyebrow: "Tune to your floor",
    title: "Flexible Settings",
    description:
      "Tax, tipping, printers, channels — every knob, one panel.",
    image: "/figma-assets/feature-settings.png",
    alt: "Operational settings panel",
    bg: "bg-primary-80",
    layout: "compact",
  },
  {
    eyebrow: "Stock that self-counts",
    title: "Inventory & Variants",
    description:
      "Recipes deduct ingredients with every sale. Sizes, milks, add-ons — defined once.",
    image: "/figma-assets/feature-inventory.png",
    alt: "Smart inventory with variants",
    bg: "bg-secondary",
    layout: "compact",
  },
];

const cardPlacement: Record<Layout, string> = {
  hero: "lg:col-span-3 lg:row-span-2",
  tall: "lg:col-span-1 lg:row-span-2",
  wide: "lg:col-span-2 lg:row-span-1",
  compact: "lg:col-span-1 lg:row-span-1",
};

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
          description="From taking orders to analyzing revenue, Imapos connects every part of your daily workflow into one integrated system."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-4 lg:auto-rows-[280px] lg:gap-5">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className={`group relative isolate overflow-hidden rounded-3xl ${f.bg} ${cardPlacement[f.layout]}`}
            >
              <BentoCard feature={f} />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BentoCard({ feature: f }: { feature: Feature }) {
  switch (f.layout) {
    case "hero":
      return (
        <div className="grid h-full grid-rows-[auto_1fr] gap-6 p-8 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-rows-1 lg:items-center lg:gap-10 lg:p-12">
          <CardCopy
            eyebrow={f.eyebrow}
            title={f.title}
            description={f.description}
            heading="text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.05]"
            textMax=""
          />
          <ImageFrame
            src={f.image}
            alt={f.alt}
            sizes="(min-width: 1024px) 45vw, 90vw"
            objectPos="object-left-top"
            aspect="aspect-[16/10]"
          />
        </div>
      );

    case "tall":
      return (
        <div className="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-5 p-7 lg:gap-6 lg:p-8">
          <CardCopy
            eyebrow={f.eyebrow}
            title={f.title}
            description={f.description}
            heading="text-2xl lg:text-[1.75rem] lg:leading-[1.1]"
            textMax=""
          />
          <ImageFrame
            src={f.image}
            alt={f.alt}
            sizes="(min-width: 1024px) 22vw, 90vw"
            objectPos="object-left-top"
            aspect="aspect-[4/3]"
          />
        </div>
      );

    case "wide":
      return (
        <div className="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-5 p-7 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:grid-rows-1 lg:items-center lg:gap-6 lg:p-9">
          <CardCopy
            eyebrow={f.eyebrow}
            title={f.title}
            description={f.description}
            heading="text-2xl lg:text-[1.75rem] lg:leading-[1.1]"
            textMax=""
          />
          <ImageFrame
            src={f.image}
            alt={f.alt}
            sizes="(min-width: 1024px) 30vw, 90vw"
            objectPos="object-left-top"
            aspect="aspect-[16/10]"
          />
        </div>
      );

    case "compact":
    default:
      return (
        <div className="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-4 p-6 lg:gap-5 lg:p-7">
          <CardCopy
            eyebrow={f.eyebrow}
            title={f.title}
            description={f.description}
            heading="text-xl lg:text-[1.375rem] lg:leading-[1.15]"
            textMax=""
          />
          <ImageFrame
            src={f.image}
            alt={f.alt}
            sizes="(min-width: 1024px) 22vw, 90vw"
            objectPos="object-left-top"
            aspect="aspect-[16/9]"
          />
        </div>
      );
  }
}

function CardCopy({
  eyebrow,
  title,
  description,
  heading,
  textMax,
}: {
  eyebrow: string;
  title: string;
  description: string;
  heading: string;
  textMax: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${textMax}`}>
      <span className="self-start inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/90 ring-1 ring-white/15 backdrop-blur-sm">
        {eyebrow}
      </span>
      <h3
        className={`font-display font-medium tracking-tight text-white ${heading}`}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/70 lg:text-[15px]">
        {description}
      </p>
    </div>
  );
}

function ImageFrame({
  src,
  alt,
  sizes,
  objectPos,
  aspect,
}: {
  src: string;
  alt: string;
  sizes: string;
  objectPos: string;
  aspect: string;
}) {
  return (
    <div className="relative h-full min-h-[140px] w-full">
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.01]">
        <div className="h-full overflow-hidden rounded-2xl border-2 border-white/25 bg-white/5 p-1.5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-white/95">
            <div className={`relative w-full ${aspect}`}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                className={`object-cover ${objectPos}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
