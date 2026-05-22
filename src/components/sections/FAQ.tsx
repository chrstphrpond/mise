"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X as XIcon, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const faqs = [
  {
    q: "What types of businesses can use Mise?",
    a: "Mise is designed for coffee shops, restaurants, cloud kitchens, and multi-outlet F&B brands. Whether you operate a single café or manage several branches, Mise adapts to your operational needs.",
  },
  {
    q: "Does Mise support kitchen display systems (KDS)?",
    a: "Yes — Growth and Enterprise plans include a real-time KDS that mirrors orders from the cashier to every kitchen station with status tracking and bump-bar controls.",
  },
  {
    q: "Can I manage multiple outlets under one account?",
    a: "Absolutely. Centralized management is built in: push menu, pricing, and promotions to every outlet, and drill into per-location performance from one dashboard.",
  },
  {
    q: "Does the system support product variants and add-ons?",
    a: "Yes. Define variants (size, sweetness, milk, etc.) and add-ons once, then reuse them across outlets — inventory is automatically deducted as orders go in.",
  },
  {
    q: "Is Mise suitable for growing or franchise brands?",
    a: "Yes. The Enterprise plan adds unlimited outlets, dedicated onboarding, and API access so franchise operations can integrate Mise into existing back-office systems.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(252,247,239,0) 0%, #fcf7ef 100%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-20 px-5 py-20 md:px-10 lg:px-16">
        {/* Inner container w-768 per Figma */}
        <div className="flex w-full max-w-[768px] flex-col items-center gap-20">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <Eyebrow>Support &amp; Help</Eyebrow>

            {/* Heading + sub */}
            <div className="flex w-full max-w-[768px] flex-col items-center gap-6">
              <h2 className="text-center font-display text-[clamp(2.5rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-1.28px] text-ink-title">
                Got Questions?
                <br />
                We&apos;ve Got Answers.
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-2 text-base tracking-[-0.32px] text-ink-muted">
                <span>Haven&apos;t found solution? Feel free to</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full font-medium text-primary hover:text-primary-70 transition-colors"
                >
                  Contact Us
                  <ChevronRight className="size-5" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Accordion list */}
          <div className="flex w-full flex-col">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={f.q}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "200px" }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className={`flex w-full flex-col ${i > 0 ? "border-t border-line" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full items-center gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-md"
                  >
                    <span className="flex-1 text-[20px] font-medium leading-[1.5] text-ink-title">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className="inline-flex size-6 items-center justify-center text-ink shrink-0"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                          <motion.span
                            key="x"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                          >
                            <XIcon className="size-5" strokeWidth={1.5} />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="plus"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                          >
                            <Plus className="size-5" strokeWidth={1.5} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-base leading-[1.5] tracking-[-0.32px] text-ink-title">
                          {f.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner (Figma node 2289:15129) */}
        <motion.div
          id="cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.6 }}
          className="relative flex h-auto w-full max-w-[1312px] flex-col overflow-hidden rounded-[32px] bg-primary lg:h-[437px] lg:flex-row lg:items-center"
        >
          {/* Left content */}
          <div className="flex flex-1 flex-col items-start justify-center gap-8 p-8 md:p-12">
            <div className="flex w-full flex-col gap-6 text-white">
              <h3 className="font-display text-[clamp(2rem,4vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.8px] text-white">
                Start Running Your F&amp;B Operations Smarter Today
              </h3>
              <p className="text-base leading-[1.5] tracking-[-0.32px]">
                Bring structure to your daily operations with Mise. Manage
                orders, coordinate your kitchen, track inventory, and monitor
                sales performance, all from one modern POS system.
              </p>
            </div>
            <div className="flex flex-wrap items-start gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-base font-medium tracking-[-0.32px] text-white hover:bg-white/10 transition-colors"
              >
                Book a Demo
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full border border-white bg-white px-6 py-3 text-base font-medium tracking-[-0.32px] text-primary hover:bg-surface-cream transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Right image — coffee shop bg + floating iPad mockup */}
          <div className="relative h-[320px] w-full overflow-hidden lg:h-full lg:w-[656px] lg:shrink-0">
            <Image
              src="https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/cta-bg.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 656px, 100vw"
              className="object-cover"
              unoptimized
            />
            {/* iPad mockup floating bottom-center — matches Figma 529×352 */}
            <div className="absolute left-1/2 bottom-0 w-[82%] max-w-[529px] -translate-x-1/2 translate-y-[12%] drop-shadow-[-7px_40px_39px_rgba(162,123,92,0.4)]">
              <div className="relative aspect-[529/352] w-full">
                {/* iPad device frame */}
                <Image
                  src="https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/cta-ipad.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 529px, 90vw"
                  className="object-contain"
                  unoptimized
                />
                {/* Screen content overlay — inset to fit inside the iPad bezel */}
                <div className="absolute inset-[3.45%_2.96%_6.13%_2.96%] overflow-hidden">
                  <Image
                    src="https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/cta-ipad-screen.png"
                    alt="Mise POS dashboard preview"
                    fill
                    sizes="(min-width: 1024px) 497px, 85vw"
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
