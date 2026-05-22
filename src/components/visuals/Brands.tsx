import * as React from "react";

export type BrandKey =
  | "brewsmith"
  | "urban-plate"
  | "kopi-tumbuh"
  | "saji-house"
  | "nine-bites"
  | "penny-lane"
  | "salt-sage"
  | "wholegrain";

type IconProps = React.SVGProps<SVGSVGElement>;

/* ---------- Brand marks (geometric, max 3 paths each) ---------- */

const BrewsmithMark: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M5 6a6 6 0 0 1 12 0v12"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M19 18a6 6 0 0 1-12 0V6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const UrbanPlateMark: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 3v18M3 12h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const KopiTumbuhMark: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 22C7 17 7 9 12 2c5 7 5 15 0 20Z"
      fill="currentColor"
    />
    <path
      d="M12 22V8"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const SajiHouseMark: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 2 22 12 12 22 2 12 12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3.2" fill="currentColor" />
  </svg>
);

const NineBitesMark: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
    <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.55" />
    <rect x="3" y="13" width="18" height="8" rx="2" fill="currentColor" opacity="0.85" />
  </svg>
);

const PennyLaneMark: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="9" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="15" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const SaltSageMark: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 18c4-2 6-6 6-14 0 8 2 12 6 14"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="20" r="1.6" fill="currentColor" />
  </svg>
);

const WholegrainMark: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 3v18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 7c3 0 5 2 5 5M12 7c-3 0-5 2-5 5M12 13c3 0 5 2 5 5M12 13c-3 0-5 2-5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ---------- Brand registry ---------- */

export const brands: Record<
  BrandKey,
  { name: string; color: string; Icon: React.FC<IconProps> }
> = {
  brewsmith: { name: "Brewsmith", color: "#4b2e1f", Icon: BrewsmithMark },
  "urban-plate": { name: "Urban Plate", color: "#c4471c", Icon: UrbanPlateMark },
  "kopi-tumbuh": { name: "Kopi Tumbuh", color: "#3f7d49", Icon: KopiTumbuhMark },
  "saji-house": { name: "Saji House", color: "#d97706", Icon: SajiHouseMark },
  "nine-bites": { name: "Nine Bites", color: "#475569", Icon: NineBitesMark },
  "penny-lane": { name: "Penny Lane", color: "#be185d", Icon: PennyLaneMark },
  "salt-sage": { name: "Salt & Sage", color: "#65a30d", Icon: SaltSageMark },
  wholegrain: { name: "Wholegrain", color: "#b45309", Icon: WholegrainMark },
};

/* ---------- Logo composite ---------- */

type Size = "sm" | "md" | "lg";

const sizeMap: Record<
  Size,
  { icon: string; text: string; gap: string }
> = {
  sm: { icon: "size-4", text: "text-sm", gap: "gap-1.5" },
  md: { icon: "size-5", text: "text-lg", gap: "gap-2" },
  lg: { icon: "size-7", text: "text-2xl", gap: "gap-2.5" },
};

export function BrandLogo({
  brand,
  size = "md",
  muted = false,
  className,
}: {
  brand: BrandKey;
  size?: Size;
  muted?: boolean;
  className?: string;
}) {
  const { name, color, Icon } = brands[brand];
  const s = sizeMap[size];
  return (
    <span
      className={`inline-flex items-center ${s.gap} font-display font-medium tracking-tight ${className ?? ""}`}
      style={{ color: muted ? "currentColor" : color }}
    >
      <Icon className={`${s.icon} shrink-0`} />
      <span className={`${s.text} text-ink-title`}>{name}</span>
    </span>
  );
}
