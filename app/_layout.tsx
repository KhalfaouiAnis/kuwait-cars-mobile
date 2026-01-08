import { injectLogout } from "@/core/api/httpClient";
import LanguageLoadingSpinner from "@/core/components/ui/spinner/language-loading";
import { ThemeSynchronizer } from "@/core/lib/theme/theme-synchronizer";
import { Providers } from "@/core/providers";
import { useAppStore } from '@/core/store/app.store';
import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isReady, bootstrapAsync } = useAuthStore();
  const { loadFonts, fontsLoaded } = useAppStore()
  const { isI18nReady } = useUserPreferencesStore()

  useEffect(() => {
    loadFonts()
    injectLogout(() => useAuthStore.getState().signOut());
  }, [loadFonts]);

  useEffect(() => {
    bootstrapAsync()
  }, [bootstrapAsync]);

  useEffect(() => {
    if (isReady && fontsLoaded) {
      SplashScreen.hideAsync().then(() => console.log("splash hidden"));
    }
  }, [isReady, fontsLoaded]);

  if (!isReady || !fontsLoaded || !isI18nReady) {
    return null;
  }

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar />
      <ThemeSynchronizer />
      <LanguageLoadingSpinner />
    </Providers>
  )
}
