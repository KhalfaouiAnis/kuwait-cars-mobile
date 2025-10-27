import { Stack } from "expo-router";

export default function ProtectedLayout() {
    // const { isAuthenticated } = useAuthStore();

    // if (!isAuthenticated) {
    //     return <Redirect href="/signin" />;
    // }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="(profile)"
                options={{
                    animation: 'slide_from_left',
                    animationDuration: 200,
                    gestureEnabled: false,
                }}
            />
        </Stack>
    )
}
