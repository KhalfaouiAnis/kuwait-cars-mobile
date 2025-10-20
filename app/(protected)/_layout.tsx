import { Stack } from "expo-router";

export default function ProtectedLayout() {
    // const { isAuthenticated } = useAuthStore();

    // if (!isAuthenticated) {
    //     return <Redirect href="/signin" />;
    // }

    return (
        <Stack screenOptions={{ headerShown: false }} />
    )
}
