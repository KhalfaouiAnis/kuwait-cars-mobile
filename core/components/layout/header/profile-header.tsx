import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const ProfileHeader = ({ title }: { title: string }) => {
    const onBack = () => {
        router.canGoBack() && router.back()
    }

    return (
        <View className='mt-1 flex flex-row items-center justify-center px-4 mb-2'>
            <Pressable onPress={onBack}>
                <Ionicons name='chevron-back' size={22} />
            </Pressable>
            <View className='w-full items-center justify-center'>
                <Text className='font-inter-bold text-2xl text-center'>{title}</Text>
            </View>
        </View>
    );
};

export default ProfileHeader;