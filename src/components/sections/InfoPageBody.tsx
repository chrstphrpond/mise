import { Container } from "@/components/ui/Container";

export type InfoBlock = {
  heading: string;
  body: React.ReactNode;
};

export function InfoPageBody({
  intro,
  blocks,
  lastUpdated,
}: {
  intro?: React.ReactNode;
  blocks: InfoBlock[];
  lastUpdated?: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          {lastUpdated ? (
            <p className="text-xs uppercase tracking-wider text-ink-muted">
              Last updated · {lastUpdated}
            </p>
          ) : null}

          {intro ? (
            <div className="mt-6 text-base md:text-lg text-ink leading-relaxed">
              {intro}
            </div>
          ) : null}

          <div className="mt-10 flex flex-col gap-10">
            {blocks.map((b) => (
              <div key={b.heading}>
                <h2 className="text-xl md:text-2xl font-medium tracking-tight text-ink-title">
                  {b.heading}
                </h2>
                <div className="mt-3 text-ink-muted leading-relaxed space-y-3">
                  {b.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
