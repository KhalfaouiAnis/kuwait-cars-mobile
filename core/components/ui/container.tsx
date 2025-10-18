import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = ({ children, backgroundColor }: PropsWithChildren<{ backgroundColor?: string }>) => {
    return <SafeAreaView className='flex-1 bg-white'>{children}</SafeAreaView>;
};

export default Container;
