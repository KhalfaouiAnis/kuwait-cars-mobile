import { ThemeProvider } from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from "sonner-native";

import { queryClient } from '@/core/api/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import i18n from '../i18n/i18n';
import { useNavigationTheme } from '../lib/theme/use-navigation-theme';
import useUserPreferencesStore from '../store/preferences.store';

export const Providers = ({ children }: PropsWithChildren) => {
    const theme = useNavigationTheme();
    const { isRTL } = useUserPreferencesStore()

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <I18nextProvider i18n={i18n}>
                    <ThemeProvider value={theme}>
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </ThemeProvider>
                </I18nextProvider>
            </SafeAreaProvider>
            <Toaster styles={{ toastContainer: { direction: isRTL ? "rtl" : "ltr" } }} />
        </GestureHandlerRootView>
    )
}