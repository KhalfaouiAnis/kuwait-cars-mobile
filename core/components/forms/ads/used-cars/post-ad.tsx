import AdTextInput from "@/core/components/ui/input/ad-text-input";
import AreaSelect from "@/core/components/ui/input/select/area-selector";
import ProvinceSelect from "@/core/components/ui/input/select/province-select";
import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import TextAreaSpeech from "@/core/components/ui/input/text/text-area-speech";
import { PROVINCES } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdFormStepProps } from "@/core/types";
import { UsedCarAdInterface } from "@/core/types/schema/ads/usedCar";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import LocationPicker from "../../../layout/location/location-picker";
import { renderProvinceAreaOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";
import { StaticMapPreview } from "../shared/static-map-preview";

export default function PostAd({ control, errors, isDark, setValue }: AdFormStepProps<UsedCarAdInterface>) {
    const { model, brand } = useLocalSearchParams()
    const { t } = useTranslation("common")
    const { t: tBrands } = useTranslation("car_categories")
    const { isRTL } = useUserPreferencesStore()
    const province = useWatch({ control, name: "province" })
    const Areas = PROVINCES.find(prov => prov.province === province?.province)?.areas || []

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 12, rowGap: 12 }}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
        >
            <View className="mb-2">
                <View className="flex-row items-center justify-between">
                    <Text className="font-semibold mb-2 dark:text-white">{t("createAd.whatAreYouSelling")}</Text>
                    <Text className="text-sm text-gray-300">{t("adCategories.used_cars")}</Text>
                </View>
                <SelectedAdType
                    label={`${tBrands(brand)} - ${tBrands(model)}`}
                    icon={<Ionicons name="car-sport-outline" color="gray" size={20} />}
                />
            </View>
            <Text className="font-semibold dark:text-white">{t("createAd.WhereIsYourListing")}</Text>
            <View>
                <ProvinceSelect
                    control={control}
                    name="province"
                    required
                    options={PROVINCES}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder={t("yourProvince")}
                />
            </View>
            <View className="mt-4">
                <AreaSelect
                    control={control}
                    name="area"
                    options={Areas}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder={t("area")}
                />
                <Text className="text-center text-grayish my-2">{t("or")}</Text>
                <LocationPicker
                    control={control}
                    errors={errors}
                    isDark={isDark}
                    setValue={setValue}
                    label={t("location")}
                />
            </View>
            {province?.latitude &&
                (<View className="my-2 px-5 w-full h-32 rounded-lg" pointerEvents="none">
                    <StaticMapPreview lat={province.latitude} lng={province.longitude} />
                </View>)
            }
            <AdTextInput
                control={control}
                name="price"
                error={errors.price?.ref?.name}
                placeholder={t("createAd.WriteYourPrice")}
                required
                label={t("createAd.Price")}
                keyboardType="number-pad"
                extraPadding
            />
            <InputWithSpeech
                control={control}
                label={t("createAd.Title")}
                name="title"
                required
                maxLength={30}
                error={errors.title?.ref?.name}
                placeholder={t("createAd.WriteYourAdvertisementTitle")}
            />
            <TextAreaSpeech
                control={control}
                label={t("description")}
                name="description"
                maxLength={500}
                required
                error={errors.description?.ref?.name}
                placeholder={t("createAd.WriteYourAdvertisementDescription")}
            />
        </ScrollView>
    )
}
