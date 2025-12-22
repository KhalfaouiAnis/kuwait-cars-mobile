import useUserPreferencesStore from '@/core/store/preferences.store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const ChatHeader = ({ username, phone }: { username: string, phone: string }) => {
    const { theme, isRTL  } = useUserPreferencesStore()

    const onBack = () => {
        router.canGoBack() && router.back()
    }

    return (
        <View className='mt-1 flex flex-row items-center justify-center px-4 mb-2 border-b border-primary-500'>
            <Pressable onPress={onBack}>
                <Ionicons name={isRTL ? 'chevron-forward' : 'chevron-back'} size={22} color={theme !== "light" ? "white" : "black"} />
            </Pressable>
            <View className='w-full items-center justify-center'>
                <Text className='font-inter-semibold text-2xl text-center dark:text-white'>{username}</Text>
                <Text className='font-inter text-lg text-center dark:text-white'>{phone}</Text>
            </View>
        </View>
    );
};

export default ChatHeader;