import { RTL_LANGUAGES, USER_PREFERENCES_STORAGE_KEY } from "@/core/constants";
// import i18n from "@/core/i18n/i18n";
import { LanguageCode, ThemeType } from "@/core/types";
import i18n from "i18next";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

interface UserPreferencesState {
  lang: LanguageCode;
  isI18nReady: boolean;
  theme: ThemeType;
  isRTL: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
  setLang: (newLang: LanguageCode) => void;
  setI18NReady: (ready: boolean) => void;
}

const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      lang: "ar",
      theme: "light",
      isI18nReady: false,
      isRTL: false,
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        }));
      },
      setTheme: (newTheme) => set({ theme: newTheme }),
      setLang: (newLang) => {
        set({ lang: newLang, isRTL: RTL_LANGUAGES.includes(newLang) });
        i18n.changeLanguage(newLang);
      },
      setI18NReady: (ready) => set({ isI18nReady: ready }),
    }),
    {
      name: USER_PREFERENCES_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        lang: state.lang,
        isRTL: state.isRTL,
        theme: state.theme,
      }),
    }
  )
);

export const preferencesStore = useUserPreferencesStore;
export default useUserPreferencesStore;

export const currentLang = () => preferencesStore?.getState().lang;
