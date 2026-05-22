import { InfoPageHero } from "@/components/sections/InfoPageHero";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Docs",
  description:
    "Operator handbook and API reference for Mise. Get a new outlet live in a weekend.",
};

type DocSection = {
  title: string;
  description: string;
  items: { label: string; blurb: string }[];
};

const sections: DocSection[] = [
  {
    title: "Get started",
    description:
      "Open a new outlet on Mise — from menu import to first close-out.",
    items: [
      {
        label: "Outlet setup in a weekend",
        blurb:
          "Menu import, printer pairing, staff onboarding, and your first end-of-day in under 48 hours.",
      },
      {
        label: "Hardware sizing guide",
        blurb:
          "Pick terminals, printers, and KDS screens for cafes, dining rooms, and cloud kitchens.",
      },
      {
        label: "Offline mode",
        blurb:
          "What happens when the internet drops, and how sync resolves once you reconnect.",
      },
    ],
  },
  {
    title: "Operating Mise",
    description: "Daily workflows for the front, the kitchen, and the back office.",
    items: [
      {
        label: "Service playbook",
        blurb:
          "Open, fire, comp, void, split, close. Every flow with the keyboard shortcut.",
      },
      {
        label: "Inventory and recipes",
        blurb:
          "Wire ingredients to menu items so every shot deducts what it should.",
      },
      {
        label: "Multi-outlet reporting",
        blurb:
          "Group P&L, branch drill-down, and the leaderboard view managers actually read.",
      },
    ],
  },
  {
    title: "Developer",
    description:
      "REST API, webhooks, and SDKs for building on top of Mise (Enterprise).",
    items: [
      {
        label: "Authentication",
        blurb: "OAuth2 client credentials and scoped API keys.",
      },
      {
        label: "Orders API",
        blurb: "Create, modify, void, and reconcile orders programmatically.",
      },
      {
        label: "Webhooks",
        blurb: "Subscribe to sale, void, 86, and end-of-day events.",
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <InfoPageHero
        eyebrow="Documentation"
        title={<>Everything you need to run Mise</>}
        description="An operator handbook plus an API reference for developers. Most cafes get to first sale on the day the docs land in their inbox."
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col gap-14">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-ink-title">
                  {s.title}
                </h2>
                <p className="mt-2 text-ink-muted max-w-2xl">{s.description}</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {s.items.map((item) => (
                    <article
                      key={item.label}
                      className="rounded-2xl bg-surface ring-1 ring-line p-6 hover:ring-primary/30 transition"
                    >
                      <p className="font-medium text-ink-title">{item.label}</p>
                      <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                        {item.blurb}
                      </p>
                      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-primary">
                        Coming soon
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
