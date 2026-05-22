import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.78-1.63 1.58v1.89h2.77l-.44 2.91h-2.33V22c4.78-.8 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}
function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21h-4V9z" />
    </svg>
  );
}
function Youtube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23 7.5s-.22-1.55-.9-2.23c-.86-.9-1.83-.9-2.27-.95C16.7 4.1 12 4.1 12 4.1s-4.7 0-7.83.22c-.44.05-1.41.05-2.27.95C1.22 5.95 1 7.5 1 7.5S.78 9.32.78 11.14v1.72C.78 14.68 1 16.5 1 16.5s.22 1.55.9 2.23c.86.9 1.99.87 2.49.97C6.18 19.9 12 20 12 20s4.7 0 7.83-.23c.44-.05 1.41-.05 2.27-.95.68-.68.9-2.23.9-2.23s.22-1.82.22-3.64v-1.72c0-1.82-.22-3.74-.22-3.74zM9.75 14.85V8.65l6.07 3.11-6.07 3.09z" />
    </svg>
  );
}

const quickLinks = [
  { href: "#solution", label: "Solution" },
  { href: "#services", label: "Service" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonial", label: "Testimonial" },
  { href: "#faq", label: "FAQ" },
];

const utilityLinks = [
  { href: "#", label: "Changelog" },
  { href: "#", label: "Status" },
  { href: "#", label: "Security" },
  { href: "#", label: "Integrations" },
  { href: "#", label: "Docs" },
];

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      className="relative isolate overflow-hidden text-ink"
      style={{
        backgroundImage:
          "radial-gradient(60% 60% at 80% 0%, rgba(162,123,92,0.18) 0%, rgba(162,123,92,0) 60%), radial-gradient(45% 60% at 8% 100%, rgba(63,78,79,0.18) 0%, rgba(63,78,79,0) 70%), linear-gradient(180deg, #fcf7ef 0%, #f3ece1 100%)",
      }}
    >
      <Container className="pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand + contact */}
          <div className="md:col-span-5">
            <Logo size="lg" />

            <div className="mt-8 space-y-5 text-sm text-ink-muted">
              <div>
                <p className="font-medium text-ink-title">Address:</p>
                <p className="mt-1">Level 1, 12 Sample St, Sydney NSW 2000</p>
              </div>
              <div>
                <p className="font-medium text-ink-title">Contact:</p>
                <p className="mt-1">1800 123 4567</p>
                <p>contact.imapos@arsakami.com</p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {[
                { href: "#", label: "Facebook", Icon: Facebook },
                { href: "#", label: "Instagram", Icon: Instagram },
                { href: "#", label: "X", Icon: XIcon },
                { href: "#", label: "LinkedIn", Icon: Linkedin },
                { href: "#", label: "YouTube", Icon: Youtube },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full text-ink hover:bg-ink/10 transition-colors"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-ink-title">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Utilities */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-ink-title">Utilities</h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              {utilityLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-ink-title">
              See Imapos on Your Menu
            </h4>
            <p className="mt-4 text-sm text-ink-muted">
              Book a 30-minute walkthrough. Bring your menu PDF — we&apos;ll
              mirror it on a live terminal during the call.
            </p>
            <Button href="/contact" variant="primary" size="md" className="mt-5">
              Book a Demo
            </Button>
          </div>
        </div>

        <div className="mt-16 border-t border-ink/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-ink-muted">
          <p>
            © {new Date().getFullYear()} Imapos Pty Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="underline underline-offset-2 hover:text-ink">
              Privacy Policy
            </a>
            <a href="#" className="underline underline-offset-2 hover:text-ink">
              Terms of Service
            </a>
            <a href="#" className="underline underline-offset-2 hover:text-ink">
              Cookies Settings
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
