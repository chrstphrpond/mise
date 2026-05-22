import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  size = "md",
}: {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center font-display font-bold tracking-tight",
        sizes[size],
        className,
      )}
      aria-label="Mise home"
    >
      <span className="lowercase tracking-tight">
        <span className="text-primary">m</span>
        <span className="text-ink-title">ise</span>
      </span>
    </Link>
  );
}
