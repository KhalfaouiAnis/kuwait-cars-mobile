import { queryClient } from "@/core/api/react-query";
import { AUTH_STORAGE_KEY } from "@/core/constants";
import { User } from "@/core/types";
import {
  handleTokenValidation,
  validateAndRefreshToken,
} from "@/core/utils/authUtils";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  _hasHydrated: boolean;
  isAuthenticated: boolean;
  isGuest: boolean;
  authType: "STANDARD" | "GOOGLE" | "FACEBOOK" | "APPLE";
  otpTargetTime: number | null;

  setOtpTargetTime: (durationInSeconds: number | null) => void;
  bootstrapAsync: () => Promise<void>;
  createGuestSesssion: (token: string) => void;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      otpTargetTime: null,
      recentlyViewedAds: [],
      _hasHydrated: false,
      authType: "STANDARD",
      isAuthenticated: false,
      isGuest: false,
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
          const currentTime = Date.now() / 1000;

          if (decoded.exp > currentTime) {
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
      signOut: async () => {
        if (get().authType === "GOOGLE") {
          await GoogleSignin.signOut();
        }
        set({
          user: null,
          isAuthenticated: false,
          isGuest: false,
          accessToken: null,
          refreshToken: null,
        });
        queryClient.clear();
      },
      createGuestSesssion: (accessToken: string) => {
        set({
          accessToken,
          refreshToken: "",
          isAuthenticated: true,
          isGuest: true,
        });
      },
      setOtpTargetTime: (seconds) => {
        const targetTime = seconds ? Date.now() + seconds * 1000 : null;
        set({ otpTargetTime: targetTime });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        accessToken: state.accessToken,
        authType: state.authType,
        user: state.user,
      }),
    }
  )
);

export const authStore = useAuthStore;

export default useAuthStore;
