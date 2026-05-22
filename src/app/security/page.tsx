import { InfoPageHero } from "@/components/sections/InfoPageHero";
import { InfoPageBody } from "@/components/sections/InfoPageBody";

export const metadata = {
  title: "Security",
  description:
    "How Imapos protects operator and customer data — infrastructure, access controls, and compliance.",
};

export default function SecurityPage() {
  return (
    <>
      <InfoPageHero
        eyebrow="Security"
        title={<>Security at Imapos</>}
        description="The short version: payment data never touches our servers, and operator data is encrypted at rest in Sydney. The long version is below."
      />
      <InfoPageBody
        blocks={[
          {
            heading: "Infrastructure",
            body: (
              <p>
                Imapos runs on AWS ap-southeast-2 (Sydney) with multi-AZ
                redundancy. Application and database tiers are isolated in
                private subnets behind a VPC; only the load balancer is
                publicly addressable. Daily encrypted backups are held in
                ap-southeast-4 (Melbourne) with a 30-day retention window.
              </p>
            ),
          },
          {
            heading: "Payments",
            body: (
              <p>
                Card data never touches Imapos servers. We tokenise via
                Stripe, Square, and Adyen — all PCI DSS Level 1 service
                providers. Imapos itself is PCI DSS SAQ-A scoped, with annual
                attestation available on request under NDA.
              </p>
            ),
          },
          {
            heading: "Encryption",
            body: (
              <p>
                All traffic is TLS 1.3 in transit. Databases are encrypted at
                rest with AES-256 and AWS KMS-managed keys, rotated annually.
                Backups are encrypted with separate keys.
              </p>
            ),
          },
          {
            heading: "Access controls",
            body: (
              <p>
                Operators are role-based by default — cashier, manager, owner,
                franchise admin. Two-factor authentication is required for
                owner accounts and enforced for staff with refund or void
                privileges. Imapos engineers use short-lived SSO credentials
                with audit logging for every production action.
              </p>
            ),
          },
          {
            heading: "Compliance",
            body: (
              <p>
                We are aligned to ISO 27001 controls and undergo annual
                third-party penetration testing. SOC 2 Type II is on the
                roadmap for the next calendar year — happy to share the
                interim attestation letter under NDA.
              </p>
            ),
          },
          {
            heading: "Report a vulnerability",
            body: (
              <p>
                Email security@imapos.com with details. We acknowledge within
                24 hours and operate a responsible-disclosure program with
                bounty rewards for valid reports — no legal action against
                good-faith researchers.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
