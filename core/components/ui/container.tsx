import { PropsWithChildren } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = ({ children, backgroundColor }: PropsWithChildren<{ backgroundColor?: string }>) => {
    const { bottom } = useSafeAreaInsets()
    return <SafeAreaView edges={['top', 'left', 'right']} className='flex-1 pb-8' style={{ paddingBottom: bottom, }}>{children}</SafeAreaView>;
};

export default Container;
