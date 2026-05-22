"use client";

import { Container } from "@/components/ui/Container";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { BrandLogo, brands, type BrandKey } from "@/components/visuals/Brands";

const brandKeys = Object.keys(brands) as BrandKey[];

export function LogoStrip() {
  return (
    <Container>
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        Trusted by F&amp;B brands across Asia-Pacific
      </p>

      <div className="mx-auto mt-6 h-px max-w-md bg-ink/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

      <div className="mt-6 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <InfiniteSlider gap={64} duration={40} durationOnHover={80}>
          {brandKeys.map((key) => (
            <div
              key={key}
              className="opacity-70 transition duration-300 hover:opacity-100"
            >
              <BrandLogo brand={key} size="md" />
            </div>
          ))}
        </InfiniteSlider>
      </div>

      <div className="mx-auto mt-6 h-px max-w-md bg-ink/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
    </Container>
  );
}
