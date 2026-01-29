import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useToggleFavorite } from "@/core/services/ads/ad.mutations";
import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdvertisementInterface } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { distanceToMyLocation } from "@/core/utils/location";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { FavoriteButton } from "../../ui/button/favorite-button";
import Carousel from "../../ui/shared/carousel";
import HorizontalAdvertisementView from "./horizontal-advertisement-view";

interface Props {
  data: AdvertisementInterface;
  view: "vertical" | "horizontal";
  isDark?: boolean;
}

const Advertisement = memo(function Advertisement({
  data,
  view = "horizontal",
  isDark,
}: Props) {
  const { ad_type, ad_category } = useLocalSearchParams<{
    ad_type: string;
    ad_category: string;
  }>();
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation("common");
  const { isRTL } = useUserPreferencesStore();
  const { protectAction } = useAuthGuard();
  const { mutate } = useToggleFavorite();

  const path = `/categories/${ad_type}/${ad_category ? `${ad_category}/${data.id}` : `${data.id}`}`;

  if (view === "vertical") {
    return (
      <Pressable
        style={boxShadow(0, 4, 4).button}
        onPress={() => router.push(path as any)}
        className="w-svw rounded-lg pt-0.5 pb-4 mx-0.5"
      >
        <Carousel items={data.media} />
        <View
          className="px-2.5"
          style={{ direction: isRTL ? "rtl" : "ltr" }}
        >
          <View className="flex-1 flex-row items-center justify-between gap-2">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="flex-1 font-inter-semibold text-lg text-black dark:text-white"
            >
              {data.title} {data.year}
            </Text>
            {data.price && (
              <Text className="font-inter-semibold text-black dark:text-white">
                ${data.price}
              </Text>
            )}
          </View>
          <View className="flex-1 flex-row items-center justify-between gap-2">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="flex-1 font-inter text-sm text-gray-400"
            >
              {data.description}
            </Text>
            {data.mileage && (
              <Text className="font-inter text-xs text-gray-400">{`${t(`unit.${data.mileage_unit || "KM"}`)} ${data.mileage}`}</Text>
            )}
          </View>
          <View className="flex-row items-center justify-between mt-2 gap-1">
            {
              data.province && (
                <View className="flex-row items-center">
                  <Ionicons
                    name="location-outline"
                    size={22}
                    color={isDark ? "white" : "black"}
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="font-inter-medium text-base text-black dark:text-white max-w-28"
                  >
                    {t(`provinces.${data.province.province}`)}
                  </Text>
                  <Text className="font-inter text-gray-400 ms-1">
                    {user && distanceToMyLocation(user, data)}
                    {t(`unit.KM`)?.toLowerCase()}
                  </Text>
                </View>
              )
            }
            {
              data.fuel_type && (
                <View className="flex-row items-center gap-x-0.5">
                  <MaterialCommunityIcons
                    name="gas-station-outline"
                    size={20}
                    color={isDark ? "white" : "black"}
                  />
                  <Text
                    numberOfLines={1}
                    className="font-inter text-sm text-black dark:text-white"
                  >
                    {t(`createAd.${data.fuel_type}`)}
                  </Text>
                </View>
              )
            }
            {
              data.transmission && (
                <View className="flex-row items-center gap-x-0.5">
                  <AntDesign
                    name="control"
                    size={20}
                    color={isDark ? "white" : "black"}
                  />
                  <Text
                    numberOfLines={1}
                    className="font-inter text-sm text-black dark:text-white"
                  >
                    {t(data.transmission)}
                  </Text>
                </View>
              )
            }
            <FavoriteButton
              isFavorite={data.is_favorited || false}
              onPress={() => protectAction(() => mutate(data.id))}
            />
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <HorizontalAdvertisementView data={data} />
  );
});

export default Advertisement;
