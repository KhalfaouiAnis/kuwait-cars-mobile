import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, TextInput, View } from 'react-native';

const MainHeader = ({ drawer = false, back = true }: { drawer?: boolean, back?: boolean }) => {
    const onBack = () => {
        router.canGoBack() && router.back()
    }

    const openProfile = () => {
        router.push("/profile")
    }

    return (
        <View className='mt-1 h-16 flex-row items-center justify-center mx-2'>
            {
                back && (
                    <Pressable onPress={onBack}>
                        <Ionicons name='chevron-back' size={22} />
                    </Pressable>
                )
            }
            {
                drawer && (
                    <Pressable onPress={openProfile}>
                        <MaterialIcons name="sort" size={24} color="black" />
                    </Pressable>
                )
            }
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
            <View className='ms-2'>
                <MaterialCommunityIcons name="bell-ring-outline" size={24} color="black" />
            </View>
        </View>
    );
};

export default MainHeader;