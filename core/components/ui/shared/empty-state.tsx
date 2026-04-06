import { IMAGES } from '@/core/constants/images';
import { Image } from 'expo-image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

interface Props {
    title?: string;
    description?: string;
}

export const EmptyState = ({
    title = "noResultsFound",
}: Props) => {
    const { t } = useTranslation("common")

    return (
        <View className='flex-1 items-center justify-center -mt-10'>
            <Image
                contentFit="cover"
                source={IMAGES.NoContent}
                style={{ width: 200, height: 200 }}
            />

            {title && (
                <Text className='text-base font-inter-semibold text-center mb-3 -mt-6 text-gray-900 dark:text-gray-200'>{t(`advancedSearch.${title}`)}</Text>
            )}
        </View>
    );
};
