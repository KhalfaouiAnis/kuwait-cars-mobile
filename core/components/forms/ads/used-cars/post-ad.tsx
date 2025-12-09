import AdTextInput from "@/core/components/ui/input/ad-text-input";
import ProvinceSelector from "@/core/components/ui/input/province-selector";
import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import TextAreaSpeech from "@/core/components/ui/input/text/text-area-speech";
import ZipCodeInput from "@/core/components/ui/input/zip-code-input";
import { CITIES } from "@/core/constants";
import { AdFormStepProps } from "@/core/types";
import { UsedCarAdInterface } from "@/core/types/schema/ads/usedCar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import LocationPicker from "../../../layout/location/location-picker";
import { renderProvinceOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";

export default function PostAd({ control, errors, isDark, getValue, setValue, setError }: AdFormStepProps<UsedCarAdInterface>) {
    const { model, brand } = useLocalSearchParams()
    console.log({ model, brand });

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
                <Text className="font-semibold mb-2 dark:text-white">WHERE IS YOUR LISTING?</Text>
                <ProvinceSelector
                    control={control}
                    name="province"
                    required
                    isDark={isDark}
                    options={CITIES}
                    renderOption={(option, selected) => renderProvinceOption(option, selected as string)}
                    placeholder="Province"
                />
                <View className="flex-row items-center justify-center gap-x-2 my-4">
                    <View className="flex-1">
                        <LocationPicker
                            control={control}
                            getValue={getValue}
                            setValue={setValue}
                            errors={errors}
                            isDark={isDark}
                        />
                    </View>
                    <Text className="dark:text-white">or</Text>
                    <View className="flex-1">
                        <ZipCodeInput
                            name="zip_code"
                            setError={setError}
                            control={control}
                            keyboardType="number-pad"
                            placeholder="Zip code"
                            error={errors.zip_code?.root?.message}
                            icon={<MaterialCommunityIcons name="email-seal-outline" size={24} color={isDark ? "white" : "black"}
                                className="mt-2" />}
                        />
                    </View>
                </View>
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
