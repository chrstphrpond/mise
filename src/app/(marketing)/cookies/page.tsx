import { InfoPageHero } from "@/components/sections/InfoPageHero";
import { InfoPageBody } from "@/components/sections/InfoPageBody";

export const metadata = {
  title: "Cookies",
  description: "What cookies Mise uses and how to control them.",
};

export default function CookiesPage() {
  return (
    <>
      <InfoPageHero
        eyebrow="Legal"
        title="Cookies & Tracking"
        description="Mise keeps cookies to a minimum. Here is exactly what we set, why, and how you can opt out."
      />
      <InfoPageBody
        lastUpdated="01 May 2026"
        blocks={[
          {
            heading: "Strictly necessary",
            body: (
              <p>
                Session cookies that keep you logged into the back office and
                preserve your CSRF token. These cannot be disabled — without
                them the dashboard does not work.
              </p>
            ),
          },
          {
            heading: "Product analytics",
            body: (
              <p>
                A first-party analytics cookie that lets us see which features
                operators reach for, on a per-account basis. No third-party
                ad networks, no fingerprinting, no cross-site tracking.
              </p>
            ),
          },
          {
            heading: "Marketing",
            body: (
              <p>
                On mise.app we use a single conversion cookie to measure
                whether demo requests originated from a paid campaign. You can
                disable it in the banner shown on your first visit, or via the
                browser&apos;s Do Not Track signal — we honour it.
              </p>
            ),
          },
          {
            heading: "Change your mind",
            body: (
              <p>
                Email privacy@mise.app or clear your browser cookies and we
                will re-prompt on next visit.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
