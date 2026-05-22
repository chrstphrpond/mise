import { ContactHero } from "@/components/sections/ContactHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";

export const metadata = {
  title: "Contact — Imapos",
  description:
    "Talk to our team about how Imapos can power your F&B operations.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <FAQ />
    </>
  );
}
