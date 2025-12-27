import { Inter_Bold, Inter_Medium, Inter_Regular, Inter_SemiBold } from "@/assets/fonts";
import LanguageLoadingSpinner from "@/core/components/ui/spinner/language-loading";
import { ThemeSynchronizer } from "@/core/lib/theme/theme-synchronizer";
import { Providers } from "@/core/providers";
import useAuthStore from "@/core/store/auth.store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import useUserPreferencesStore from "@/core/store/preferences.store";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_Regular,
    InterMedium: Inter_Medium,
    InterSemiBold: Inter_SemiBold,
    InterBold: Inter_Bold,
  });

  const { _hasHydrated, bootstrapAsync } = useAuthStore();
  const { isI18nReady } = useUserPreferencesStore()

  useEffect(() => {
    bootstrapAsync()
  }, [bootstrapAsync]);

  useEffect(() => {
    if (fontsLoaded && _hasHydrated) {
      SplashScreen.hideAsync().then(() => {
        console.log("SplashScreen hidden now");
      });
    }
  }, [fontsLoaded, _hasHydrated]);

  if (!_hasHydrated || !fontsLoaded || !isI18nReady) {
    return null;
  }

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style={"auto"} />
      <ThemeSynchronizer />
      <LanguageLoadingSpinner />
    </Providers>
  )
}
