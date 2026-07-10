import type { ProviderName } from "@anistream/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  sidebarOpen: boolean;
  provider: ProviderName;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setProvider: (provider: ProviderName) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      provider: "consumet",
      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },
      setProvider: (provider) => {
        set({ provider });
      },
    }),
    {
      name: "anistream-ui",
      partialize: (state) => ({ provider: state.provider }),
    },
  ),
);
