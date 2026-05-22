import { InfoPageHero } from "@/components/sections/InfoPageHero";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Changelog",
  description:
    "What shipped, what changed, and what is rolling out next on Imapos.",
};

type Release = {
  version: string;
  date: string;
  tag: "Major" | "Minor" | "Fix";
  highlights: string[];
};

const releases: Release[] = [
  {
    version: "2.18",
    date: "08 May 2026",
    tag: "Minor",
    highlights: [
      "KDS station colours are now configurable per outlet.",
      "Split-bill flow halves taps on parties of four or more.",
      "Sync resumes faster after extended offline periods.",
    ],
  },
  {
    version: "2.17",
    date: "21 April 2026",
    tag: "Major",
    highlights: [
      "Multi-outlet group P&L with branch-level drill-down.",
      "Region-level roles for franchise operators.",
      "Aggregator integration with Uber Eats, DoorDash, and Menulog.",
    ],
  },
  {
    version: "2.16",
    date: "02 April 2026",
    tag: "Minor",
    highlights: [
      "Inventory recipe editor supports nested sub-recipes.",
      "Stripe Terminal SDK upgraded to 4.2.",
      "Closing report now exports as PDF in one click.",
    ],
  },
  {
    version: "2.15",
    date: "18 March 2026",
    tag: "Fix",
    highlights: [
      "Resolved void rate miscount when comps were applied after payment.",
      "Tip pool calculation now respects mid-shift role changes.",
      "Receipt printer driver compatibility for Star TSP143IV.",
    ],
  },
];

const tagStyles: Record<Release["tag"], string> = {
  Major: "bg-primary text-white",
  Minor: "bg-primary/10 text-primary-90 ring-1 ring-primary/20",
  Fix: "bg-surface-cream text-ink-title ring-1 ring-line",
};

export default function ChangelogPage() {
  return (
    <>
      <InfoPageHero
        eyebrow="Changelog"
        title={<>What we shipped this month</>}
        description="Imapos ships every two weeks. Notable changes land here; the boring ones go to the in-app release notes."
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl flex flex-col gap-10">
            {releases.map((r) => (
              <article
                key={r.version}
                className="rounded-3xl bg-surface ring-1 ring-line p-7 md:p-10"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-medium tracking-tight text-ink-title">
                    v{r.version}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${tagStyles[r.tag]}`}
                  >
                    {r.tag}
                  </span>
                  <span className="ml-auto text-xs text-ink-muted">
                    {r.date}
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5 text-sm text-ink leading-relaxed list-disc pl-5">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
