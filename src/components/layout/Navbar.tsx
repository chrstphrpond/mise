"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#solution", label: "Solution" },
  { href: "#services", label: "Services" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonial", label: "Testimonial" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container-page pt-4 pb-2 md:pt-5">
        <motion.nav
          initial={false}
          animate={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,1)",
            boxShadow: scrolled
              ? "0 10px 40px -20px rgba(12,12,12,0.18)"
              : "0 4px 24px -16px rgba(12,12,12,0.08)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "flex items-center justify-between gap-6 rounded-full pl-6 pr-2 py-2 md:pl-8 md:pr-2",
            "ring-1 ring-line/60 backdrop-blur-xl",
          )}
        >
          <Logo />

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative inline-flex items-center px-3 py-2 text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button href="#cta" variant="primary" size="md" className="hidden sm:inline-flex">
              Get Started
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-ink/5"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-[76px] z-40 px-4"
          >
            <div className="rounded-3xl bg-surface ring-1 ring-line shadow-2xl p-6">
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-base text-ink hover:bg-surface-cream"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button
                href="#cta"
                variant="primary"
                size="lg"
                className="mt-4 w-full"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
