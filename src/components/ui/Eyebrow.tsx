import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium ring-1",
        variant === "default"
          ? "bg-surface-cream text-primary-90 ring-primary/20"
          : "bg-secondary-80 text-primary-10 ring-white/10",
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          variant === "default" ? "bg-primary" : "bg-primary-10",
        )}
      />
      {children}
    </span>
  );
}
