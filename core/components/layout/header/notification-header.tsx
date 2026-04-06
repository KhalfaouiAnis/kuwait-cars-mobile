import useUserPreferencesStore from '@/core/store/preferences.store';
import { boxShadow } from '@/core/utils/cn';
import { Text, View } from 'react-native';
import BackArrow from '../../ui/shared/back-arrow';

const NotificationHeader = ({ title, unreadCount }: { title: string, unreadCount: number }) => {
    const { isRTL } = useUserPreferencesStore()

    return (
        <View style={{ direction: isRTL ? "rtl" : 'ltr' }} className='mt-2 flex flex-row items-center px-4 mb-8'>
            <BackArrow />
            <View className='flex-1 items-center -ms-6 flex-row gap-1.5 justify-center'>
                <Text className='font-inter-bold text-2xl text-center text-blue dark:text-[#00A6DA]'>{title}</Text>
                <View
                    style={{ ...boxShadow().button }}
                    className="bg-[#FF123D] rounded-full h-5 w-5 flex items-center justify-center"
                >
                    <Text className="text-white text-center text-[11px] font-bold">
                        {unreadCount}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default NotificationHeader;