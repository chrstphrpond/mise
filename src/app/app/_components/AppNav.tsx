"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ClipboardList, LayoutGrid, BarChart3 } from "lucide-react";

const items = [
  { href: "/app/today", label: "Today", icon: BarChart3 },
  { href: "/app/orders", label: "Orders", icon: ClipboardList },
  { href: "/app/menu", label: "Menu", icon: LayoutGrid },
];

export function AppNav() {
  const pathname = usePathname();
  return (
    <nav className="mt-5 flex flex-col gap-1">
      {items.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href || (pathname?.startsWith(href + "/") ?? false);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-full px-3.5 py-2 text-sm transition-colors",
              active
                ? "bg-primary text-white shadow-[0_8px_24px_-12px_rgba(162,123,92,0.6)]"
                : "text-ink-muted hover:bg-surface-cream hover:text-ink",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
