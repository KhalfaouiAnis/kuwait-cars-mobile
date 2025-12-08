import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';

interface SelectedAdTypeProps {
    label: string,
    icon: ReactNode
}

export default function SelectedAdType({ label, icon }: SelectedAdTypeProps) {
    return (
        <View className='flex-row items-center gap-2 p-3 border border-transparent elevation-sm dark:bg-darkish dark:border-primary-500'>
            <View className='items-center justify-center'>
                {icon}
            </View>
            <Text className={"text-gray-400 dark:text-gray-100"}>
                {label}
            </Text>
        </View>
    );
}
