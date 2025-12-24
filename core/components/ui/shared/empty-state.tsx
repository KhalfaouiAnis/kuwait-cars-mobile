// src/components/common/EmptyState.tsx
import useSearchStore from '@/core/store/search.store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    title?: string;
    description?: string;
    showReset?: boolean
}

export const EmptyState = ({
    title = "No results found",
    description = "Try adjusting your filters or search term to find what you're looking for.",
    showReset = true
}: Props) => {
    const resetAll = useSearchStore((state) => state.resetAll);

    return (
        <View className='flex-1 items-center justify-center p-10 mt-20'>
            <View className='rounded-full items-center justify-center mb-6 bg-gray-100 h-[120] w-[120]'>
                <MaterialCommunityIcons name="magnify-close" size={60} color="#94A3B8" />
            </View>

            <Text className='text-lg font-semibold text-center mb-3 text-gray-900'>{title}</Text>
            <Text className='text-center mb-8 text-gray-700'>{description}</Text>

            {
                showReset && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={resetAll}
                        activeOpacity={0.8}
                    >
                        <Text className='font-inter-semibold text-base text-white'>Clear all filters</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FAED02',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        shadowColor: '#FAED02',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
});
