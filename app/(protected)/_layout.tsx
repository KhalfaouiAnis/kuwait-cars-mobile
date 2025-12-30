import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";

import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
    const { isRTL } = useUserPreferencesStore()
    const { isAuthenticated, _hasHydrated } = useAuthStore();

    if (_hasHydrated && !isAuthenticated) {
        return <Redirect href="/signin" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="(profile)"
                options={{
                    animation: isRTL ? 'slide_from_right' : 'slide_from_left',
                    animationDuration: 200,
                    gestureEnabled: false,
                }}
            />
        </Stack>
    )
}
