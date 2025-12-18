import useUserPreferencesStore from '@/core/lib/stores/preferences.store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const ProfileHeader = ({ title }: { title: string }) => {
    const { theme, isRTL } = useUserPreferencesStore()
    const onBack = () => router.canGoBack() && router.back()

    return (
        <View style={{direction: isRTL ? "rtl" : 'ltr'}} className='mt-1 flex flex-row items-center px-4 mb-2'>
            <Pressable onPress={onBack} className=''>
                <Ionicons name={isRTL ? 'chevron-forward' : 'chevron-back'} size={22} color={theme !== "light" ? "white" : "black"} />
            </Pressable>
            <View className='flex-1 items-center ms-2'>
                <Text className='font-inter-bold text-2xl text-center text-black dark:text-white'>{title}</Text>
            </View>
        </View>
    );
};

export default ProfileHeader;