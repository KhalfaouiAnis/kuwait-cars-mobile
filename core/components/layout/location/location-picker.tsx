import { AdFormStepProps } from '@/core/types';
import { Ionicons, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import MapViewer from './map-viewer';

export default function LocationPicker({ getValue, setValue, isDark }: AdFormStepProps<any>) {
    const [showModal, setShowModal] = useState(false);

    function showMap() { setShowModal(true) }
    function hideMap() { setShowModal(false) }

    return (
        <View className="w-full">
            <Pressable onPress={showMap}>
                <View className='flex-row items-center justify-between elevation-sm border-transparent border dark:border-primary-500 dark:bg-darkish px-2 py-1'>
                    <View className='flex-row gap-2 items-center'>
                        <Octicons className='ms-2' name="location" size={20} color={isDark ? "white" : "black"} />
                        <TextInput
                            className="text-[#333] overflow-hidden flex-1"
                            readOnly={true}
                            placeholder='Location'
                            pointerEvents="none"
                            value={getValue?.("location.latitude")?.toString() || "Blah"}
                        />
                    </View>
                    <View>
                        <Ionicons name='chevron-forward' size={20} />
                    </View>
                </View>
            </Pressable>
            <MapViewer
                visible={showModal}
                onClose={hideMap}
                handleMapPress={(event) => { 
                    console.log(event.nativeEvent.coordinate);
                    setValue?.("location", event.nativeEvent.coordinate)
                 }}
                currentLocation={getValue?.("location")}
            />
        </View>
    );
}
