import { hideSystemBars, showSystemBars } from '@/core/lib/navigation-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function ShowCarLayout() {
    useEffect(() => {
        hideSystemBars(false)
        return () => {
            showSystemBars()
        }
    }, [])

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}