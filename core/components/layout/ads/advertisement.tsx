import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useToggleFavorite } from "@/core/services/ads/ad.mutations";
import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdvertisementInterface } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { formatSmartDate } from "@/core/utils/date";
import { distanceToMyLocation } from "@/core/utils/location";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { FavoriteButton } from "../../ui/button/favorite-button";
import Carousel from "../../ui/shared/carousel";

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
  const { isRTL, lang } = useUserPreferencesStore();
  const { protectAction } = useAuthGuard();
  const { mutate } = useToggleFavorite();

  const path = `/categories/${ad_type}/${ad_category ? `${ad_category}/${data.id}` : `${data.id}`}`;

  if (view === "vertical") {
    return (
      <Pressable
        style={boxShadow(0, 4, 4).button}
        onPress={() => router.push(path as any)}
        className="w-svw mx-0.5 rounded-lg pt-0.5 pb-2 border border-primary-500 bg-transparent"
      >
        <Carousel items={data.media} />
        <View
          className="mt-3 px-2 pb-2"
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
              <Text className="font-inter text-xs text-gray-400">{`${t(`unit.${data.mileage_unit}`)} ${data.mileage}`}</Text>
            )}
          </View>
          <View className="flex-row items-center justify-between mt-2 gap-x-0.5">
            <View className="flex-1 flex-row items-center">
              {data.province && (
                <Ionicons
                  name="location-outline"
                  size={22}
                  color={isDark ? "white" : "black"}
                />
              )}
              {data.province && (
                <Text
                  numberOfLines={1}
                  className="flex-1 font-inter-medium text-base text-black dark:text-white"
                >
                  {t(`provinces.${data.province.province}`)}
                </Text>
              )}
              <Text className="font-inter text-gray-400 ms-1">
                {user && data.province && distanceToMyLocation(user, data)}{" "}
                {data.province && t(`unit.KM`)}
              </Text>
            </View>
            <View className="flex-row items-center gap-x-0.5">
              {data.fuel_type && (
                <MaterialCommunityIcons
                  name="gas-station-outline"
                  size={20}
                  color={isDark ? "white" : "black"}
                />
              )}
              <Text
                numberOfLines={1}
                className="font-inter text-sm text-black dark:text-white"
              >
                {data.fuel_type && t(`createAd.${data.fuel_type}`)}
              </Text>
            </View>
            <View className="flex-row items-center gap-x-0.5">
              {data.transmission && (
                <AntDesign
                  name="control"
                  size={20}
                  color={isDark ? "white" : "black"}
                />
              )}
              {data.transmission && (
                <Text
                  numberOfLines={1}
                  className="font-inter text-sm text-black dark:text-white"
                >
                  {t(data.transmission)}
                </Text>
              )}
            </View>
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
    <View className="flex-row flex-1 rounded-lg border border-gray-200 bg-transparent">
      <View className="w-1/3">
        <Image
          source={
            data.media.find((media) => media.media_type === "THUMBNAIL")
              ?.transformed_url
          }
          contentFit="cover"
          style={{
            width: "auto",
            height: 110,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        />
      </View>
      <View
        className="flex-1 w-full rounded-r-lg p-2 gap-y-2"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="font-inter-semibold text-lg text-black dark:text-white">
            {data.title}
          </Text>
          {data.year && (
            <Text className="font-inter-semibold text-black dark:text-white">
              {data.year}
            </Text>
          )}
        </View>
        <View>
          <Text className="font-inter text-sm text-gray-400" numberOfLines={1}>
            {data.description}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-inter text-xs text-gray-400">
            {formatSmartDate(data.created_at, lang)}
          </Text>
          {data.mileage && (
            <Text className="font-inter text-xs text-gray-400">{`${data.mileage} ${t(`unit.${data.mileage_unit}`)}`}</Text>
          )}
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} />
            {data.province && (
              <Text className="font-inter-medium text-sm text-black dark:text-white">
                {t(`provinces.${data.province?.province}`)}
              </Text>
            )}
            <Text className="font-inter text-gray-400 ms-1 text-sm">
              {user &&
                data.province &&
                data.province?.province &&
                distanceToMyLocation(user, data)}{" "}
              {t(`unit.${data.mileage_unit}`)}
            </Text>
          </View>
          <View>
            {data.price && (
              <Text className="font-inter-medium text-sm text-black dark:text-white">
                ${data.price}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
});

export default Advertisement;
