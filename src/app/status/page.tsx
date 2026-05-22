import { InfoPageHero } from "@/components/sections/InfoPageHero";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Status",
  description:
    "Real-time status of Mise services — POS terminal, kitchen display, dashboard, and payments.",
};

type System = {
  name: string;
  description: string;
  status: "operational" | "degraded" | "outage";
};

const systems: System[] = [
  {
    name: "POS Terminal",
    description: "Order, table, and payment flow on iPad and Android.",
    status: "operational",
  },
  {
    name: "Kitchen Display System",
    description: "KDS routing and bump bars across stations.",
    status: "operational",
  },
  {
    name: "Back Office Dashboard",
    description: "Reports, inventory, and outlet management.",
    status: "operational",
  },
  {
    name: "Payments",
    description: "Card, QR, and BNPL acquiring integrations.",
    status: "operational",
  },
  {
    name: "Aggregator Sync",
    description: "Uber Eats, DoorDash, Menulog inbound orders.",
    status: "operational",
  },
];

const statusStyles: Record<System["status"], { label: string; cls: string }> = {
  operational: {
    label: "Operational",
    cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  degraded: {
    label: "Degraded",
    cls: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  outage: {
    label: "Outage",
    cls: "bg-red-50 text-red-700 ring-1 ring-red-200",
  },
};

export default function StatusPage() {
  const allGood = systems.every((s) => s.status === "operational");

  return (
    <>
      <InfoPageHero
        eyebrow="System Status"
        title={allGood ? "All systems operational" : "Some systems are reporting issues"}
        description="Live status of every Mise service. Subscribe to incident updates by email below."
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl bg-surface ring-1 ring-line overflow-hidden">
              {systems.map((s, i) => {
                const st = statusStyles[s.status];
                return (
                  <div
                    key={s.name}
                    className={`flex items-start gap-4 px-6 py-5 md:px-8 ${i > 0 ? "border-t border-line" : ""}`}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-ink-title">{s.name}</p>
                      <p className="mt-1 text-sm text-ink-muted">
                        {s.description}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${st.cls}`}
                    >
                      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-3xl bg-surface-cream ring-1 ring-primary/15 p-7 md:p-10 text-center">
              <h2 className="text-xl md:text-2xl font-medium tracking-tight text-ink-title">
                Get notified about incidents
              </h2>
              <p className="mt-3 text-sm text-ink-muted max-w-md mx-auto">
                Subscribe to email updates so your floor managers know about
                degradation before your customers do.
              </p>
              <a
                href="mailto:status@mise.app?subject=Subscribe%20to%20status%20updates"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-primary text-white px-6 h-11 text-[15px] font-medium hover:bg-primary-70 transition-colors"
              >
                Subscribe by email
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
