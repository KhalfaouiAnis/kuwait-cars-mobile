import UnfavoriteIcon from "@/assets/svg/unfavorite";
import { DIMENSIONS } from "@/core/constants";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { useToggleFavorite } from "@/core/services/ads/ad.mutations";
import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdvertisementInterface } from "@/core/types";
import { formatViews } from "@/core/utils";
import { boxShadow } from "@/core/utils/cn";
import { formatSmartDate } from "@/core/utils/date";
import { distanceToMyLocation } from "@/core/utils/location";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const ReanimatedView = Reanimated.View;

interface Props {
  data: AdvertisementInterface;
}

const RightAction = ({
  progress,
  toggleFavorite,
  isFavorited,
}: {
  progress: SharedValue<number>;
  toggleFavorite: () => void;
  isFavorited: boolean
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const threshold = 0.3;
    const opacity = interpolate(progress.value, [threshold, 1], [0, 1]);
    return {
      opacity: progress.value >= threshold ? opacity : 0,
    };
  });

  return (
    <ReanimatedView
      style={animatedStyle}
      className="items-center justify-center mx-2.5 h-[120px] w-[66px]"
    >
      <RectButton
        style={{
          backgroundColor: isFavorited ? "rgb(18,255,164,0.15)" : "rgb(255,231,229,0.5)",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: 16,
          height: "100%",
          width: "100%",
        }}
        onPress={toggleFavorite}
      >
        {
          isFavorited ? (

            <Ionicons name="star-outline" size={24} />
          ) : (
            <UnfavoriteIcon />
          )
        }
        <Text className="font-inter-medium text-center text-[9px]">{isFavorited ? "Favorite" : "Unfavorite"}</Text>
      </RectButton>
    </ReanimatedView>
  );
};

const HorizontalAdvertisementView = memo(function Advertisement({ data }: Props) {
  const { ad_type, ad_category } = useLocalSearchParams<{
    ad_type: string;
    ad_category: string;
  }>();
  const { isRTL, lang } = useUserPreferencesStore();
  const user = useAuthStore((state) => state.user);
  const { protectAction } = useAuthGuard();
  const swipeableRef = useRef<any>(null);
  const { t } = useTranslation("common");
  const { mutate } = useToggleFavorite();
  const { dark } = useTheme()

  const path = `/categories/${ad_type}/${ad_category ? `${ad_category}/${data.id}` : `${data.id}`}`;

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      leftThreshold={40}
      renderRightActions={(progress) => (
        <RightAction
          progress={progress}
          isFavorited={data.is_favorited || false}
          toggleFavorite={() => protectAction(() => mutate(data.id))}
        />
      )}
    >
      <Pressable
        onPress={() => router.push(path as any)}
        style={[boxShadow(0, 4, 4).button, { borderWidth: 0.5 }]}
        className="flex-row flex-1 rounded-lg border-[#CCC7C7] dark:border-[rgb(168 168 168 / 0.25)] bg-transparent overflow-hidden mx-2 ms-1 mb-4 dark:bg-darkish"
      >
        <Image
          source={data.media.find((media) => media.media_type === "THUMBNAIL")?.transformed_url}
          contentFit="fill"
          style={{
            height: 120,
            width: DIMENSIONS.width / 3 + 40,
          }}
        />
        <View
          style={{ direction: isRTL ? "rtl" : "ltr" }}
          className="flex-1 w-full rounded-r-lg p-2 gap-y-2"
        >
          <View className="flex-row items-center justify-between">
            <Text className="font-inter-medium text-base text-black dark:text-white">
              {data.title}
            </Text>
            {data.year && (
              <Text className="font-inter-medium text-black dark:text-white">
                {data.year}
              </Text>
            )}
          </View>
          <Text className="flex-1 font-inter text-sm text-gray-400 dark:text-white/70" ellipsizeMode="tail" numberOfLines={1}>
            {data.description}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="font-inter text-xs text-gray-400">
              {formatSmartDate(data.created_at, lang)}
            </Text>
            {data.mileage && (
              <Text className="font-inter text-xs text-gray-400">{`${data.mileage}${t(`unit.${data.mileage_unit || "KM"}`).toLowerCase()}`}</Text>
            )}
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" color={dark ? "#9ca3af" : "black"} size={14} />
              {data.province && (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="font-inter text-sm text-black dark:text-gray-400 max-w-28">
                  {t(`provinces.${data.province?.province}`)}
                </Text>
              )}
              <Text className="font-inter text-gray-400 ms-1 text-sm">
                {user &&
                  data.province &&
                  data.province?.province &&
                  distanceToMyLocation(user, data)}
                {t(`unit.${data.mileage_unit || 'KM'}`).toLowerCase()}
              </Text>
            </View>
            <View>
              {data.price && (
                <Text className="font-inter text-sm text-blue dark:text-[#00A6DA]">
                  ${formatViews(data.price)}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
});

export default HorizontalAdvertisementView;
