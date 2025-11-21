import { AUTH_STORAGE_KEY } from "@/core/constants";
import { BaseAd, User } from "@/core/types";
import {
  handleTokenValidation,
  validateAndRefreshToken,
} from "@/core/utils/authUtils";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

interface AuthState {
  user: User | null;
  recentlyViewedAds: BaseAd[];
  accessToken: string | null;
  refreshToken: string | null;
  _hasHydrated: boolean;
  isAuthenticated: boolean;
  bootstrapAsync: () => Promise<void>;
  createAnonymousSesssion: (token: string) => void;
  setUser: (user: User | null) => void;
  addToRecentlyViewed: (ad: BaseAd) => void;
  clearRecentlyViewed: () => void;
  signOut: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      recentlyViewedAds: [
        {
          id: "ad1",
          category_id: "vehicles",
          created_at: "now",
          description: "ad description",
          location: { area: "aa", block: "bb", district: "dd" },
          plan: "pro",
          price: 123,
          subcategory_id: "mercedes",
          title: "Mercedes",
          year: 2019,
          viewed_at: new Date(),
          thumbnail: "https://placehold.co/600x400/png",
        },
      ],
      _hasHydrated: false,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      bootstrapAsync: async () => {
        await handleTokenValidation();
        try {
          const { accessToken, refreshToken, signOut } = get();
          if (!accessToken || !refreshToken) {
            signOut();
            return;
          }

          const decoded = jwtDecode<{ exp: number }>(accessToken);

          if (decoded.exp * 1000 < Date.now()) {
            const refreshed = await validateAndRefreshToken(refreshToken);
            if (!refreshed) {
              signOut();
              return;
            } else {
              set({ isAuthenticated: true });
            }
          } else {
            set({ isAuthenticated: true });
          }
        } catch {
          authStore.getState().signOut();
        } finally {
          set({ _hasHydrated: true });
        }
      },
      setUser: (user) => {
        set({ user });
      },
      addToRecentlyViewed: (newAd) => {
        const { recentlyViewedAds } = get();
        const filtered = recentlyViewedAds.filter((ad) => ad.id !== newAd.id);
        const updated = [newAd, ...filtered].slice(0, 5);
        set({ recentlyViewedAds: updated });
      },
      clearRecentlyViewed: () => set({ recentlyViewedAds: [] }),
      signOut: () => {
        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        });
      },
      createAnonymousSesssion: (token: string) => {
        set({ accessToken: token, refreshToken: "", isAuthenticated: true });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        recentlyViewedAds: state.recentlyViewedAds,
      }),
    }
  )
);

export const authStore = useAuthStore;
export const userId = authStore.getState().user?.id;

export default useAuthStore;
