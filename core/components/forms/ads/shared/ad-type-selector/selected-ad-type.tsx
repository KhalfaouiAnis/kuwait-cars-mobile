import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SelectedAdTypeProps {
    label: string,
    icon: ReactNode
}

export default function SelectedAdType({ label, icon }: SelectedAdTypeProps) {
    return (
        <View className='flex-row items-center gap-2 p-3 border-[#A8A8A8] dark:bg-darkish dark:border-primary-500'
            style={styles.button}
        >
            <View className='items-center justify-center'>
                {icon}
            </View>
            <Text className={"text-gray-400 dark:text-gray-100"}>
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        boxShadow: [
            {
                offsetX: 2,
                offsetY: 2,
                blurRadius: 6,
                spreadDistance: 2,
                color: 'rgb(000 000 000 / 0.25)',
            },
            {
                offsetX: -1,
                offsetY: 0,
                blurRadius: 0,
                spreadDistance: 0,
                color: 'rgb(000 000 000 / 0.25)',
            },
        ],
    }
});