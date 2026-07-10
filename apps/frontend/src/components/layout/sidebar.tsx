"use client";

import {
  Clock,
  Flame,
  Heart,
  Home,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/ui-store";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/search?q=action", label: "Trending", icon: TrendingUp },
  { href: "/search?q=new", label: "Recent", icon: Clock },
  { href: "/search?q=popular", label: "Popular", icon: Flame },
] as const;

const SECONDARY_ITEMS = [
  { href: "/history", label: "History", icon: Clock, disabled: true },
  { href: "/favorites", label: "Favorites", icon: Heart, disabled: true },
  { href: "/settings", label: "Settings", icon: Settings, disabled: true },
] as const;

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4 lg:hidden">
        <span className="text-sm font-semibold text-muted-foreground">Navigation</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Browse
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        <Separator className="my-4" />

        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Library
        </p>
        {SECONDARY_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <span
              key={item.href}
              className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground/50"
              title="Coming soon"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </span>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3">
          <Sparkles className="h-4 w-4 text-accent" />
          <p className="text-xs text-muted-foreground">
            Self-hosted anime streaming for your homelab.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-background/95 backdrop-blur-xl transition-transform lg:static lg:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <SidebarContent />
      </aside>

      {sidebarOpen ? (
        <div className="fixed inset-0 z-20 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-border bg-background shadow-card">
            <div className="flex justify-end p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      ) : null}
    </>
  );
}
