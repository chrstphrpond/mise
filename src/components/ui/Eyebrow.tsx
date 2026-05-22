import { cn } from "@/lib/utils";

/**
 * Canonical brand pill — matches Figma Tag style.
 * Used for section eyebrows ("Pricing", "Services") and inline feature tags.
 * variant=default → brown gradient + white text (Figma spec)
 * variant=dark   → translucent on dark backgrounds
 * variant=quiet  → small cream-cream with primary text (for in-card sub-eyebrows)
 */
export function Eyebrow({
  children,
  className,
  variant = "default",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "quiet";
  size?: "sm" | "md";
}) {
  const sizes = {
    sm: "px-3 py-0.5 text-[11px] tracking-[0.04em]",
    md: "px-4 py-1 text-sm tracking-[-0.32px]",
  };

  const variants = {
    default:
      "bg-gradient-to-r from-primary to-primary-70 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset]",
    dark: "bg-white/10 text-primary-10 ring-1 ring-white/15 backdrop-blur-sm",
    quiet:
      "bg-surface-cream text-primary-90 ring-1 ring-primary/15",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium leading-none whitespace-nowrap",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
