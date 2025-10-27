import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, TextInput, View } from 'react-native';

const MainHeader = () => {
    const onBack = () => {
        router.canGoBack() && router.back()
    }

    return (
        <View className='mt-1 h-16 flex-row items-center justify-center mx-2'>
            <Pressable onPress={onBack}>
                <Ionicons name='chevron-back' size={22} />
            </Pressable>
            <View className='flex-1 flex-row items-center justify-between rounded-xl border border-primary-500 px-2 ms-1'>
                <View className="flex-row items-center gap-x-2">
                    <Ionicons name="search-outline" size={24} color="black" />
                    <TextInput
                        placeholder="Search..."
                        className="min-w-28 max-w-52"
                        autoCapitalize="none"
                    />
                </View>
                <View className='flex-row gap-x-2'>
                    <Ionicons name="mic-outline" size={24} color="black" />
                    <Ionicons name="camera-outline" size={24} color="black" />
                </View>
            </View>
            <View className='ms-1'>
                <MaterialIcons name="notifications-active" size={24} color="black" />
            </View>
        </View>
    );
};

export default MainHeader;