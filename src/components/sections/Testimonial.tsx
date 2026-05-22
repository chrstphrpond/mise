"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BrandLogo, type BrandKey } from "@/components/visuals/Brands";

type Quote = {
  brand: BrandKey;
  quote: string;
  name: string;
  role: string;
  hue: string;
};

const quotes: Quote[] = [
  {
    brand: "brewsmith",
    quote:
      "Closeout used to take me 40 minutes with a calculator and a stack of receipts. The sales dashboard does it before I've finished wiping down the bar. I haven't reconciled a Z-report by hand in over a year.",
    name: "Arif Santoso",
    role: "Founder, Brewsmith Coffee",
    hue: "#f97316",
  },
  {
    brand: "urban-plate",
    quote:
      "Friday peak used to mean the kitchen and the till disagreeing on half the tickets. Since we put the KDS on the pass, void rate dropped from around 4% to under 1%, and the expediter actually has time to plate.",
    name: "Melissa Tan",
    role: "Ops Manager, Urban Plate Restaurant",
    hue: "#22c55e",
  },
  {
    brand: "kopi-tumbuh",
    quote:
      "I opened the third outlet without hiring an ops manager, which I did not think was possible. I check the multi-outlet dashboard over my morning coffee and know within a minute which store needs me. The other two days I leave them alone.",
    name: "Daniel Wijaya",
    role: "Owner, Kopi Tumbuh (3 Outlets)",
    hue: "#0ea5e9",
  },
  {
    brand: "saji-house",
    quote:
      "We sell nasi campur with eleven possible sides, and every other POS we tried turned that into chaos. The variant manager handles it cleanly, so our COGS report finally matches what's actually moving out of the kitchen.",
    name: "Putri Anjani",
    role: "Co-founder, Saji House",
    hue: "#a855f7",
  },
  {
    brand: "nine-bites",
    quote:
      "We hire a lot of students, and a new cashier used to need a full week of shadowing. With the current till layout, they're running their own lane by the second shift. That alone saved me about 15 hours of training a month.",
    name: "Reza Hartono",
    role: "Operations Lead, Nine Bites",
    hue: "#ef4444",
  },
];

export function Testimonial() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(quotes.length / perPage);
  const visible = quotes.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="testimonial" className="scroll-mt-24 py-24 md:py-32 bg-surface">
      <Container>
        <SectionHeader
          eyebrow="Customer Testimonial"
          title={
            <>
              Trusted by F&amp;B <br className="hidden md:block" />
              Businesses Everywhere
            </>
          }
          description="See how cafe owners and restaurant managers use Mise to simplify operations, reduce errors, and gain clearer visibility over their business performance."
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {visible.map((q) => (
              <article
                key={q.name}
                className="flex flex-col rounded-[32px] bg-surface ring-1 ring-line p-8 hover:ring-primary/30 transition"
              >
                <BrandLogo brand={q.brand} size="md" />
                <p className="mt-10 flex-1 text-ink-title text-base md:text-[17px] leading-[1.55]">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div
                    className="size-12 rounded-full shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${q.hue}, ${q.hue}99)`,
                    }}
                  />
                  <div className="text-base">
                    <p className="font-semibold text-ink-title leading-tight">{q.name}</p>
                    <p className="text-ink-muted text-sm leading-tight mt-0.5">{q.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === page ? "w-6 bg-ink" : "w-1.5 bg-ink/20"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => (p - 1 + pages) % pages)}
              className="inline-flex size-10 items-center justify-center rounded-full ring-1 ring-line text-ink hover:bg-surface-cream"
              aria-label="Previous"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              onClick={() => setPage((p) => (p + 1) % pages)}
              className="inline-flex size-10 items-center justify-center rounded-full ring-1 ring-line text-ink hover:bg-surface-cream"
              aria-label="Next"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
