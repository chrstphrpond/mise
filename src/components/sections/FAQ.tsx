"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

const faqs = [
  {
    q: "Who is Imapos actually built for?",
    a: "F&B operators — specialty cafes, full-service restaurants, cloud kitchens, and multi-outlet brands. If you're selling food and drink and you care about prep par, void rate, and end-of-day cash, you're our person. Retail or services? We're not the right fit.",
  },
  {
    q: "How long does it take to get a new outlet live?",
    a: "Most single cafes are open on Imapos in a weekend. Menu import, printer setup, and staff training usually run two to three calls. Multi-outlet rollouts take longer — we'll scope it on the demo.",
  },
  {
    q: "Will it run if my internet drops?",
    a: "Yes. The terminal keeps taking orders and printing kitchen tickets offline. Once you're back online, every ticket, payment, and stock movement syncs to the cloud automatically.",
  },
  {
    q: "What about my existing payment terminal and printers?",
    a: "We support most thermal kitchen printers and cashbox hardware out of the box, and integrate with Stripe, Square, Adyen, and a handful of regional acquirers. Send us your current setup and we'll confirm before you commit.",
  },
  {
    q: "Can I export my data if it doesn't work out?",
    a: "Yes — your sales, inventory, and customer data are yours. Full CSV export is one click, and Enterprise plans get API access. No data hostage situations.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-24 md:py-32 bg-surface-muted">
      <Container>
        <SectionHeader
          eyebrow="Support & Help"
          title={
            <>
              Got Questions? <br className="hidden md:block" />
              We&apos;ve Got Answers.
            </>
          }
          description={
            <>
              Still stuck on something specific?{" "}
              <a href="/contact" className="text-primary underline underline-offset-4">
                Ask the team
              </a>
            </>
          }
        />

        <div className="mt-12 mx-auto max-w-3xl">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "200px" }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className={`${i > 0 ? "border-t border-line" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-md"
                >
                  <span className="text-lg md:text-xl font-medium text-ink-title">
                    {f.q}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex size-6 items-center justify-center text-ink shrink-0"
                  >
                    <Plus className="size-5" strokeWidth={1.5} />
                  </motion.span>
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
                      <p className="pb-6 text-base text-ink leading-relaxed max-w-2xl">
                        {f.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          id="cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 overflow-hidden rounded-3xl bg-primary text-white ring-1 ring-primary-80"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                Close Tomorrow Night
                <br className="hidden md:block" /> in Three Minutes Flat
              </h3>
              <p className="mt-4 max-w-md text-primary-10/80">
                Start a 14-day trial or book a 30-minute demo. We'll mirror your
                menu, hook up a test printer, and show you the close-out report
                you'll be running on Friday.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button href="/contact" variant="dark" size="lg">
                  Book a Demo
                </Button>
                <Button href="#pricing" variant="secondary" size="lg">
                  Start Free Trial
                </Button>
              </div>
            </div>
            <div className="relative min-h-[320px] lg:min-h-[480px] overflow-hidden">
              <Image
                src="https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/cta-bg.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(162,123,92,0.55) 0%, rgba(108,82,61,0.35) 100%)",
                }}
              />
              <div className="absolute inset-x-6 bottom-0 translate-y-8 md:inset-x-10 lg:left-8 lg:-right-6 lg:translate-y-12">
                <div
                  className="rounded-t-[24px] border-2 border-b-0 border-white p-2 md:p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(129deg, #e0d3c9 8%, #f2f2f2 105%)",
                  }}
                >
                  <div className="overflow-hidden rounded-t-[16px] bg-white">
                    <Image
                      src="https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/hero-ipad-screen.png"
                      alt="Imapos POS dashboard preview"
                      width={2030}
                      height={1520}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="block w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
