import { Stack } from 'expo-router';
import { setStatusBarHidden } from "expo-status-bar";
import { useEffect } from 'react';

export default function ShowCarLayout() {
    useEffect(() => {
        setStatusBarHidden(true, "none")

        return () => setStatusBarHidden(false, "none")
    }, [])

    return (
        <Stack
            screenOptions={{ headerShown: false }}
        />
    );
}