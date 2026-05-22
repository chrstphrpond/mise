import { Hero } from "@/components/sections/Hero";
import { Solution } from "@/components/sections/Solution";
import { Services } from "@/components/sections/Services";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonial } from "@/components/sections/Testimonial";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Solution />
      <Services />
      <Features />
      <Pricing />
      <Testimonial />
      <Stats />
      <FAQ />
    </>
  );
}
