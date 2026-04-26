import useUserPreferencesStore from '@/core/store/preferences.store';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';
import BackArrow from '../../ui/shared/back-arrow';

const ProfileHeader = ({ title }: { title: string }) => {
    const { isRTL } = useUserPreferencesStore()

    return (
        <LinearGradient
            className="justify-center items-center"
            colors={["#FAED02", "#FFFFFF"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
        >
            <View style={{ direction: isRTL ? "rtl" : 'ltr' }} className='mt-12 flex flex-row items-center px-4 mb-8'>
                <BackArrow />
                <View className='flex-1 items-center -ms-6'>
                    <Text className='font-inter-semibold text-xl text-center text-black dark:text-white'>{title}</Text>
                </View>
            </View>
        </LinearGradient>
    );
};

export default ProfileHeader;