import LanguageSwitcher from '@/core/components/ui/menu/language-switcher';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

const AuthHeader = () => {
    const onBack = () => {
        router.canGoBack() && router.back()
    }

    return (
        <View className='mt-1 flex flex-row items-center justify-between px-4'>
            <Pressable onPress={onBack}>
                <Ionicons name='chevron-back' size={24} />
            </Pressable>
            <LanguageSwitcher onLanguageChange={(code) => console.log('Switched to:', code)} />
        </View>
    );
};

export default AuthHeader;