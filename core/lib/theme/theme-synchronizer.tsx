import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import useUserPreferencesStore from '../stores/preferences.store';

export const ThemeSynchronizer = () => {
    const storeTheme = useUserPreferencesStore((state) => state.theme);

    const { setColorScheme } = useColorScheme();

    useEffect(() => {
        setColorScheme(storeTheme);
    }, [storeTheme, setColorScheme]);

    return null;
};