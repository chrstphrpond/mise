"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const infoBlocks = [
  {
    icon: Mail,
    title: "Email",
    description:
      "Drop us a note. A real person replies within 4 business hours, Sydney time.",
    value: "contact.imapos@arsakami.com",
    href: "mailto:contact.imapos@arsakami.com",
  },
  {
    icon: Phone,
    title: "Call the team",
    description:
      "Pick up the phone — weekdays 9am to 5pm AEST. Demo, pricing, hardware — we'll talk it through.",
    value: "1800 123 4567",
    href: "tel:18001234567",
  },
  {
    icon: MapPin,
    title: "Office",
    description: "Sydney HQ — stop by for a coffee and a live terminal walkthrough.",
    value: "Level 1, 12 Sample St, Sydney NSW 2000",
    href: null,
  },
] as const;

const businessTypes = [
  "Coffee Shop",
  "Restaurant",
  "Cloud Kitchen",
  "Multi Outlet Brand",
];

const locationOptions = ["1", "2-5", "6-10", "10+"];

const inputBase =
  "w-full h-12 rounded-xl bg-surface ring-1 ring-line px-4 text-[15px] text-ink placeholder:text-ink-muted/70 " +
  "transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-0";

const labelBase = "text-xs font-medium text-ink-muted";

export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState(businessTypes[0]);
  const [locations, setLocations] = useState(locationOptions[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          businessType,
          locations,
          message,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || data.ok === false) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setBusinessType(businessTypes[0]);
      setLocations(locationOptions[0]);
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-14">
          {/* Left: info column */}
          <div className="flex flex-col gap-8">
            {infoBlocks.map((block, i) => {
              const Icon = block.icon;
              return (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "200px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col gap-3"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-surface-cream text-primary ring-1 ring-primary/15">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-medium text-ink-title">
                    {block.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
                    {block.description}
                  </p>
                  {block.href ? (
                    <a
                      href={block.href}
                      className="text-sm font-medium text-primary hover:text-primary-70 transition-colors"
                    >
                      {block.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-ink-title">
                      {block.value}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-surface ring-1 ring-line p-6 md:p-10 shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_20px_60px_-30px_rgba(12,12,12,0.15)]"
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-ink-title">
              Tell us about your operation
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              A few details and we&apos;ll come back within 4 business hours with a tailored demo time.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className={labelBase}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className={inputBase}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className={labelBase}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className={inputBase}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className={labelBase}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={inputBase}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className={labelBase}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+61 400 000 000"
                    className={inputBase}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="businessType" className={labelBase}>
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className={cn(inputBase, "appearance-none pr-10 bg-no-repeat")}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2352525b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "16px 16px",
                    }}
                  >
                    {businessTypes.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="locations" className={labelBase}>
                    Number of Locations
                  </label>
                  <select
                    id="locations"
                    name="locations"
                    value={locations}
                    onChange={(e) => setLocations(e.target.value)}
                    className={cn(inputBase, "appearance-none pr-10 bg-no-repeat")}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2352525b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "16px 16px",
                    }}
                  >
                    {locationOptions.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className={labelBase}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What does your operation look like today, and what's the one thing you'd fix first? (Concept, outlets, current POS, hardware — anything helps.)"
                  className={cn(
                    inputBase,
                    "h-auto py-3 resize-y leading-relaxed",
                  )}
                />
              </div>

              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === "sending"}
                  className="sm:self-start"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </Button>

                {status === "success" ? (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-primary font-medium"
                  >
                    Got it — Maria from the team will reply within 4 business hours.
                  </motion.span>
                ) : null}

                {status === "error" ? (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 font-medium"
                  >
                    {errorMsg ?? "That didn't send — give it another shot, or email contact.imapos@arsakami.com directly."}
                  </motion.span>
                ) : null}
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
