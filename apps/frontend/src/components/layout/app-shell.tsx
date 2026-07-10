"use client";

import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { useUiStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col transition-all",
          sidebarOpen ? "lg:ml-0" : "lg:ml-0",
        )}
      >
        <Navbar />
        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
