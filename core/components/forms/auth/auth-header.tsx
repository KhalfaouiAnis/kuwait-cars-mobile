import LanguageSwitcher from '@/core/components/ui/menu/language-switcher';
import useUserPreferencesStore from '@/core/lib/stores/preferences.store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

const AuthHeader = () => {
    const { theme } = useUserPreferencesStore()
    const onBack = () => {
        router.canGoBack() && router.back()
    }

    return (
        <View className='mt-1 flex flex-row items-center justify-between px-4'>
            <Pressable onPress={onBack}>
                <Ionicons name='chevron-back' size={24} color={theme !== "light" ? "white" : "black"} />
            </Pressable>
            <LanguageSwitcher onLanguageChange={(code) => console.log('Switched to:', code)} />
        </View>
    );
};

export default AuthHeader;