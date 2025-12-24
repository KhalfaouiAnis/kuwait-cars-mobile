import LanguageSwitcher from '@/core/components/ui/menu/language-switcher';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { router } from 'expo-router';
import { View } from 'react-native';
import BackArrow from '../../ui/shared/back-arrow';

const AuthHeader = () => {
    const { isRTL } = useUserPreferencesStore()

    const handleNavigate = () => {
        if (router.canGoBack()) {
            router.back()
        } else {
            router.push("/welcome")
        }
    }

    return (
        <View className={`mt-1 flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-center justify-between px-4`}>
            <BackArrow navigate={handleNavigate} />
            <LanguageSwitcher />
        </View>
    );
};

export default AuthHeader;