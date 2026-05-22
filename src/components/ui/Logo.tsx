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
      aria-label="Imapos home"
    >
      <span className="text-primary">IMA</span>
      <span className="text-ink-title">POS</span>
    </Link>
  );
}
