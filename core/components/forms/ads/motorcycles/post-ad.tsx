import AdTextInput from "@/core/components/ui/input/ad-text-input";
import AreaSelector from "@/core/components/ui/input/area-selector";
import ProvinceSelector from "@/core/components/ui/input/province-selector";
import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import TextAreaSpeech from "@/core/components/ui/input/text/text-area-speech";
import { PROVINCES } from "@/core/constants";
import { AdFormStepProps } from "@/core/types";
import { MotorcycleAdInterface } from "@/core/types/schema/ads/motorcycle";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useWatch } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import LocationPicker from "../../../layout/location/location-picker";
import { renderProvinceAreaOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";

export default function PostAd({ control, errors, isDark, setValue, t }: AdFormStepProps<MotorcycleAdInterface>) {
    const { brand, ad_type } = useLocalSearchParams()
    const province = useWatch({ control, name: "province" })
    const Areas = province?.areas.map(area => ({ ...area, label: area.area })) || []

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 10, rowGap: 8 }}
        >
            <View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-semibold mb-2 dark:text-white">{t("whatAreYouSelling")}</Text>
                    <Text className="text-sm text-gray-300">{t("adCategories.motorcycles")}</Text>
                </View>
                <SelectedAdType
                    label={`${ad_type} - ${brand}`}
                    icon={<Ionicons name="car-sport-outline" color="gray" size={20} />}
                />
            </View>
            <View>
                <Text className="font-semibold dark:text-white mb-1">{t("WhereIsYourListing")}</Text>
                <ProvinceSelector
                    control={control}
                    name="province"
                    required
                    isDark={isDark}
                    options={PROVINCES}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder={t("YourProvince")}
                />
            </View>
            <View className="mt-4">
                <AreaSelector
                    control={control}
                    name="area"
                    isDark={isDark}
                    options={Areas}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder={t("Area")}
                />
                <View><Text className="text-center text-grayish my-1">{t("Or")}</Text></View>
                <LocationPicker
                    control={control}
                    errors={errors}
                    isDark={isDark}
                    setValue={setValue}
                    t={t}
                />
            </View>
            <AdTextInput
                control={control}
                name="price"
                error={errors.price?.message}
                placeholder={t("WriteYourPrice")}
                required
                label={t("Price")}
                keyboardType="number-pad"
                extraPadding
            />
            <InputWithSpeech
                control={control}
                label={t("Title")}
                name="title"
                required
                maxLength={30}
                error={errors.title?.message}
                placeholder={t("WriteYourAdvertisementTitle")}
            />
            <TextAreaSpeech
                control={control}
                label={t("Description")}
                name="description"
                maxLength={500}
                required
                error={errors.description?.message}
                placeholder={t("WriteYourAdvertisementDescription")}
            />
        </ScrollView>
    )
}
