import { AUTH_STORAGE_KEY } from "@/core/constants";
import { User } from "@/core/types";
import { handleTokenValidation } from "@/core/utils/authUtils";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "signOut" | "signIn";
  _hasHydrated: boolean;
  isAuthenticated: boolean;
  setHasHydrated: (value: boolean) => void;
  hydrate: () => void;
  bootstrapAsync: () => Promise<void>;
  createAnonymousSesssion: (token: string) => void;
  setUser: (user: User | null) => void;
  signOut: () => void;
  signIn: (accessToken: string, refreshToken: string, user: User) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      _hasHydrated: false,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      status: "idle",
      bootstrapAsync: async () => {
        try {
          const { accessToken } = get();
          if (!accessToken) {
            set({ isAuthenticated: false });
            return;
          }

          // Decode to check expiry (local, fast)
          const decoded = jwtDecode<{ exp: number }>(accessToken);
          if (decoded.exp * 1000 < Date.now()) {
            // Try refresh (from your utils)
            const refreshed = await handleTokenValidation(); // Your function
            set({ isAuthenticated: refreshed });
          } else {
            set({ isAuthenticated: true });
          }
        } catch {
          set({ isAuthenticated: false });
        }
      },
      setUser: (user) => {
        set({ user });
      },
      signOut: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          status: "signOut",
        });
      },
      hydrate: () => {
        const { accessToken, refreshToken } = get();
        if (accessToken && refreshToken) {
          set({ status: "signIn" });
        } else {
          set({ accessToken: null, status: "signOut", user: null });
        }
      },
      signIn: (accessToken, refreshToken, user) => {
        set({ accessToken, refreshToken, user: user });
      },
      createAnonymousSesssion: (token: string) => {
        set({ accessToken: token, refreshToken: "" });
      },
      setHasHydrated: (value: boolean) => {
        set((state) => {
          return {
            ...state,
            _hasHydrated: value,
          };
        });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHasHydrated(true);
        };
      },
    }
  )
);

export default useAuthStore;

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const getRefreshToken = () => useAuthStore.getState().refreshToken;
export const getUserId = () => useAuthStore.getState().user?.id;
export const signOut = () => useAuthStore.getState().signOut();
// export const hydrateAuth = () => useAuthStore.getState().hydrate();
export const setAuthState = (newState: Partial<AuthState>) =>
  useAuthStore.setState((prevState) => ({ ...prevState, ...newState }));
export const getAuthState = () => useAuthStore.getState();
