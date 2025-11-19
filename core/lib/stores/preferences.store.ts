import { USER_PREFERENCES_STORAGE_KEY } from "@/core/constants";
import i18n from "@/core/i18n/i18n";
import { LanguageCode } from "@/core/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

interface UserPreferencesState {
  lang: LanguageCode;
  isI18NLoading: boolean;
  setLang: (newLang: LanguageCode) => void;
  setI18NLoading: (loading: boolean) => void;
}

const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set, get) => ({
      lang: "en", // Default
      isI18NLoading: false,
      setLang: (newLang) => {
        set({ lang: newLang });
        i18n.changeLanguage(newLang);
      },
      setI18NLoading: (loading) => set({ isI18NLoading: loading }),
    }),
    {
      name: USER_PREFERENCES_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ lang: state.lang }),
    }
  )
);

export default useUserPreferencesStore;

export const currentLang = () => useUserPreferencesStore.getState().lang;

i18n.on("loading", () => {
  useUserPreferencesStore.getState().setI18NLoading(true);
});

i18n.on("loaded", () => {
  useUserPreferencesStore.getState().setI18NLoading(false);
});