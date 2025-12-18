import useUserPreferencesStore from "@/core/lib/stores/preferences.store";
import { Stack } from "expo-router";

export default function ProfileLayout() {
    const { isRTL } = useUserPreferencesStore()

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' },
                animation: isRTL ? 'slide_from_right' : 'slide_from_left',
            }}
        />
    )
}