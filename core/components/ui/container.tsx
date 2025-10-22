import { PropsWithChildren, ReactNode } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = ({ children, backgroundColor, header }: PropsWithChildren<{ backgroundColor?: string, header?: ReactNode }>) => {
    const { bottom } = useSafeAreaInsets()
    return <SafeAreaView edges={['top', 'left', 'right']} className='flex-1 pb-8' style={{ paddingBottom: bottom, backgroundColor }}>
        {header && header}
        {children}
    </SafeAreaView>;
};

export default Container;
