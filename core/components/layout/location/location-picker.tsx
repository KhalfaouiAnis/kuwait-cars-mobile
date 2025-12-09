import { AdFormStepProps } from '@/core/types';
import { Ionicons, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import MapViewer from './map-viewer';

export default function LocationPicker({ getValue, setValue, isDark }: AdFormStepProps<any>) {
    const [showModal, setShowModal] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(getValue?.("location"))

    function showMap() { setShowModal(true) }
    function hideMap() { setShowModal(false) }

    console.log(currentLocation);
    

    return (
        <View className="w-full">
            <Pressable onPress={showMap} className='flex-row p-4 items-center justify-between elevation-sm border-transparent border dark:border-primary-500 dark:bg-darkish'>
                <View className='flex-row gap-2 items-center'>
                    <Octicons className='ms-2' name="location" size={20} color={isDark ? "white" : "black"} />
                    <Text
                        className="text-[#333] overflow-hidden"
                        pointerEvents="none"
                    >
                        {currentLocation?.latitude ? Number(currentLocation.latitude).toFixed(5) : "Location"}
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
                    console.log(event.nativeEvent.coordinate);
                    setCurrentLocation(event.nativeEvent.coordinate)
                    setValue?.("location", event.nativeEvent.coordinate)
                }}
                currentLocation={currentLocation}
            />
        </View>
    );
}
