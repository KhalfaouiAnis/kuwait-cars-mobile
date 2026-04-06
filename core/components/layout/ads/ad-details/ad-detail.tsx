import { IMAGES } from "@/core/constants/images";
import { Image } from "expo-image";
import { Pressable, ScrollView, Text, View } from "react-native";

import TTextIcon from "@/assets/svg/ttext";
import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdvertisementInterface } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { distanceToMyLocation } from "@/core/utils/location";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
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

  return (
    <View className="flex-1 relative">
      <Pressable
        onPress={() => router.back()}
        style={{ width: 30, height: 30, borderRadius: 5 }}
        className="absolute top-12 start-8 items-center justify-center bg-grayish z-20"
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
            className="font-inter-semibold text-lg dark:text-white"
          >
            {adDetail.title}
          </Text>
          <Text
            className="font-inter-medium text-lg dark:text-white ms-auto"
          >
            {adDetail.year}
          </Text>
        </View>
        <View className="flex-row items-center mt-4 px-6">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="font-inter-medium text-lg dark:text-white"
          >
            {adDetail.description}
          </Text>
          <View
            className="ms-auto"
          >
            <TTextIcon />
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-4 border-b dark:border-white/10 border-gray-200 pb-8 mx-6">
          {adDetail.province && (
            <View className="flex-row items-center">
              <Ionicons
                size={22}
                name="location-outline"
                color={dark ? "white" : "black"}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="font-inter text-sm text-black dark:text-white max-w-28"
              >
                {t(`provinces.${adDetail.province.province}`)}
              </Text>
              <Text className="font-inter text-sm text-gray-400 ms-1">
                {user && distanceToMyLocation(user, adDetail)}{" "}
                {t(`unit.KM`)?.toLowerCase()}
              </Text>
            </View>
          )}
          {adDetail.price && (
            <Text className="font-inter-semibold text-lg dark:text-white">KD ${adDetail.price}</Text>
          )}
        </View>
        <View className="mt-6 border-b dark:border-white/10 border-gray-200 pb-8 mx-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-blue font-inter-bold">Specification</Text>
            <Text className="font-inter text-[#A3A2A2] text-xs">{format(adDetail.created_at, "dd/MM/yyyy")}</Text>
          </View>
          {adDetail.mileage && (
            <View className="flex-row gap-2 items-center ms-6 mt-4">
              <Text className="font-inter text-sm dark:text-white">{`${t(`unit.${adDetail.mileage_unit || "KM"}`)}`}</Text>
              <Text className="font-inter-semibold text-xs dark:text-white">{adDetail.mileage}</Text>
            </View>
          )}
          {adDetail.transmission && (
            <View className="flex-row gap-8 items-center ms-6 mt-4">
              <View className="flex-row items-center gap-2">
                <AntDesign
                  name="control"
                  size={20}
                  color={dark ? "white" : "black"}
                />
                <Text
                  numberOfLines={1}
                  className="font-inter text-sm text-black dark:text-white"
                >
                  {t(adDetail.transmission)}
                </Text>
              </View>
              {adDetail.fuel_type && (
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name="gas-station-outline"
                    size={20}
                    color={dark ? "white" : "black"}
                  />
                  <Text
                    numberOfLines={1}
                    className="font-inter text-sm text-black dark:text-white"
                  >
                    {t(`createAd.${adDetail.fuel_type}`)}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        <View className="mt-6 border-b dark:border-white/10 border-gray-200 pb-8 mx-6">
          <Text className="text-blue font-inter-bold">Description</Text>
          <Text className="font-inter text-base dark:text-white mt-4 ms-2">{adDetail.description}</Text>
          <View
            className="items-center justify-center border border-rose py-4 px-6 gap-4 mt-10"
            style={[{
              boxShadow: [...boxShadow().button.boxShadow, ...boxShadow(0, 0, 22.9, 0, "rgb(000 000 000 / 0.20)").button.boxShadow],
              borderRadius: 30
            }]}
          >
            <Text className="font-inter-semibold text-rose text-base">X-AI  Smart Report</Text>
            <Text className="font-inter dark:text-white text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim ,
            </Text>
            <Text className="font-inter text-center text-orange text-[10px]">
              Disclaimer: AI-generated info only — always verify before deciding.
            </Text>
          </View>
        </View>
        <View className="mt-6 border-b dark:border-white/10 border-gray-200 pb-8 flex-row gap-3 items-center mx-6">
          <View className="gap-6 items-center">
            <View
              className="border-[0.5px] border-grayish flex-row items-center px-1 mt-6 py-4"
              style={{ boxShadow: boxShadow().button.boxShadow, borderRadius: 20 }}
            >
              <Image
                source={adDetail.user?.avatar ? { uri: adDetail.user.avatar.original_url } : IMAGES.DefaultAvatar}
                contentFit="contain"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                }}
              />
              <View className="px-2">
                <Text className="font-inter-semibold dark:text-white/50 text-[10px]">
                  {adDetail.user?.fullname}
                </Text>
                <Text className="font-inter-medium text-[#434343] text-[10px] ms-2 -mt-1">
                  Since {format(adDetail.user?.created_at || new Date(), "yyyy")}
                </Text>
              </View>
            </View>
            <Text className="text-black/70 dark:text-white/70 font-inter text-[8px]">Ad ID {adDetail.id.slice(10)}</Text>
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
          </View>
          <View className="flex-1">
            <Text className="font-inter-bold text-grayish text-sm text-center">Nearby Location</Text>
            <View
              className="flex-1 items-center justify-center border border-[#A3A2A2] py-4 px-6 gap-4 mt-2"
              style={[{
                borderRadius: 30,
                height: 150,
                boxShadow: [...boxShadow().button.boxShadow, ...boxShadow(0, 0, 22.9, 0, "rgb(000 000 000 / 0.20)").button.boxShadow],
              }]}
            >
            </View>
          </View>
        </View>
        {/* SIMILAR ADS */}
        <View className="mt-14" style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Text className="font-inter-medium text-lg ms-6 text-blue dark:text-[#00A6DA]">
            {t("Similar ads")}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button}
              className="bg-white rounded-2xl p-1 my-4 flex-row gap-x-2 items-center border border-transparent dark:border-[#46464640] dark:bg-black/50 mx-2">
              <Image
                style={{ height: 130, width: 170, borderRadius: 15 }}
                source={IMAGES.CarHyunday}
                contentFit="cover"
              />
              <View className="pe-2">
                <View className="flex-row gap-2 items-start">
                  <Image
                    style={{ height: 20, width: 20, borderRadius: 100 }}
                    source={IMAGES.CarMercedesLogo}
                    contentFit="contain"
                  />
                  <Text
                    className="font-inter-medium max-w-36 dark:text-white"
                    numberOfLines={2}
                  >
                    MERCEDES BENZ
                  </Text>
                </View>
                <View className="flex-row items-center justify-end">
                  <View className="justify-center">
                    <Text className="font-inter max-w-36 dark:text-white">
                      C-CLASS
                    </Text>
                    <Text className="font-inter max-w-36 dark:text-white">
                      2023
                    </Text>
                    <Text className="me-10 font-inter dark:text-white text-blue">
                      $52500
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
            <View
              style={boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button}
              className="bg-white rounded-2xl p-1 my-4 flex-row gap-x-2 items-center border border-transparent dark:border-[#46464640] dark:bg-black/50 ms-2 me-4">
              <Image
                style={{ height: 130, width: 170, borderRadius: 15 }}
                source={IMAGES.CarHyunday}
                contentFit="cover"
              />
              <View className="pe-2">
                <View className="flex-row gap-2 items-start">
                  <Image
                    style={{ height: 20, width: 20, borderRadius: 100 }}
                    source={IMAGES.CarMercedesLogo}
                    contentFit="contain"
                  />
                  <Text
                    className="font-inter-medium max-w-36 dark:text-white"
                    numberOfLines={2}
                  >
                    MERCEDES BENZ
                  </Text>
                </View>
                <View className="flex-row items-center justify-end">
                  <View className="justify-center">
                    <Text className="font-inter max-w-36 dark:text-white">
                      C-CLASS
                    </Text>
                    <Text className="font-inter max-w-36 dark:text-white">
                      2023
                    </Text>
                    <Text className="me-10 font-inter dark:text-white text-blue">
                      $52500
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
          </ScrollView>
        </View>
        {/* EMPTY BOX */}
        <View
          className="items-center justify-center my-12 rounded-[15px] border-[0.5px] border-[#A3A2A2] dark:bg-white mx-auto"
          style={{ width: "96%", height: 240 }}
        >
        </View>
        {/* HIGHLAGHTED ADS */}
        <View className="mt-8" style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Text className="font-inter-medium text-lg ms-6 text-blue dark:text-[#00A6DA]">
            {t("Highlighted ads")}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="ps-3"
          >
            <View
              style={boxShadow(0, 4, 4).button}
              className="bg-white rounded-[20px] p-1 my-4 items-center border border-grayish dark:border-[#46464640] dark:bg-black/50 me-4">
              <Image
                source={IMAGES.CarHyunday}
                style={{ height: 130, width: 146, borderRadius: 15 }}
                contentFit="cover"
              />
              <View className="px-2 mt-3">
                <View className="flex-row items-center">
                  <Image
                    style={{ height: 14, width: 14, borderRadius: 100, marginEnd: 2 }}
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
                  <View className="justify-center ms-4">
                    <Text className="font-inter max-w-36 dark:text-white">
                      C-Class
                    </Text>
                    <Text className="font-inter max-w-36 dark:text-white -mt-1">
                      2023
                    </Text>
                    <Text className="me-10 font-inter dark:text-white text-blue -mt-1">
                      $52500
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
              className="bg-white rounded-[20px] p-1 my-4 items-center border border-grayish dark:border-[#46464640] dark:bg-black/50 me-4">
              <Image
                source={IMAGES.CarHyunday}
                style={{ height: 130, width: 146, borderRadius: 15 }}
                contentFit="cover"
              />
              <View className="px-2 mt-3">
                <View className="flex-row items-center">
                  <Image
                    style={{ height: 14, width: 14, borderRadius: 100, marginEnd: 2 }}
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
                  <View className="justify-center ms-4">
                    <Text className="font-inter max-w-36 dark:text-white">
                      C-Class
                    </Text>
                    <Text className="font-inter max-w-36 dark:text-white -mt-1">
                      2023
                    </Text>
                    <Text className="me-10 font-inter dark:text-white text-blue -mt-1">
                      $52500
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
              className="bg-white rounded-[20px] p-1 my-4 items-center border border-grayish dark:border-[#46464640] dark:bg-black/50 me-4">
              <Image
                source={IMAGES.CarHyunday}
                style={{ height: 130, width: 146, borderRadius: 15 }}
                contentFit="cover"
              />
              <View className="px-2 mt-3">
                <View className="flex-row items-center">
                  <Image
                    style={{ height: 14, width: 14, borderRadius: 100, marginEnd: 2 }}
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
                  <View className="justify-center ms-4">
                    <Text className="font-inter max-w-36 dark:text-white">
                      C-Class
                    </Text>
                    <Text className="font-inter max-w-36 dark:text-white -mt-1">
                      2023
                    </Text>
                    <Text className="me-10 font-inter dark:text-white text-blue -mt-1">
                      $52500
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
          className="items-center justify-center my-12 rounded-[15px] border-[0.5px] border-[#A3A2A2] dark:bg-white mx-auto"
          style={{ width: "96%", height: 240 }}
        >
        </View>
        <View className="mt-14 px-4">
          <AdContactButtons />
        </View>
      </ScrollView>
      <ReportAdModal visible={visible} setVisible={setVisible} />
    </View>
  );
}