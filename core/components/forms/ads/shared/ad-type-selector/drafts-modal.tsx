import { AdSkeletonList } from "@/core/components/layout/skeletons/ad-skeleton-list";
import AppModal from "@/core/components/ui/dialog/modal";
import { IMAGES } from "@/core/constants/images";
import { useAdDraftMutations } from "@/core/services/ads/ad.drafts.mutations";
import { useAdDraftsQueries } from "@/core/services/ads/ad.drafts.queries";
import { useAdDraftStore } from "@/core/store/adDrafts.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdDraftInterface } from "@/core/types/schema/shared";
import { boxShadow } from "@/core/utils/cn";
import { formatSmartDate } from "@/core/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
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

interface Props {
    visible: boolean;
    reachedLimit: boolean;
    onClose: () => void
}

export default function AdDraftsModal({ visible, reachedLimit, onClose }: Props) {
    const { drafts, setActiveDraft, syncWithServer } = useAdDraftStore()
    const { t } = useTranslation("common");
    const swipeableRef = useRef<any>(null);
    const { lang } = useUserPreferencesStore();
    const { fetchDrafts: { data: serverDrafts, isLoading, isSuccess } } = useAdDraftsQueries();
    const { deleteDraft, deleteAllDrafts } = useAdDraftMutations();

    const handleEditDraft = (draftId: string) => {
        setActiveDraft(draftId);
        router.navigate({ pathname: `/create/${drafts[draftId].ad_type}` as any });
        onClose()
    };

    useEffect(() => {
        if (isSuccess && serverDrafts) {
            syncWithServer(serverDrafts);
        }
    }, [isSuccess, serverDrafts, syncWithServer])

    const renderItem = ({ item }: { item: AdDraftInterface }) => {
        return (
            <Swipeable
                friction={2}
                ref={swipeableRef}
                leftThreshold={40}
                renderLeftActions={(progress) => (
                    <LeftAction
                        progress={progress}
                        handleDelete={() => deleteDraft.mutate(item.id)}
                    />
                )}
            >
                <View className="rounded-lg p-1 flex-row items-center mb-4 mx-1 border-gray-400 border bg-white dark:bg-black">
                    {
                        item.content?.media && (
                            <Image
                                contentFit="cover"
                                style={{ width: 80, height: 80, borderRadius: 6 }}
                                source={item.content?.media?.[0]?.transformed_url ? { uri: item?.content?.media?.[0]?.transformed_url } : IMAGES.DefaultImage}
                            />
                        )
                    }
                    <View className="gap-y-3 flex-1 mx-4">
                        <Text className="font-inter-semibold text-black dark:text-white">
                            {item.content?.title}
                        </Text>
                        <Text className="font-inter-medium text-sm text-gray-400">
                            {item.content?.description}
                        </Text>
                        <View className="flex-row items-center justify-between">
                            {item.content?.province && (
                                <Text className="text-black dark:text-white">
                                    {t(`provinces.${item.content?.province?.province}`)}
                                </Text>
                            )}
                            <Text className="font-inter-medium text-gray-300 text-xs">
                                {formatSmartDate(item?.updated_at || new Date(), lang)}
                            </Text>
                        </View>
                    </View>
                    <View className="h-28 justify-between">
                        <View style={{ direction: "rtl" }} className="mt-2 min-h-6">
                            {item.content?.price && (
                                <Text className="font-semibold text-start text-black dark:text-white">
                                    ${item.content?.price}
                                </Text>
                            )}
                        </View>
                        <View className="flex-1 items-center justify-around">
                            <TouchableOpacity
                                className="bg-error items-center py-1 px-3 mb-1 rounded-lg"
                                onPress={() => deleteDraft.mutate(item.id)}
                            >
                                <Text className="text-sm text-white">{t("delete")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-success items-center py-1 px-3 mb-1 rounded-lg"
                                onPress={() => handleEditDraft(item.id)}
                            >
                                <Text className="text-sm">{t("profile.editAd")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Swipeable>
        );
    };

    return (
        <AppModal
            visible={visible}
            onClose={onClose}
            renderContent={() => (
                <View className="flex-1 mx-2">
                    {reachedLimit && (<View
                        style={boxShadow().button}
                        className="mx-2 py-2 items-center rounded-2xl border-[0.5px] border-blue"

                    >
                        <Text className="text-center text-error font-inter-medium">
                            You have reached your drafts limit.
                        </Text>
                        <Text className="text-center text-error font-inter-medium">
                            Delete one or more drafts to continue.
                        </Text>
                    </View>)}
                    <TouchableOpacity
                        className="bg-error items-center justify-center my-4 rounded-3xl self-center"
                        style={{ width: 166, height: 35, ...boxShadow(4, 6, 20, 0).button }}
                        onPress={() => deleteAllDrafts.mutate()}
                    >
                        <Text className="font-inter text-white">
                            {deleteAllDrafts.isPending ? <ActivityIndicator size="small" /> : 'Delete all drafts'}
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-1 mt-2">
                        {isLoading ? (
                            <AdSkeletonList />
                        ) : (
                            <FlatList
                                renderItem={renderItem}
                                data={Object.values(drafts)}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 40 }}
                                keyExtractor={(item) => item.id || new Date().getMilliseconds.toString()}
                            />
                        )}
                    </View>
                </View>
            )}
        />
    );
}
