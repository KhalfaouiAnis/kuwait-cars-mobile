import { AUTH_STORAGE_KEY } from "@/core/constants";
import { User } from "@/core/types";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "../api/httpClient";
import { zustandStorage } from "./storage";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  _hasHydrated: boolean;
  isAuthenticated: boolean;
  bootstrapAsync: () => Promise<void>;
  createAnonymousSesssion: (token: string) => void;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      _hasHydrated: false,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      bootstrapAsync: async () => {
        try {
          const { accessToken, refreshToken } = get();
          if (!accessToken || !refreshToken) {
            set({ isAuthenticated: false });
            return;
          }
          const decoded = jwtDecode<{ exp: number }>(accessToken);
          if (decoded.exp * 1000 < Date.now()) {
            const refreshed = await validateAndRefreshToken(get, set);
            if (!refreshed) {
              get().signOut();
              return;
            } else {
              set({ isAuthenticated: true });
            }
          }
        } catch {
          get().signOut();
        } finally {
          set({ _hasHydrated: true });
        }
      },
      setUser: (user) => {
        set({ user });
      },
      signOut: () => {
        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        });
      },
      createAnonymousSesssion: (token: string) => {
        set({ accessToken: token, refreshToken: "" });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const getRefreshToken = () => useAuthStore.getState().refreshToken;
export const getUserId = () => useAuthStore.getState().user?.id;
export const signOut = () => useAuthStore.getState().signOut();
export const setAuthState = (newState: Partial<AuthState>) =>
  useAuthStore.setState((prevState) => ({ ...prevState, ...newState }));
export const getAuthState = () => useAuthStore.getState();

const validateAndRefreshToken = async (
  get: () => AuthState,
  set: any
): Promise<boolean> => {
  const { refreshToken } = get();
  if (!refreshToken) return false;

  try {
    const { data } = await httpClient.post("/auth/refresh-token", {
      refreshToken,
    });

    const { accessToken: newToken } = data;
    set({ accessToken: newToken });
    return true;
  } catch {
    return false;
  }
};
