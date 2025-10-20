import useAuthStore from "@/core/lib/stores/auth.store";
import { Providers } from "@/core/providers";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const { _hasHydrated, } = useAuthStore();

  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  if (!_hasHydrated) {
    return null;
  }

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </Providers>
  )
}
