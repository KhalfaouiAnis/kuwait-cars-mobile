import { AUTH_STORAGE_KEY } from "@/core/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

const MAX_RECENT = 5;

interface AuthState {
  viewedIds: string[];
  addView: (id: string) => void;
  clearHistory: () => void;
}

const useRecentlyViewedStore = create<AuthState>()(
  persist(
    (set) => ({
      viewedIds: [],
      addView: (id) =>
        set((state) => {
          // 1. Remove the ID if it already exists (to avoid duplicates)
          const filtered = state.viewedIds.filter((item) => item !== id);

          // 2. Add the new ID to the END (the 'latest' position)
          // 3. Keep only the latest 5 (slice from the end)
          return { viewedIds: [...filtered, id].slice(-MAX_RECENT) };
        }),

      clearHistory: () => set({ viewedIds: [] }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        viewedIds: state.viewedIds,
      }),
    }
  )
);

export default useRecentlyViewedStore;
