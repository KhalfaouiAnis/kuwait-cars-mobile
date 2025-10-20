import theme from '@/core/lib/theme-config';
import { ThemeProvider } from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const Providers = ({ children }: PropsWithChildren) => (
    <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
            <ThemeProvider value={theme}>
                {children}
            </ThemeProvider>
        </SafeAreaProvider>
    </GestureHandlerRootView>
)