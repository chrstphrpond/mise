"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const infoBlocks = [
  {
    icon: Mail,
    title: "Email",
    description:
      "Send us your questions about Mise features, pricing, or product setup. A real person replies within 4 business hours.",
    value: "hello@mise.app",
    href: "mailto:hello@mise.app",
  },
  {
    icon: Phone,
    title: "Call Our Team",
    description:
      "Prefer to talk directly? Our team is available weekdays 9am–5pm AEST to help you understand how Mise fits your business.",
    value: "1800 123 4567",
    href: "tel:18001234567",
  },
  {
    icon: MapPin,
    title: "Office",
    description:
      "Visit our office or reach out to discuss how Mise can support your restaurant operations.",
    value: "Level 1, 12 Sample St, Sydney NSW 2000 AU",
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

// Figma uses underline-only inputs: clean field with border-bottom that thickens on focus.
const fieldWrap = "group flex flex-col gap-3 md:gap-4 pb-4 border-b border-line transition-colors focus-within:border-ink-title";
const fieldLabel =
  "text-[17px] md:text-[20px] leading-[1.5] tracking-[-0.01em] text-ink-title font-normal";
const fieldInput =
  "w-full bg-transparent text-[17px] md:text-[20px] leading-[1.5] text-ink placeholder:text-ink-muted/80 outline-none border-0 p-0";

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
    <section
      className="pb-20 md:pb-28"
      aria-labelledby="contact-form-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12 lg:gap-20 items-start">
          {/* Left: info column */}
          <div className="flex flex-col gap-10 md:gap-12">
            {infoBlocks.map((block, i) => {
              const Icon = block.icon;
              return (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col gap-5"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-surface-cream text-primary ring-1 ring-primary/15">
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-2xl md:text-[28px] lg:text-[32px] leading-tight tracking-[-0.02em] font-medium text-ink-title">
                    {block.title}
                  </h3>
                  <p className="text-[15px] md:text-base text-ink-muted leading-relaxed">
                    {block.description}
                  </p>
                  {block.href ? (
                    <a
                      href={block.href}
                      className="text-[15px] md:text-base font-medium text-ink-title hover:text-primary transition-colors break-words"
                    >
                      {block.value}
                    </a>
                  ) : (
                    <span className="text-[15px] md:text-base font-medium text-ink-title">
                      {block.value}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right: heading + form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-10 md:gap-12"
          >
            <h2
              id="contact-form-heading"
              className="text-[32px] md:text-[40px] lg:text-5xl leading-tight tracking-[-0.02em] font-medium text-ink-title"
            >
              Get In Touch
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={fieldWrap}>
                  <label htmlFor="firstName" className={fieldLabel}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Type your full name"
                    className={fieldInput}
                  />
                </div>
                <div className={fieldWrap}>
                  <label htmlFor="lastName" className={fieldLabel}>
                    Business Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter business name"
                    className={fieldInput}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={fieldWrap}>
                  <label htmlFor="email" className={fieldLabel}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className={fieldInput}
                  />
                </div>
                <div className={fieldWrap}>
                  <label htmlFor="phone" className={fieldLabel}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className={fieldInput}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={fieldWrap}>
                  <label htmlFor="businessType" className={fieldLabel}>
                    Business Type
                  </label>
                  <div className="relative">
                    <select
                      id="businessType"
                      name="businessType"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className={cn(fieldInput, "appearance-none pr-8 cursor-pointer")}
                    >
                      {businessTypes.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden
                      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 size-5 text-ink-muted"
                      strokeWidth={1.75}
                    />
                  </div>
                </div>
                <div className={fieldWrap}>
                  <label htmlFor="locations" className={fieldLabel}>
                    Number of Locations
                  </label>
                  <div className="relative">
                    <select
                      id="locations"
                      name="locations"
                      value={locations}
                      onChange={(e) => setLocations(e.target.value)}
                      className={cn(fieldInput, "appearance-none pr-8 cursor-pointer")}
                    >
                      {locationOptions.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden
                      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 size-5 text-ink-muted"
                      strokeWidth={1.75}
                    />
                  </div>
                </div>
              </div>

              <div className={fieldWrap}>
                <label htmlFor="message" className={fieldLabel}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your business or what you'd like to learn about Mise."
                  className={cn(fieldInput, "resize-y leading-relaxed min-h-[96px]")}
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

                <div
                  className="text-sm font-medium"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {status === "success" ? (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-primary"
                    >
                      Got it — Maria from the team will reply within 4 business hours.
                    </motion.span>
                  ) : null}
                  {status === "error" ? (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600"
                    >
                      {errorMsg ??
                        "That didn't send — give it another shot, or email hello@mise.app directly."}
                    </motion.span>
                  ) : null}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
