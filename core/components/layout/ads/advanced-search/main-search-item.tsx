import { FilterField } from '@/core/configuration/filters';
import { DIMENSIONS } from '@/core/constants';
import { boxShadow } from '@/core/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import DynamicIcon from './dynamic-icon';

type SearchItemProps = {
    family: "AntDesign" | "Ionicons" | "MaterialCommunityIcons" | "Octicons";
    onPress: () => void;
    isDark?: boolean
    isRTL?: boolean
    label: string;
    icon?: string,
    field: FilterField,
    config: any
}

const SearchItem = memo(({ label, icon, family, isDark, isRTL, field, config }: SearchItemProps) => (
    <Pressable
        style={{
            height: 48,
            width: DIMENSIONS.width - 80,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            boxShadow: boxShadow().button.boxShadow
        }}
        className="w-full items-center"
    >
        <View className='items-center me-4 ms-4'>
            <DynamicIcon family={family} icon={icon} color={isDark ? "white" : "black"} />
        </View>
        <View>
            <Text className='dark:text-white font-inter'>{label}</Text>
        </View>
        <View className='ms-auto'>
            <Ionicons color={isDark ? "white" : "black"} size={20} name={isRTL ? 'chevron-back' : 'chevron-forward'} />
        </View>
    </Pressable>
));

SearchItem.displayName = "SearchItem"
export default SearchItem