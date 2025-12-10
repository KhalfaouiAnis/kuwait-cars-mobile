import AdTextInput from "@/core/components/ui/input/ad-text-input";
import AreaSelector from "@/core/components/ui/input/area-selector";
import ProvinceSelector from "@/core/components/ui/input/province-selector";
import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import TextAreaSpeech from "@/core/components/ui/input/text/text-area-speech";
import { PROVINCES } from "@/core/constants";
import { AdFormStepProps } from "@/core/types";
import { UsedCarAdInterface } from "@/core/types/schema/ads/usedCar";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useWatch } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import LocationPicker from "../../../layout/location/location-picker";
import { renderProvinceAreaOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";

export default function PostAd({ control, errors, isDark, getValue, setValue, setError }: AdFormStepProps<UsedCarAdInterface>) {
    const { model, brand } = useLocalSearchParams()
    const province = useWatch({ control, name: "province" })
    const Areas = province?.areas.map(area => ({ ...area, label: area.area })) || []

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 12, rowGap: 12 }}
        >
            <View className="mb-2">
                <View className="flex-row items-center justify-between">
                    <Text className="font-semibold mb-2 dark:text-white">WHAT ARE YOU SELLING?</Text>
                    <Text className="text-sm text-gray-300">Used Cars</Text>
                </View>
                <SelectedAdType
                    label={`${brand}-${model}`}
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
                />
            </View>
            <AdTextInput control={control} name="price" error={errors.price?.message} placeholder="Write Your Price"
                required label="Price" keyboardType="number-pad" extraPadding />
            <InputWithSpeech
                control={control}
                label="Description"
                name="title"
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
