import { IMAGES } from "@/core/constants/images";
import { Image } from "expo-image";
import { Pressable, ScrollView, Text, View } from "react-native";

import CarIcon from "@/assets/svg/Car";
import ColorIcon from "@/assets/svg/Color";
import FuelTypeIcon from "@/assets/svg/FuelType";
import TransmissionIcon from "@/assets/svg/Transmission";
import TTextIcon from "@/assets/svg/ttext";
import YearIcon from "@/assets/svg/Year";
import { DIMENSIONS } from "@/core/constants";
import { hideSystemBars, showSystemBars } from "@/core/lib/navigation-bar";
import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdvertisementInterface } from "@/core/types";
import { formatViews } from "@/core/utils";
import { boxShadow } from "@/core/utils/cn";
import { distanceToMyLocation } from "@/core/utils/location";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { format, formatDate } from "date-fns";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FavoriteButton } from "../../../ui/button/favorite-button";
import ReportAdModal from "../reporting/report-ad-modal";
import AdContactButtons from "./ad-contact-buttons";
import HeroSection from "./hero-section";

export default function AdDetail({
  adDetail,
}: {
  adDetail: AdvertisementInterface;
}) {
  const router = useRouter()
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false)
  const { isRTL } = useUserPreferencesStore();
  const user = useAuthStore((state) => state.user);

  const { dark } = useTheme()

  useEffect(() => {
    hideSystemBars(false)

    return () => {
      showSystemBars()
    }
  }, [])

  return (
    <View className="flex-1 relative">
      <Pressable
        onPress={() => router.back()}
        style={{ width: 30, height: 30, borderRadius: 5 }}
        className="absolute top-12 start-8 items-center justify-center z-20 bg-gray-400"
      >
        <Ionicons name="chevron-back-outline" color="white" size={20} />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        <HeroSection ad={adDetail} />
        <View className="flex-row items-center px-6 mt-6">
          <Image
            style={{ height: 14, width: 14, borderRadius: 100, marginEnd: 6 }}
            source={IMAGES.CarMercedesLogo}
            contentFit="fill"
          />
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{ fontSize: 17 }}
            className="font-inter-semibold text-grayish dark:text-white"
          >
            {adDetail.title}
          </Text>
        </View>
        <View className="flex-row items-center mt-4 px-6">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="font-inter-medium text-base dark:text-white/70"
          >
            {adDetail.description}
          </Text>
        </View>
        {adDetail.price && (
          <View className="mt-4 px-6 ">
            <Text className="font-inter-semibold text-lg text-blue dark:text-cyan">KWD {adDetail.price}</Text>
            <Image source={IMAGES.YellowLine} style={{ height: 5, width: 80 }} />
          </View>
        )}
        <View className="flex-row items-center justify-between mt-6 border-y dark:border-white/10 border-gray-200 py-4 px-2 mx-6">
          {adDetail.province && (
            <View className="flex-row items-center">
              <Ionicons
                size={20}
                name="location-outline"
                color="#A3A2A2"
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-inter text-xs text-grayish dark:text-[#A3A2A2] max-w-28"
              >
                {t(`provinces.${adDetail.province.province}`)}
              </Text>
              {user && (
                <Text className="font-inter text-sm text-black/70 dark:text-[#A3A2A2] ms-2">
                  {distanceToMyLocation(user, adDetail)}{" "}
                  {t(`unit.${adDetail.mileage_unit || 'KM'}`)?.toLowerCase()}
                </Text>
              )}
            </View>
          )}
          <Text className="font-inter text-xs text-grayish">{formatDate(adDetail.created_at, "dd/MM/yyyy")}</Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="eye-outline" color={dark ? "white" : "black"} size={16} />
            <Text className="font-inter text-xs text-black/70 dark:text-white/70">{formatViews(adDetail.views || 0)}</Text>
          </View>
        </View>
        <View className="mt-6 border-b dark:border-white/10 border-gray-200 pb-8 mx-6">
          <Text className="text-orange font-inter-bold">Specification</Text>
          <View className="flex-row items-center justify-between my-6 ms-4">
            {adDetail.year && (
              <View className="flex-row items-center gap-1">
                <YearIcon />
                <Text className="font-inter-semibold text-sm text-orange">{adDetail.year}</Text>
              </View>
            )}
            {adDetail.mileage && (
              <View className="flex-row gap-2 items-center">
                <CarIcon />
                <Text className="font-inter text-sm text-orange">{`${t(`unit.${adDetail.mileage_unit || "KM"}`)}`}</Text>
                <Text className="font-inter-semibold text-sm text-orange">{adDetail.mileage}</Text>
              </View>
            )}
            {adDetail && (
              <View className="flex-row gap-2 items-center">
                <ColorIcon />
                <Text className="font-inter text-sm text-orange">{adDetail.exterior_color || "Black"}</Text>
              </View>
            )}
          </View>
          <View className="flex-row items-center justify-between ms-4">
            {adDetail.transmission && (
              <View className="flex-row items-center gap-2 flex-1">
                <TransmissionIcon />
                <Text className="font-inter-semibold text-sm text-orange">
                  {t(adDetail.transmission)}
                </Text>
              </View>
            )}
            {adDetail.fuel_type && (
              <View className="flex-row items-center gap-2 flex-1 ms-4">
                <FuelTypeIcon />
                <Text className="font-inter text-sm text-orange">
                  {t(`createAd.${adDetail.fuel_type}`)}
                </Text>
              </View>
            )}
            <View className="flex-1" />
          </View>
        </View>
        <View className="mt-6 border-b dark:border-white/10 border-gray-200 pb-8 mx-6">
          <Text className="text-blue dark:text-cyan font-inter-bold text-sm">Description</Text>
          <Text className="font-inter text-base dark:text-white/70 mt-4 ms-2">{adDetail.description}</Text>
          <View className="self-end">
            <TTextIcon />
          </View>
        </View>
        <View className="mt-6 border-b dark:border-white/10 border-gray-200 pb-8 mx-6">
          <View
            className="items-center justify-center border border-rose py-4 px-6 gap-4 mt-10"
            style={[{
              boxShadow: [...boxShadow().button.boxShadow, ...boxShadow(0, 0, 22.9, 0, "rgb(000 000 000 / 0.20)").button.boxShadow],
              borderRadius: 30
            }]}
          >
            <Text className="font-inter-semibold text-rose text-base">X-AI  Smart Report</Text>
            <Text className="font-inter dark:text-white/70 text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim ,
            </Text>
            <Text className="font-inter text-center text-orange text-[10px]">
              Disclaimer: AI-generated info only — always verify before deciding.
            </Text>
          </View>
        </View>
        <View className="mt-6 border-b dark:border-white/10 border-gray-200 pb-8 flex-row gap-3 items-center mx-6">
          <View className="gap-6">
            <View className="flex-row items-center px-1">
              <Image
                source={adDetail.user?.avatar ? { uri: adDetail.user.avatar.original_url } : IMAGES.DefaultAvatar}
                contentFit="contain"
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 15,
                }}
              />
              <View className="px-2">
                <Text className="font-inter-semibold dark:text-white text-sm">
                  {adDetail.user?.fullname}
                </Text>
                <Text className="font-inter-medium text-[#434343] dark:text-white/70 text-[10px]">
                  Since {format(adDetail.user?.created_at || new Date(), "yyyy")}
                </Text>
              </View>
            </View>
            <View>
              <Text className="font-inter-bold text-grayish text-sm text-center">Nearby Location</Text>
              <View
                className="mt-2"
                style={[{
                  height: 170,
                  borderWidth: 1,
                  borderRadius: 30,
                  borderColor: "#A3A2A2",
                  backgroundColor: "#FFFFFF",
                  width: DIMENSIONS.width - 40,
                  boxShadow: [
                    ...boxShadow().button.boxShadow,
                    ...boxShadow().button.boxShadow,
                    ...boxShadow(0, 0, 22.9, 0, "rgb(000 000 000 / 0.20)").button.boxShadow
                  ],
                }]}
              >
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Pressable
                className="flex-row items-center gap-1"
                onPress={() => setVisible(true)}
              >
                <Ionicons
                  size={15}
                  color="#FF123D"
                  name="flag-outline"
                />
                <Text className="text-error font-inter-medium text-base">Report</Text>
              </Pressable>
              <Text className="text-black/70 dark:text-white/70 font-inter text-[8px]">Ad ID {adDetail.id.slice(10)}</Text>
            </View>
          </View>
        </View>
        {/* SIMILAR ADS */}
        <View className="ms-2" style={{ direction: isRTL ? "rtl" : "ltr", marginTop: 40 }}>
          <Text className="font-inter-medium text-base ms-6 text-blue dark:text-cyan">
            {t("Similar ads")}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button}
              className="bg-white rounded-2xl p-1 my-4 flex-row gap-x-2 items-center border border-transparent dark:border-[#46464640] dark:bg-[#0F0F0F] ms-2 me-4">
              <Image
                style={{ height: 130, width: 170, borderRadius: 15 }}
                source={IMAGES.CarHyunday}
                contentFit="cover"
              />
              <View className="pe-2 ms-2">
                <View className="flex-row gap-1 items-center">
                  <Image
                    style={{ height: 14, width: 14, borderRadius: 100 }}
                    source={IMAGES.CarMercedesLogo}
                    contentFit="contain"
                  />
                  <Text className="font-inter max-w-36 dark:text-white" numberOfLines={2}>
                    MERCEDES BENZ
                  </Text>
                </View>
                <View className="justify-between">
                  <View>
                    <Text className="font-inter text-base max-w-36 dark:text-white">
                      C-CLASS
                    </Text>
                    <Text className="font-inter text-base max-w-36 dark:text-white">
                      2023
                    </Text>
                    <Text className="font-inter text-base dark:text-cyan text-blue">
                      KWD 52500
                    </Text>
                  </View>
                </View>
                <View className="self-end">
                  <FavoriteButton
                    onPress={() => { }}
                    isFavorite={true}
                    size={30}
                  />
                </View>
              </View>
            </View>
            <View
              style={boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button}
              className="bg-white rounded-2xl p-1 my-4 flex-row gap-x-2 items-center border border-transparent dark:border-[#46464640] dark:bg-[#0F0F0F] ms-2 me-4">
              <Image
                style={{ height: 130, width: 170, borderRadius: 15 }}
                source={IMAGES.CarHyunday}
                contentFit="cover"
              />
              <View className="pe-2 ms-2">
                <View className="flex-row gap-1 items-center">
                  <Image
                    style={{ height: 14, width: 14, borderRadius: 100 }}
                    source={IMAGES.CarMercedesLogo}
                    contentFit="contain"
                  />
                  <Text className="font-inter max-w-36 dark:text-white" numberOfLines={2}>
                    MERCEDES BENZ
                  </Text>
                </View>
                <View className="justify-between">
                  <View>
                    <Text className="font-inter text-base max-w-36 dark:text-white">
                      C-CLASS
                    </Text>
                    <Text className="font-inter text-base max-w-36 dark:text-white">
                      2023
                    </Text>
                    <Text className="font-inter text-base dark:text-cyan text-blue">
                      KWD 52500
                    </Text>
                  </View>
                </View>
                <View className="self-end">
                  <FavoriteButton
                    onPress={() => { }}
                    isFavorite={false}
                    size={30}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {/* EMPTY BOX */}
        <View
          className="self-center my-12 dark:bg-white"
          style={{ width: "90%", height: 240, borderRadius: 22, borderWidth: 0.5, borderColor: "#A3A2A2" }}
        />
        {/* HIGHLAGHTED ADS */}
        <View className="ms-2" style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Text className="font-inter-medium text-base ms-6 text-blue dark:text-cyan">
            {t("Highlighted ads")}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="ps-3"
          >
            <View
              style={boxShadow(0, 4, 4).button}
              className="bg-white rounded-[20px] p-1 my-4 items-center border-[0.5px] border-grayish dark:border-[#46464640] dark:bg-[#0F0F0F] me-4">
              <Image
                source={IMAGES.CarHyunday}
                style={{ height: 130, width: 158, borderRadius: 20 }}
                contentFit="cover"
              />
              <View className="px-2 mt-3">
                <View className="flex-row gap-1 items-center">
                  <Image
                    style={{ height: 12, width: 12, borderRadius: 100 }}
                    source={IMAGES.CarMercedesLogo}
                    contentFit="fill"
                  />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    className="font-inter-medium text-sm max-w-36 dark:text-white"
                  >
                    Chevrxyz - Corvette
                  </Text>
                </View>
                <View className="flex-row items-center justify-end">
                  <View className="justify-center">
                    <Text className="font-inter text-sm max-w-36 dark:text-white">
                      C-Class
                    </Text>
                    <Text className="font-inter text-sm max-w-36 dark:text-white">
                      2023
                    </Text>
                    <Text className="me-10 font-inter text-sm dark:text-cyan text-blue">
                      KWD 52500
                    </Text>
                  </View>
                  <FavoriteButton
                    onPress={() => { }}
                    isFavorite={false}
                    size={30}
                  />
                </View>
              </View>
            </View>
            <View
              style={boxShadow(0, 4, 4).button}
              className="bg-white rounded-[20px] p-1 my-4 items-center border-[0.5px] border-grayish dark:border-[#46464640] dark:bg-[#0F0F0F] me-4">
              <Image
                source={IMAGES.CarHyunday}
                style={{ height: 130, width: 158, borderRadius: 20 }}
                contentFit="cover"
              />
              <View className="px-2 mt-3">
                <View className="flex-row gap-1 items-center">
                  <Image
                    style={{ height: 12, width: 12, borderRadius: 100 }}
                    source={IMAGES.CarMercedesLogo}
                    contentFit="fill"
                  />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    className="font-inter-medium text-sm max-w-36 dark:text-white"
                  >
                    Chevrxyz - Corvette
                  </Text>
                </View>
                <View className="flex-row items-center justify-end">
                  <View className="justify-center">
                    <Text className="font-inter text-sm max-w-36 dark:text-white">
                      C-Class
                    </Text>
                    <Text className="font-inter text-sm max-w-36 dark:text-white">
                      2023
                    </Text>
                    <Text className="me-10 font-inter text-sm dark:text-cyan text-blue">
                      KWD 52500
                    </Text>
                  </View>
                  <FavoriteButton
                    onPress={() => { }}
                    isFavorite={false}
                    size={30}
                  />
                </View>
              </View>
            </View>
            <View
              style={boxShadow(0, 4, 4).button}
              className="bg-white rounded-[20px] p-1 my-4 items-center border-[0.5px] border-grayish dark:border-[#46464640] dark:bg-[#0F0F0F] me-4">
              <Image
                source={IMAGES.CarHyunday}
                style={{ height: 130, width: 158, borderRadius: 20 }}
                contentFit="cover"
              />
              <View className="px-2 mt-3">
                <View className="flex-row gap-1 items-center">
                  <Image
                    style={{ height: 12, width: 12, borderRadius: 100 }}
                    source={IMAGES.CarMercedesLogo}
                    contentFit="fill"
                  />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    className="font-inter-medium text-sm max-w-36 dark:text-white"
                  >
                    Chevrxyz - Corvette
                  </Text>
                </View>
                <View className="flex-row items-center justify-end">
                  <View className="justify-center">
                    <Text className="font-inter text-sm max-w-36 dark:text-white">
                      C-Class
                    </Text>
                    <Text className="font-inter text-sm max-w-36 dark:text-white">
                      2023
                    </Text>
                    <Text className="me-10 font-inter text-sm dark:text-cyan text-blue">
                      KWD 52500
                    </Text>
                  </View>
                  <FavoriteButton
                    onPress={() => { }}
                    isFavorite={true}
                    size={30}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {/* EMPTY BOX */}
        <View
          className="self-center my-12 dark:bg-white"
          style={{ width: "90%", height: 240, borderRadius: 22, borderWidth: 0.5, borderColor: "#A3A2A2" }}
        />
        <View className="px-4">
          <AdContactButtons />
        </View>
      </ScrollView>
      <ReportAdModal visible={visible} setVisible={setVisible} />
    </View>
  );
}