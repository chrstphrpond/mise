"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { HeroTilt } from "@/components/visuals/HeroTilt";

const HEADLINE_PREFIX = "Smarter F&B Operations";
const HEADLINE_CONNECTOR = "with";
const HEADLINE_HIGHLIGHT = "Modern POS";
const FULL_HEADLINE = `${HEADLINE_PREFIX} ${HEADLINE_CONNECTOR} ${HEADLINE_HIGHLIGHT}`;

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function AnimatedChars({
  text,
  startIndex = 0,
  className,
}: {
  text: string;
  startIndex?: number;
  className?: string;
}) {
  const words = text.split(" ");
  let charOffset = 0;
  return (
    <span className={className}>
      {words.map((word, wIdx) => {
        const wordStart = charOffset;
        charOffset += word.length + 1;
        return (
          <span
            key={`${word}-${wIdx}`}
            className="inline-block whitespace-nowrap"
          >
            {Array.from(word).map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                aria-hidden
                className="inline-block"
                initial={{ opacity: 0, y: "0.5em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: EASE_OUT_EXPO,
                  delay: (startIndex + wordStart + i) * 0.02,
                }}
              >
                {ch}
              </motion.span>
            ))}
            {wIdx < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const prefixLen = HEADLINE_PREFIX.length;
  const connectorStart = prefixLen + 1;
  const connectorLen = HEADLINE_CONNECTOR.length;
  const highlightStart = connectorStart + connectorLen + 1;

  const glowAnimate = prefersReducedMotion
    ? { scale: 1, opacity: 0.7 }
    : { scale: [1, 1.05, 1], opacity: [0.5, 0.85, 0.5] };

  const gradientAnimate = prefersReducedMotion
    ? { backgroundPosition: "0% 50%" }
    : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] };

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 80% 8%, rgba(162,123,92,0.18) 0%, rgba(162,123,92,0) 65%), linear-gradient(180deg, rgba(252,247,239,0) 0%, #fef2db 100%)",
        }}
      />

      <Container className="pt-10 md:pt-16 pb-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow>One POS to Power Your F&amp;B</Eyebrow>
          </motion.div>

          <h1
            aria-label={FULL_HEADLINE}
            className="mt-6 max-w-[1100px] text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.04] tracking-[-0.03em] font-medium"
          >
            <AnimatedChars text={HEADLINE_PREFIX} startIndex={0} />
            <br className="hidden sm:block" />
            <span className="inline-block">
              <AnimatedChars
                text={`${HEADLINE_CONNECTOR} `}
                startIndex={connectorStart}
              />
              <motion.span
                aria-hidden
                className="relative inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #6c523d 0%, #a27b5c 50%, #6c523d 100%)",
                  backgroundSize: "200% 100%",
                }}
                initial={{ backgroundPosition: "0% 50%" }}
                animate={gradientAnimate}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }
                }
              >
                <AnimatedChars
                  text={HEADLINE_HIGHLIGHT}
                  startIndex={highlightStart}
                />
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 max-w-xl text-base md:text-lg text-ink-muted"
          >
            One screen for the front, the kitchen, and the back office. Orders
            fire to the right station, stock deducts as you sell, and you close
            the day in three minutes — not three hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3"
          >
            <MagneticButton href="#pricing" variant="primary" size="lg">
              Start Free Trial
            </MagneticButton>
            <MagneticButton href="/contact" variant="secondary" size="lg">
              Book a Demo
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE_OUT_EXPO }}
          className="mt-14 md:mt-20"
        >
          <HeroTilt scrollTargetRef={sectionRef} className="mx-auto max-w-[1100px]">
            <div className="relative">
              <motion.div
                aria-hidden
                className="absolute -inset-x-10 -bottom-10 -top-6 -z-10 rounded-[40px] blur-2xl"
                style={{
                  background:
                    "radial-gradient(40% 50% at 50% 50%, rgba(162,123,92,0.35) 0%, rgba(162,123,92,0) 70%)",
                  willChange: "transform, opacity",
                }}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={glowAnimate}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }
                }
              />
              <div
                className="rounded-[32px] border-2 border-white p-3 md:p-5 shadow-[0_30px_80px_-30px_rgba(12,12,12,0.25)]"
                style={{
                  backgroundImage:
                    "linear-gradient(129deg, #e0d3c9 8%, #f2f2f2 105%)",
                }}
              >
                <div className="overflow-hidden rounded-[20px] bg-white">
                  <Image
                    src="https://udg4m9bnyz7haae7.public.blob.vercel-storage.com/figma-assets/hero-ipad-screen.png"
                    alt="Mise POS dashboard"
                    width={2732}
                    height={2048}
                    priority
                    unoptimized
                    className="block w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </HeroTilt>
        </motion.div>
      </Container>

      <div className="pt-16 md:pt-24">
        <LogoStrip />
      </div>
    </section>
  );
}
