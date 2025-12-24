import { Text, View } from 'react-native';
import BackArrow from '../../ui/shared/back-arrow';

const ChatHeader = ({ username, phone }: { username: string, phone: string }) => {
    return (
        <View className='mt-1 flex flex-row items-center justify-center px-4 mb-2 border-b border-primary-500'>
            <BackArrow />
            <View className='w-full items-center justify-center'>
                <Text className='font-inter-semibold text-2xl text-center dark:text-white'>{username}</Text>
                <Text className='font-inter text-lg text-center dark:text-white'>{phone}</Text>
            </View>
        </View>
    );
};

export default ChatHeader;