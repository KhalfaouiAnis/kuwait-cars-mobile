import ProfileHeader from "@/core/components/layout/header/profile-header";
import { AdSkeletonList } from "@/core/components/layout/skeletons/ad-skeleton-list";
import Container from "@/core/components/ui/container";
import ConfirmDeleteDialog from "@/core/components/ui/dialog/confirm-delete-dialog";
import { EmptyState } from "@/core/components/ui/shared/empty-state";
import { useRepostAd, useSoftDeletAd } from "@/core/services/ads/ad.mutations";
import { useMyAdsQuery } from "@/core/services/ads/ad.queries";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdStatus, AdvertisementInterface } from "@/core/types";
import { formatSmartDate } from "@/core/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

const ReanimatedView = Reanimated.View;

const LeftAction = ({
  progress,
  handleDelete,
}: {
  progress: SharedValue<number>;
  handleDelete: () => void;
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
      className="items-center justify-center mx-1 h-full pb-4 w-14"
    >
      <RectButton
        style={{
          backgroundColor: "#FFE7E5",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: 12,
        }}
        onPress={handleDelete}
      >
        <Ionicons name="trash-outline" size={24} color="#F44336" />
      </RectButton>
    </ReanimatedView>
  );
};

export default function MyAdsScreen() {
  const { t } = useTranslation("common");
  const swipeableRef = useRef<any>(null);
  const { lang } = useUserPreferencesStore();
  const { mutate } = useSoftDeletAd();
  const { mutateAsync: repostAd } = useRepostAd();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdStatus>("COMPLETED");
  const { data, isLoading, refetch } = useMyAdsQuery(activeTab);

  const renderItem = ({ item }: { item: AdvertisementInterface }) => {
    const handleRepost = async () => {
      await repostAd(item.id);
    };

    return (
      <Swipeable
        ref={swipeableRef}
        friction={2}
        leftThreshold={40}
        renderLeftActions={(progress) => (
          <LeftAction
            progress={progress}
            handleDelete={() => {
              setSelectedItemId(item.id);
              setShowDeleteDialog(true);
            }}
          />
        )}
      >
        <View className="rounded-lg p-1 flex-row items-center mb-4 mx-1 border-gray-400 border bg-white dark:bg-black">
          <Image
            source={{ uri: item.media[0].transformed_url }}
            style={{ width: 60, height: 80, borderRadius: 4 }}
            contentFit="cover"
          />
          <View className="gap-y-3 flex-1 mx-4">
            <Text className="font-inter-semibold text-black dark:text-white">
              {item.title}
            </Text>
            <Text className="font-inter-medium text-sm text-gray-400">
              {item.description}
            </Text>
            <View className="flex-row items-center justify-between">
              {item.province && (
                <Text className="text-black dark:text-white">
                  {t(`provinces.${item.province.province}`)}
                </Text>
              )}
              <Text className="font-inter-medium text-gray-300 text-xs">
                {formatSmartDate(item.created_at, lang)}
              </Text>
            </View>
          </View>
          <View className="h-28 justify-between">
            <View style={{ direction: "rtl" }} className="mt-2 min-h-6">
              {item.price && (
                <Text className="font-semibold text-start text-black dark:text-white">
                  ${item.price}
                </Text>
              )}
            </View>
            <View className="flex-1 justify-evenly">
              {activeTab === "COMPLETED" ? (
                <TouchableOpacity
                  className="bg-primary-500 items-center py-1 px-3 mb-1 rounded-lg"
                  onPress={handleRepost}
                >
                  <Text className="text-sm">{t("profile.repost")}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="bg-error items-center py-1 px-3 mb-1 rounded-lg"
                  onPress={() => {
                    setSelectedItemId(item.id);
                    setShowDeleteDialog(true);
                  }}
                >
                  <Text className="text-sm text-white">{t("delete")}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity className="bg-success items-center py-1 px-3 mb-1 rounded-lg">
                <Text className="text-sm">{t("profile.editAd")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <Container header={<ProfileHeader title={t("profile.myAds")} />}>
      <View className="flex-1 mx-2 mt-4">
        <View className="flex-row items-center justify-center gap-8">
          <TouchableOpacity onPress={() => setActiveTab("COMPLETED")}>
            <Text
              className={`text-black dark:text-white font-inter-medium text-lg border-b-2 border-${activeTab === "COMPLETED" ? "primary-500" : "gray-300"}`}
            >
              {t("profile.completed")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("ACTIVE")}>
            <Text
              className={`text-black dark:text-white font-inter-medium text-lg border-b-2 border-${activeTab === "ACTIVE" ? "primary-500" : "gray-300"}`}
            >
              {t("profile.active")}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 mt-4">
          {isLoading ? (
            <AdSkeletonList />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              className="my-4"
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
              onEndReachedThreshold={0.5}
              refreshing={isLoading}
              onRefresh={refetch}
              contentContainerStyle={
                data?.length === 0 ? {} : { paddingBottom: 40 }
              }
              ListEmptyComponent={
                !isLoading ? (
                  <EmptyState
                    showReset={false}
                    title=""
                    description="noAdsYet"
                  />
                ) : null
              }
            />
          )}
        </View>
      </View>
      <ConfirmDeleteDialog
        show={showDeleteDialog}
        setShow={setShowDeleteDialog}
        title="deleteAd"
        description="confirmDeleteAd"
        onDelete={() => {
          selectedItemId && mutate(selectedItemId);
          setShowDeleteDialog(false);
        }}
      />
    </Container>
  );
}
