import { queryClient } from "@/core/api/react-query";
import { AUTH_STORAGE_KEY } from "@/core/constants";
import { User } from "@/core/types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "../api/httpClient";
import { TokenService } from "../services/token-manager";
import { zustandStorage } from "./storage";

interface AuthState {
  isReady: boolean;
  isGuest: boolean;
  user: User | null;
  _hasHydrated: boolean;
  otpTargetTime: number | null;
  authType: "STANDARD" | "GOOGLE" | "FACEBOOK" | "APPLE";

  setOtpTargetTime: (durationInSeconds: number | null) => void;
  createGuestSesssion: (token: string) => void;
  setUser: (user: User | null) => void;
  bootstrapAsync: () => Promise<void>;
  signOut: () => void;
  setHasHydrated: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      otpTargetTime: null,
      _hasHydrated: false,
      isReady: false,
      authType: "STANDARD",
      isGuest: false,
      bootstrapAsync: async () => {
        try {
          const accessToken = TokenService.getAccessToken();

          if (!accessToken) {
            set({ isReady: true, user: null, isGuest: false });
            return;
          }

          const decoded = jwtDecode<{ exp: number }>(accessToken);
          const currentTime = Date.now() / 1000;

          if (decoded.exp > currentTime) {
            if (!get().user) {
              const { data } = await httpClient.get("/users/details");
              set({ isReady: true, user: data, isGuest: false });
            } else {
              set({ isReady: true });
            }
          } else {
            httpClient
              .get("/users/details")
              .then(({ data }) =>
                set({ user: data, isReady: true, isGuest: false }),
              )
              .catch(() => get().signOut());
          }
        } catch {
          get().signOut();
        }
      },
      setUser: (user) => {
        set({ user });
      },
      signOut: async () => {
        if (get().authType === "GOOGLE") {
          await GoogleSignin.signOut();
        }
        TokenService.clearTokens();
        set({
          user: null,
          isGuest: false,
          authType: "STANDARD",
          isReady: true,
        });
        queryClient.clear();
      },
      createGuestSesssion: () => {
        set({
          user: null,
          isGuest: true,
          isReady: true,
        });
      },
      setOtpTargetTime: (seconds) => {
        const targetTime = seconds ? Date.now() + seconds * 1000 : null;
        set({ otpTargetTime: targetTime });
      },
      setHasHydrated: () => set({ _hasHydrated: true }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        authType: state.authType,
        user: state.user,
        isGuest: state.isGuest,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    },
  ),
);

export const authStore = useAuthStore;

export default useAuthStore;
