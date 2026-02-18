import { DIMENSIONS } from '@/core/constants';
import { boxShadow } from '@/core/utils/cn';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SelectedAdTypeProps {
    label: string,
    icon: ReactNode
}

export default function SelectedAdType({ label, icon }: SelectedAdTypeProps) {
    return (
        <View
            style={styles.wrapper}
            className='flex-row items-center self-center gap-2 ps-6  border-[0.5px] border-grayish'
        >
            <View className='items-center justify-center'>
                {icon}
            </View>
            <Text className="font-inter dark:text-gray-100">
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 45,
        borderRadius: 20,
        ...boxShadow().button,
        backgroundColor: "#D9D9D9",
        width: DIMENSIONS.width - 60,
    }
});
