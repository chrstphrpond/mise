import Link from "next/link";
import { Button } from "@/components/ui/Button";

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.78-1.63 1.58v1.89h2.77l-.44 2.91h-2.33V22c4.78-.8 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}
function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
  { href: "#", label: "License" },
  { href: "#", label: "Style Guide" },
  { href: "#", label: "Password Protected" },
  { href: "/404", label: "404" },
  { href: "/changelog", label: "Changelog" },
];

const socials = [
  { href: "https://www.facebook.com/getmise", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/getmise", label: "Instagram", Icon: Instagram },
  { href: "https://x.com/getmise", label: "X", Icon: XIcon },
  { href: "https://www.linkedin.com/company/getmise", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.youtube.com/@getmise", label: "YouTube", Icon: Youtube },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-surface-cream text-ink">
      {/* Radial color blur decoration matching Figma bg-color-blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-[40%] -z-0 h-[744px] w-full"
        style={{
          background:
            "radial-gradient(40% 70% at 65% 50%, rgba(162,123,92,0.22) 0%, rgba(162,123,92,0) 60%), radial-gradient(35% 60% at 30% 80%, rgba(63,78,79,0.18) 0%, rgba(63,78,79,0) 65%), radial-gradient(30% 50% at 50% 100%, rgba(217,220,220,0.55) 0%, rgba(217,220,220,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 py-20 md:px-10 lg:gap-16 lg:px-16">
        {/* Main content row */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Brand + contact column */}
          <div className="flex-1 flex flex-col gap-8 min-w-0">
            <Link
              href="/"
              aria-label="Mise home"
              className="inline-flex items-center font-display font-bold tracking-tight"
            >
              <span className="text-[40px] leading-[1.2] lowercase tracking-tight">
                <span className="text-primary">m</span>
                <span className="text-secondary">ise</span>
              </span>
            </Link>

            <div className="flex flex-col gap-6 text-ink">
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium tracking-[-0.32px]">Address:</p>
                <p className="text-sm">Level 1, 12 Sample St, Sydney NSW 2000</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium tracking-[-0.32px]">Contact:</p>
                <p className="text-sm">1800 123 4567</p>
                <p className="text-sm">hello@mise.app</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Mise on ${label}`}
                  className="inline-flex size-6 items-center justify-center text-ink hover:text-primary transition-colors"
                >
                  <Icon className="size-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Links column (Quick Links + Utilities side-by-side) */}
          <div className="flex-1 flex flex-col gap-8 sm:flex-row sm:gap-8 min-w-0">
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <p className="text-base font-medium tracking-[-0.32px] text-ink">
                Quick Links
              </p>
              <ul className="flex flex-col">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="block py-2 text-sm text-ink hover:text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <p className="text-base font-medium tracking-[-0.32px] text-ink">
                Utilities
              </p>
              <ul className="flex flex-col">
                {utilityLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="block py-2 text-sm text-ink hover:text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter / CTA column */}
          <div className="flex flex-col gap-6 lg:w-[400px] lg:shrink-0">
            <div className="flex flex-col gap-4 text-ink">
              <p className="text-base font-medium tracking-[-0.32px]">
                Connect With Us Today
              </p>
              <p className="text-base tracking-[-0.32px]">
                Let&apos;s discuss your next project, connect with our team
                today for tailored solutions.
              </p>
            </div>
            <Button href="/contact" variant="primary" size="md" className="self-start">
              Schedule a Call
            </Button>
          </div>
        </div>

        {/* Credits row */}
        <div className="flex flex-col gap-8">
          <div className="h-px w-full bg-ink/10" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink">
              © Designer by{" "}
              <Link
                href="/"
                className="underline underline-offset-2 decoration-from-font hover:text-primary"
              >
                Arsakami
              </Link>
              , Powered by{" "}
              <a
                href="https://webflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-from-font hover:text-primary"
              >
                Webflow
              </a>
              . All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="underline underline-offset-2 decoration-from-font text-ink hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="underline underline-offset-2 decoration-from-font text-ink hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="underline underline-offset-2 decoration-from-font text-ink hover:text-primary"
              >
                Cookies Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
