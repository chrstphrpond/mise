import { InfoPageHero } from "@/components/sections/InfoPageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Integrations",
  description:
    "Payments, aggregators, accounting, and hardware that Imapos talks to out of the box.",
};

type Integration = {
  name: string;
  blurb: string;
  category: string;
};

const integrations: Integration[] = [
  // Payments
  { name: "Stripe Terminal", blurb: "Card-present payments in AU, NZ, SG.", category: "Payments" },
  { name: "Square", blurb: "Reader and Terminal hardware support.", category: "Payments" },
  { name: "Adyen", blurb: "Enterprise card acquiring across APAC.", category: "Payments" },
  { name: "Tyro", blurb: "AU pay-at-table EFTPOS integration.", category: "Payments" },
  { name: "Afterpay", blurb: "BNPL at the till for eligible carts.", category: "Payments" },
  // Aggregators
  { name: "Uber Eats", blurb: "Inbound orders into KDS, menu sync out.", category: "Aggregators" },
  { name: "DoorDash", blurb: "Order ingest, 86 list mirroring.", category: "Aggregators" },
  { name: "Menulog", blurb: "Order ingest and rider handoff timestamps.", category: "Aggregators" },
  { name: "HungryHungry", blurb: "Direct-order kiosk and QR.", category: "Aggregators" },
  // Accounting
  { name: "Xero", blurb: "Daily sales journal, tax codes, payouts.", category: "Accounting" },
  { name: "MYOB", blurb: "Sales summary and inventory sync.", category: "Accounting" },
  { name: "QuickBooks", blurb: "Daily summary for AU and NZ entities.", category: "Accounting" },
  // Hardware
  { name: "Star TSP143IV", blurb: "Thermal kitchen and receipt printer.", category: "Hardware" },
  { name: "Epson TM-T88VII", blurb: "Network and Bluetooth printing.", category: "Hardware" },
  { name: "Zebra ZD420", blurb: "Label printer for labelled prep.", category: "Hardware" },
  { name: "Sunmi T2", blurb: "Android all-in-one POS terminal.", category: "Hardware" },
];

const categoryOrder = ["Payments", "Aggregators", "Accounting", "Hardware"] as const;

export default function IntegrationsPage() {
  return (
    <>
      <InfoPageHero
        eyebrow="Integrations"
        title={<>Plays nicely with what you already use</>}
        description="Payments, aggregators, accounting, and the hardware on your bench — Imapos talks to them out of the box."
      />
      <section className="py-16 md:py-24">
        <Container>
          {categoryOrder.map((cat) => (
            <div key={cat} className="mb-14 last:mb-0">
              <h2 className="text-xl md:text-2xl font-medium tracking-tight text-ink-title">
                {cat}
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations
                  .filter((i) => i.category === cat)
                  .map((i) => (
                    <div
                      key={i.name}
                      className="rounded-2xl bg-surface ring-1 ring-line p-5 hover:ring-primary/30 transition"
                    >
                      <p className="font-medium text-ink-title">{i.name}</p>
                      <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                        {i.blurb}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <div className="mt-4 rounded-3xl bg-primary text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                Don&apos;t see your stack?
              </h3>
              <p className="mt-2 text-primary-10/85 text-sm md:text-base max-w-xl">
                Enterprise plans ship with a REST API, webhooks, and a named
                solutions engineer to scope custom connectors.
              </p>
            </div>
            <Button href="/contact" variant="dark" size="lg">
              Talk to sales
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
