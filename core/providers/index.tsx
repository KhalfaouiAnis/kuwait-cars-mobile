import theme from '@/core/lib/theme-config';
import { ThemeProvider } from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from "sonner-native";

import i18n from '../i18n/i18n';

export const Providers = ({ children }: PropsWithChildren) => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
            <I18nextProvider i18n={i18n}>
                <ThemeProvider value={theme}>
                    {children}
                </ThemeProvider>
            </I18nextProvider>
        </SafeAreaProvider>
        <Toaster />
    </GestureHandlerRootView>
)