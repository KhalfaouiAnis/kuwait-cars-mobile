import { injectLogout } from "@/core/api/httpClient";
import LanguageLoadingSpinner from "@/core/components/ui/spinner/language-loading";
import { ThemeSynchronizer } from "@/core/lib/theme/theme-synchronizer";
import { Providers } from "@/core/providers";
import { useAppStore } from '@/core/store/app.store';
import useAuthStore, { authStore } from "@/core/store/auth.store";
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
  }, [loadFonts]);

  useEffect(() => {
    bootstrapAsync()
  }, [bootstrapAsync]);

  useEffect(() => {
    const hideSplash = async () => {
      if (isReady && fontsLoaded && isI18nReady) {
        requestAnimationFrame(async () => {
          await SplashScreen.hideAsync();
          console.log("Splash hidden cleanly");
        });
      }
    };

    hideSplash();
  }, [isReady, fontsLoaded, isI18nReady]);

  useEffect(() => {
    injectLogout(() => authStore?.getState().signOut());
  }, []);

  if (!isReady || !fontsLoaded || !isI18nReady) {
    return null
  }

  return (
    <Providers>
      <StatusBar />
      <ThemeSynchronizer />
      <LanguageLoadingSpinner />
      <Stack screenOptions={{ headerShown: false }} />
    </Providers>
  )
}
