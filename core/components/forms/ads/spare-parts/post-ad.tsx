import AdTextInput from "@/core/components/ui/input/ad-text-input";
import AreaSelector from "@/core/components/ui/input/area-selector";
import ProvinceSelector from "@/core/components/ui/input/province-selector";
import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import TextAreaSpeech from "@/core/components/ui/input/text/text-area-speech";
import { PROVINCES } from "@/core/constants";
import { AdFormStepProps } from "@/core/types";
import { SparePartAdInterface } from "@/core/types/schema/ads/sparePart";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import LocationPicker from "../../../layout/location/location-picker";
import { renderProvinceAreaOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";
import { StaticMapPreview } from "../shared/static-map-preview";

export default function PostAd({ control, setValue, errors, isDark, t }: AdFormStepProps<SparePartAdInterface>) {
    const { ad_type } = useLocalSearchParams()

    const province = useWatch({ control, name: "province" })
    const Areas = PROVINCES.find(prov => prov.province === province?.province)?.areas || []

    useEffect(() => { setValue?.("ad_type", ad_type as string) }, [ad_type, setValue])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 10, rowGap: 8 }}
        >
            <View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-semibold mb-2">WHAT ARE YOU SELLING?</Text>
                    <Text className="text-sm text-gray-300">Used Cars</Text>
                </View>
                <SelectedAdType
                    label={`Spare parts`}
                    icon={<Ionicons name="car-sport-outline" color="gray" size={20} />}
                />
            </View>
            <View>
                <Text className="font-semibold dark:text-white mb-1">WHERE IS YOUR LISTING?</Text>
                <ProvinceSelector
                    control={control}
                    name="province"
                    required
                    isDark={isDark}
                    options={PROVINCES}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder="Province"
                />
            </View>
            <View className="mt-4">
                <AreaSelector
                    control={control}
                    name="area"
                    isDark={isDark}
                    options={Areas}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder="Area"
                />
                <View><Text className="text-center text-grayish my-1">Or</Text></View>
                <LocationPicker
                    control={control}
                    errors={errors}
                    isDark={isDark}
                    setValue={setValue}
                    t={t}
                />
            </View>
            {province?.latitude &&
                (<View className="my-2 w-full h-32 rounded-lg" pointerEvents="none">
                    <StaticMapPreview latitude={province.latitude} longitude={province.longitude} />
                </View>)
            }
            <AdTextInput control={control} name="price" error={errors.price?.message} placeholder="Write Your Price"
                required label="Price" keyboardType="number-pad" />
            <InputWithSpeech
                control={control}
                name="title"
                label="Title"
                required
                maxLength={30}
                error={errors.title?.message}
                placeholder="Write Your Advertisement Title" />
            <TextAreaSpeech
                control={control}
                label="Description"
                name="description"
                maxLength={500}
                required
                error={errors.description?.message}
                placeholder="Write Your Advertisement Description"
            />
        </ScrollView>
    )
}
