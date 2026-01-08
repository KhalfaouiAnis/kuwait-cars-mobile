import { queryClient } from "@/core/api/react-query";
import { ACC_TOKEN_STORAGE_KEY, AUTH_STORAGE_KEY } from "@/core/constants";
import { User } from "@/core/types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "../api/httpClient";
import { storage, zustandStorage } from "./storage";

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
          const accessToken = storage.getString(ACC_TOKEN_STORAGE_KEY);
          if (!accessToken) {
            set({ isReady: true, user: null, isGuest: false });
            return;
          }

          const decoded = jwtDecode<{ exp: number }>(accessToken);
          const currentTime = Date.now() / 1000;

          if (decoded.exp > currentTime) {
            set({ isReady: true });
          } else {
            httpClient
              .get("/auth/me")
              .then(({ data }) => set({ user: data, isReady: true }));
          }
        } catch {
          authStore.getState().signOut();
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
          isGuest: false,
          isReady: true,
        });
        queryClient.clear();
      },
      createGuestSesssion: () => {
        set({
          user: null,
          isGuest: true,
        });
      },
      setOtpTargetTime: (seconds) => {
        const targetTime = seconds ? Date.now() + seconds * 1000 : null;
        set({ otpTargetTime: targetTime });
      },
      setHasHydrated: () => set({ _hasHydrated: true, }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        authType: state.authType,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    }
  )
);

export const authStore = useAuthStore;

export default useAuthStore;
