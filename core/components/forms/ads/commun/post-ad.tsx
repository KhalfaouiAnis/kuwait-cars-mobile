import AdTextInput from "@/core/components/ui/input/ad-text-input";
import AreaSelector from "@/core/components/ui/input/area-selector";
import ProvinceSelector from "@/core/components/ui/input/province-selector";
import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import TextAreaSpeech from "@/core/components/ui/input/text/text-area-speech";
import { PROVINCES } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdFormStepProps } from "@/core/types";
import { CommunAdInterface } from "@/core/types/schema/ads/commun";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import LocationPicker from "../../../layout/location/location-picker";
import { renderProvinceAreaOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";
import { StaticMapPreview } from "../shared/static-map-preview";

export default function PostAd({ control, errors, isDark, setValue }: AdFormStepProps<CommunAdInterface>) {
    const { label, ad_type, ad_category } = useLocalSearchParams()
    const { isRTL } = useUserPreferencesStore()
    const { t } = useTranslation("common")

    const province = useWatch({ control, name: "province" })
    const Areas = PROVINCES.find(prov => prov.province === province?.province)?.areas || []

    console.log({ ad_type, ad_category });


    useEffect(() => {
        setValue?.("ad_type", ad_type as string)
        setValue?.("ad_category", ad_category as string)
    }, [ad_type, ad_category, setValue])

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            contentContainerStyle={{ paddingBottom: 10, rowGap: 12 }}
        >
            <View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-semibold mb-2 dark:text-white">{t("createAd.whatAreYouSelling")}</Text>
                    <Text className="text-sm text-gray-300">{t(`adCategories.${ad_type as string}`)}</Text>
                </View>
                <SelectedAdType
                    label={label as string}
                    icon={<Ionicons name="car-sport-outline" color="gray" size={20} />}
                />
            </View>
            <View>
                <Text className="font-semibold dark:text-white mb-1">{t("createAd.WhereIsYourListing")}</Text>
                <ProvinceSelector
                    control={control}
                    name="province"
                    required
                    options={PROVINCES}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder={t("yourProvince")}
                />
            </View>
            <View className="mt-4">
                <AreaSelector
                    control={control}
                    name="area"
                    options={Areas}
                    renderOption={(option, selected) => renderProvinceAreaOption(option, selected)}
                    placeholder={t("area")}
                />
                <View><Text className="text-center text-grayish my-1">{t("or")}</Text></View>
                <LocationPicker
                    control={control}
                    errors={errors}
                    isDark={isDark}
                    setValue={setValue}
                    label={t("location")}
                />
            </View>
            {province?.latitude &&
                (<View className="my-2 w-full h-32 rounded-lg" pointerEvents="none">
                    <StaticMapPreview lat={province.latitude} lng={province.longitude} />
                </View>)
            }
            <AdTextInput
                control={control}
                name="price"
                error={errors.price?.message}
                placeholder={t("createAd.WriteYourPrice")}
                extraPadding
                required
                label={t("createAd.Price")}
                keyboardType="number-pad"
            />
            <InputWithSpeech
                control={control}
                label={t("createAd.Title")}
                name="title"
                required
                maxLength={30}
                error={errors.title?.message}
                placeholder={t("createAd.WriteYourAdvertisementTitle")} />
            <TextAreaSpeech
                control={control}
                label={t("description")}
                name="description"
                maxLength={500}
                required
                error={errors.description?.message}
                placeholder={t("createAd.WriteYourAdvertisementDescription")}
            />
        </ScrollView>
    )
}
