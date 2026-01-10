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
          const filtered = state.viewedIds.filter((item) => item !== id);
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
