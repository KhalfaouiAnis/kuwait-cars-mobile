import useUserPreferencesStore from '@/core/store/preferences.store';
import { AdFormStepProps } from '@/core/types';
import { boxShadow, cn } from '@/core/utils/cn';
import { Ionicons, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import MapViewer from './map-viewer';

type LocationPickerProps = AdFormStepProps<any> & {
    label: string
    primary?: boolean
}

export default function LocationPicker({ setValue, isDark, control, label, primary }: LocationPickerProps) {
    const { isRTL } = useUserPreferencesStore()
    const location = useWatch({ control, name: "location" })
    const [showModal, setShowModal] = useState(false);

    function showMap() { setShowModal(true) }
    function hideMap() { setShowModal(false) }

    return (
        <View className="w-full" style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <Pressable
                onPress={showMap}
                className={cn('flex-row items-center p-4 justify-between', {
                    "border-primary-500 rounded-lg border": primary,
                    "bordered-box": !primary
                })}
                style={primary ? undefined : boxShadow().button}
            >
                <View className='flex-row gap-2 items-center'>
                    <Octicons name="location" size={20} color={isDark ? "white" : "black"} />
                    <Text
                        className="text-[#333] dark:text-white overflow-hidden"
                        pointerEvents="none"
                    >
                        {location?.latitude ? Number(location.latitude).toFixed(5) : label}
                    </Text>
                </View>
                <View>
                    <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={20} color={isDark ? "white" : "black"} />
                </View>
            </Pressable>
            <MapViewer
                visible={showModal}
                onClose={hideMap}
                handleMapPress={(event) => {
                    setValue?.("location", event.nativeEvent.coordinate)
                }}
                currentLocation={location}
            />
        </View>
    );
}