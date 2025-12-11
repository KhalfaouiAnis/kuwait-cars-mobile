import { AdFormStepProps } from '@/core/types';
import { Ionicons, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import MapViewer from './map-viewer';

export default function LocationPicker({ setValue, isDark, control, t }: AdFormStepProps<any>) {
    const location = useWatch({ control, name: "location" })
    const [showModal, setShowModal] = useState(false);

    function showMap() { setShowModal(true) }
    function hideMap() { setShowModal(false) }

    return (
        <View className="w-full">
            <Pressable onPress={showMap} className='flex-row p-4 items-center justify-between elevation-sm border-transparent border dark:border-primary-500 dark:bg-darkish'>
                <View className='flex-row gap-2 items-center'>
                    <Octicons className='ms-2' name="location" size={20} color={isDark ? "white" : "black"} />
                    <Text
                        className="text-[#333] overflow-hidden"
                        pointerEvents="none"
                    >
                        {location?.latitude ? Number(location.latitude).toFixed(5) : t("Location")}
                    </Text>
                </View>
                <View>
                    <Ionicons name='chevron-forward' size={20} />
                </View>
            </Pressable>
            <MapViewer
                visible={showModal}
                onClose={hideMap}
                handleMapPress={(event) => {
                    setValue?.("location", event.nativeEvent.coordinate)
                    console.log(event.nativeEvent.coordinate);
                }}
                currentLocation={location}
            />
        </View>
    );
}
