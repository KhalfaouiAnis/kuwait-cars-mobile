import {
  Inter_Bold,
  Inter_Medium,
  Inter_Regular,
  Inter_SemiBold,
} from "@/assets/fonts";
import * as Font from "expo-font";
import { create } from "zustand";

interface AppState {
  fontsLoaded: boolean;
  loadFonts: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  fontsLoaded: false,
  loadFonts: async () => {
    try {
      const fontPromise = Font.loadAsync({
        InterRegular: Inter_Regular,
        InterMedium: Inter_Medium,
        InterSemiBold: Inter_SemiBold,
        InterBold: Inter_Bold,
      });

      await fontPromise;
    } catch (e) {
      console.error("App bootstrap failed", e);
    } finally {
      set({ fontsLoaded: true });
    }
  },
}));
