import useAuthStore from "@/core/store/auth.store";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
    const { user, isGuest } = useAuthStore();

    if (user || isGuest) {
        return <Redirect href="/categories" />;
    }
    
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' }
            }}
        />
    )
}