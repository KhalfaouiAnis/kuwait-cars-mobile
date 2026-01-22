import { IMAGES } from "@/core/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";

import { FavoriteButton } from "@/core/components/ui/button/favorite-button";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdvertisementInterface } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { getYear } from "date-fns";
import { useTranslation } from "react-i18next";
import { ChatCTA } from "../communication/ad-cta/chat";
import { ContactCTA } from "../communication/ad-cta/contact";
import { WhatsappCTA } from "../communication/ad-cta/whatsapp";
import AdSpecifications from "./ad-specifications";

export default function AdvertisementDetails({
  adDetail,
}: {
  adDetail: AdvertisementInterface;
}) {
  const { t } = useTranslation("common");
  const { isRTL, theme } = useUserPreferencesStore();

  const isDark = theme !== "light";

  const thumbnail = adDetail.media.find(
    (pic) => pic.media_type === "THUMBNAIL",
  )?.transformed_url;
  const images = adDetail.media.filter((pic) => pic.media_type === "IMAGE");

  return (
    <View className="flex-1 p-1" style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <View>
        <Image
          source={{ uri: thumbnail }}
          style={{ height: 260, objectFit: "cover", borderRadius: 8 }}
        />
        <View className="w-full rounded-lg flex-row gap-x-2 items-center justify-center mt-[2px] py-2">
          {images.slice(0, 2).map((image, index) => (
            <View
              key={index}
              className="p-2 rounded-lg bg-white dark:bg-black border border-primary-500"
            >
              <Image
                source={{ uri: image.transformed_url }}
                style={{
                  height: 70,
                  width: 90,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </View>
          ))}
        </View>
        <View className="px-4">
          <View className="gap-y-2 py-1">
            <Text className="font-inter-semibold dark:text-white">
              {adDetail.title}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="font-inter-medium text-lg dark:text-white">
                {adDetail.model || ""}
              </Text>
              <Text className="font-inter-semibold text-lg dark:text-white">
                ${adDetail.price || 0}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons
                name="location-outline"
                size={22}
                color={isDark ? "white" : "black"}
              />
              <Text className="font-inter text-base dark:text-white">
                {adDetail.province &&
                  (adDetail.area
                    ? t(`areas.${adDetail.area.area}`)
                    : t(`provinces.${adDetail.province.province}`))}
              </Text>
              {/* <Text className="font-inter text-gray-400 ms-1">
                                {user && distanceToMyLocation(user, adDetail)}km
                            </Text> */}
            </View>
          </View>
          <View className="border-y border-gray-200 gap-y-2 py-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-inter-bold dark:text-white">
                {t("adDetails.specification")}
              </Text>
              <Text className="font-inter text-xs text-gray-400">
                {new Date(adDetail.created_at).toLocaleDateString()}
              </Text>
            </View>
            <AdSpecifications>
              <View className="border border-primary-500 rounded-md items-center justify-center py-1 px-2 w-[103px]">
                <Text className="font-inter-semibold dark:text-white">
                  {adDetail.year || new Date().getFullYear()}
                </Text>
                <Text className="dark:text-white">{t("year")}</Text>
              </View>
              <View className="border border-primary-500 rounded-md items-center justify-center py-1 px-2 w-[103px]">
                <Text className="font-inter-semibold dark:text-white">
                  {t(`unit.${adDetail.mileage_unit || "KM"}`)}
                </Text>
                <Text className="text-sm text-gray-400">
                  {adDetail.mileage}
                </Text>
              </View>
              <View className="border border-primary-500 rounded-md items-center justify-center py-1 px-2 w-[103px]">
                <Text className="font-inter-semibold dark:text-white">
                  {t(adDetail.transmission || "Auto")}
                </Text>
                <Text className="dark:text-white">{t("transmission")}</Text>
              </View>
            </AdSpecifications>
          </View>
          <View className="gap-y-1 py-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-inter-bold dark:text-white">
                {t("description")}
              </Text>
              <Text className="font-inter text-xs text-gray-400">
                {adDetail.id}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              className="font-inter font-light text-start dark:text-gray-200"
            >
              {adDetail.description}
            </Text>
          </View>
          <View>
            <View
              style={boxShadow(0, 4, 4, 0, "rgb(000 000 000 / 0.10)").button}
              className="flex-row items-center border border-primary-500 rounded-lg p-2 gap-x-2"
            >
              <Image
                contentFit="cover"
                source={
                  adDetail.user?.avatar?.original_url
                    ? { uri: adDetail.user?.avatar?.original_url }
                    : IMAGES.DefaultAvatar
                }
                style={{ borderRadius: 50, width: 40, height: 40 }}
              />
              <View>
                <Text className="font-inter-semibold dark:text-white">
                  {adDetail.user?.fullname}
                </Text>
                <Text className="dark:text-white">
                  {t("adDetails.since")}{" "}
                  {adDetail.user?.created_at &&
                    getYear(adDetail.user.created_at)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-center gap-x-6 mt-4 px-6">
              {adDetail.xcar_chat && (
                <View className="w-1/3">
                  <ChatCTA variant="button" label={t("adDetails.chatCall")} />
                </View>
              )}
              {adDetail.contact_whatsapp && (
                <View className="w-1/3">
                  <WhatsappCTA
                    variant="button"
                    label={t("adDetails.whatsApp")}
                    additional_number={adDetail.additional_number}
                    second_additional_number={adDetail.second_additional_number}
                    user={adDetail.user}
                  />
                </View>
              )}
              {adDetail.xcar_calls && (
                <View className="w-1/3">
                  <ContactCTA variant="button" label={t("adDetails.contact")} />
                </View>
              )}
            </View>
          </View>
          <View className="gap-y-1 mt-2 mb-4">
            <Text className="font-inter-semibold">
              {t("adDetails.similarAds")}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="bg-white rounded-xl py-1 px-2 flex-row gap-x-2 items-center border border-transparent dark:border-primary-500 dark:bg-black me-4">
                <Image
                  source={IMAGES.CarChevrolet}
                  style={{ height: 80, width: 130, borderRadius: 8 }}
                  contentFit="cover"
                />
                <View className="gap-y-5">
                  <Text
                    className="font-inter-medium max-w-36 dark:text-white"
                    numberOfLines={2}
                  >
                    Mercedes Benz C-Class - 2023
                  </Text>
                  <View className="flex-row items-center justify-end">
                    <Text className="me-10 font-inter-medium dark:text-white">
                      $52500
                    </Text>
                    <FavoriteButton
                      isFavorite={adDetail?.is_favorited || false}
                      onPress={() => {}}
                    />
                  </View>
                </View>
              </View>
              <View className="bg-white rounded-xl py-1 px-2 flex-row gap-x-2 items-center border border-transparent dark:border-primary-500 dark:bg-black me-4">
                <Image
                  source={IMAGES.CarChevrolet}
                  style={{ height: 80, width: 130, borderRadius: 8 }}
                  contentFit="cover"
                />
                <View className="gap-y-5">
                  <Text
                    className="font-inter-medium max-w-36 dark:text-white"
                    numberOfLines={2}
                  >
                    Chevrolet Corvette - 2023
                  </Text>
                  <View className="flex-row items-center justify-end">
                    <Text className="me-10 font-inter-medium dark:text-white">
                      $52500
                    </Text>
                    <FavoriteButton
                      isFavorite={adDetail?.is_favorited || false}
                      onPress={() => {}}
                    />
                  </View>
                </View>
              </View>
              <View className="bg-white rounded-xl py-1 px-2 flex-row gap-x-2 items-center border border-transparent dark:border-primary-500 dark:bg-black me-4">
                <Image
                  source={IMAGES.CarChevrolet}
                  style={{ height: 80, width: 130, borderRadius: 8 }}
                  contentFit="cover"
                />
                <View className="gap-y-5">
                  <Text
                    className="font-inter-medium max-w-36 dark:text-white"
                    numberOfLines={2}
                  >
                    Toyota - 2021
                  </Text>
                  <View className="flex-row items-center justify-end">
                    <Text className="me-10 font-inter-medium dark:text-white">
                      $52500
                    </Text>
                    <FavoriteButton
                      isFavorite={adDetail?.is_favorited || false}
                      onPress={() => {}}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
