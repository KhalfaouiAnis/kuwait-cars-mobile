import useUserPreferencesStore from '@/core/store/preferences.store';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

export const ThemeSynchronizer = () => {
    const storeTheme = useUserPreferencesStore((state) => state.theme);

    const { setColorScheme } = useColorScheme();

    useEffect(() => {
        setColorScheme(storeTheme);
    }, [storeTheme, setColorScheme]);

    return null;
};