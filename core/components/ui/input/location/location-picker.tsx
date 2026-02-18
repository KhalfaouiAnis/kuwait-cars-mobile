import { StaticMapPreview } from '@/core/components/forms/ads/shared/static-map-preview';
import MapViewer from '@/core/components/layout/location/map-viewer';
import { DIMENSIONS } from '@/core/constants';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { boxShadow } from '@/core/utils/cn';
import { Ionicons, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { BaseTextInputProps } from '../..';

export default function LocationPicker({ label }: BaseTextInputProps<any>) {
    const { control } = useFormContext()
    const { t } = useTranslation("common");
    const { field: { onChange, value } } = useController({ control, name: "location" })
    const [showModal, setShowModal] = useState(false);
    const { isRTL, theme } = useUserPreferencesStore()
    function showMap() { setShowModal(true) }
    function hideMap() { setShowModal(false) }

    return (
        <>
            <View className="w-full" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <Pressable
                    onPress={showMap}
                    className="flex-row items-center self-center p-4 justify-between border-[0.5px] border-grayish rounded-3xl"
                    style={{
                        boxShadow: boxShadow().button.boxShadow,
                        width: DIMENSIONS.width - 60,
                        height: 60
                    }}
                >
                    <View className='flex-row gap-4 items-center'>
                        <Octicons name="location" size={20} color={theme !== "light" ? "white" : "black"} />
                        <Text
                            className={`${value?.latitude ? "text-[#333] dark:text-white overflow-hidden" : "text-gray-400"}`}
                            pointerEvents="none"
                        >
                            {value?.latitude ? Number(value.latitude).toFixed(5) : t(label || "location")}
                        </Text>
                    </View>
                    <View>
                        <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={20} color={theme !== "light" ? "white" : "black"} />
                    </View>
                </Pressable>
                <MapViewer
                    onClose={hideMap}
                    visible={showModal}
                    handleMapPress={(event) => {
                        onChange(event.nativeEvent.coordinate)
                    }}
                    currentLocation={value}
                />
            </View>
            {
                value && (
                    <View className="mt-4 px-2 w-full h-32 rounded-lg" pointerEvents="none">
                        <StaticMapPreview lat={value.latitude} lng={value.longitude} />
                    </View>
                )
            }
        </>
    );
}