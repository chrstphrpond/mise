"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 85% 5%, rgba(162,123,92,0.20) 0%, rgba(162,123,92,0) 60%), radial-gradient(45% 55% at 10% 5%, rgba(252,247,239,1) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #fcf7ef 0%, #ffffff 70%)",
        }}
      />

      <Container className="pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow>Contact</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 max-w-[950px] font-medium tracking-[-0.02em] leading-[1.1] md:leading-[1.05] text-[clamp(2.5rem,7vw,5.375rem)]"
          >
            Talk to Our Team About{" "}
            <span className="bg-gradient-to-br from-primary-70 via-primary to-primary-70 bg-clip-text text-transparent">
              MISE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-base md:text-lg text-ink-muted"
          >
            Have questions about features, pricing, or how Mise can support
            your F&amp;B operations? A real human from the team replies within
            4 business hours, Sydney time.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
