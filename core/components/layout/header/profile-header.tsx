import useUserPreferencesStore from '@/core/store/preferences.store';
import { Text, View } from 'react-native';
import BackArrow from '../../ui/shared/back-arrow';

const ProfileHeader = ({ title }: { title: string }) => {
    const { isRTL } = useUserPreferencesStore()

    return (
        <View style={{ direction: isRTL ? "rtl" : 'ltr' }} className='mt-2 flex flex-row items-center px-4 mb-8'>
            <BackArrow />
            <View className='flex-1 items-center -ms-6'>
                <Text className='font-inter-bold text-2xl text-center text-black dark:text-white'>{title}</Text>
            </View>
        </View>
    );
};

export default ProfileHeader;