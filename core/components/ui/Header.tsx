import useUserPreferencesStore from '@/core/lib/stores/preferences.store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

type Props = {
    title: string,
    headerAction?: {
        name: keyof typeof Ionicons.glyphMap,
        onPress: () => void
    }
};

const Header = ({ title, headerAction }: Props) => {
    const { theme, isRTL } = useUserPreferencesStore()
    const onBack = () => {
        router.canGoBack() && router.back()
    }

    return (
        <View className='mb-4 flex flex-row items-center justify-between px-2 '>
            <View className='flex flex-row items-center justify-center'>
                <Pressable onPress={onBack}>
                    <Ionicons name={isRTL ? 'chevron-forward' : 'chevron-back'} size={24} color={theme !== "light" ? "white" : "black"} />
                </Pressable>
                <Text className='mx-2 text-center dark:text-white'>{title}</Text>
            </View>
            {
                headerAction && (
                    <Pressable onPress={headerAction.onPress} >
                        <Ionicons name={headerAction.name} size={24} color={theme !== "light" ? "white" : "black"} />
                    </Pressable>
                )
            }
        </View>
    );
};

export default Header;