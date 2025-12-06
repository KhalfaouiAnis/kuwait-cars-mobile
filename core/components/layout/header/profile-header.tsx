import useUserPreferencesStore from '@/core/lib/stores/preferences.store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const ProfileHeader = ({ title }: { title: string }) => {
    const { theme } = useUserPreferencesStore()
    const onBack = () => router.canGoBack() && router.back()

    return (
        <View className='mt-1 flex flex-row items-center justify-center px-4 mb-2 '>
            <Pressable onPress={onBack}>
                <Ionicons name='chevron-back' size={22} color={theme !== "light" ? "white" : "black"} />
            </Pressable>
            <View className='w-full items-center justify-center'>
                <Text className='font-inter-bold text-2xl text-center text-black dark:text-white'>{title}</Text>
            </View>
        </View>
    );
};

export default ProfileHeader;