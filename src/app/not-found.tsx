"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden bg-surface-cream px-6 py-24">
      {/* Soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-[-10%] h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="container-page relative flex flex-col items-center text-center"
      >
        <Logo size="md" className="mb-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(96px,18vw,200px)] font-medium leading-none tracking-tight text-ink-title"
        >
          <span className="bg-gradient-to-b from-primary to-primary-70 bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-h4 font-medium text-ink-title md:text-h3"
        >
          This page slipped out the kitchen door.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-xl text-base text-ink-muted md:text-lg"
        >
          Let&rsquo;s get you back to running operations smoother.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <Button href="/" variant="primary" size="lg" icon>
            Back to home
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
