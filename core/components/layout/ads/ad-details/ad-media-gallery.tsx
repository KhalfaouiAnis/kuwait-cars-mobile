import ThreeDots from "@/assets/svg/ThreeDots";
import ReportAdModal from "@/core/components/layout/ads/reporting/report-ad-modal";
import { FavoriteButton } from "@/core/components/ui/button/favorite-button";
import { FlagButton } from "@/core/components/ui/button/flag-button";
import { ShareButton } from "@/core/components/ui/button/share-button";
// import Switch from "@/core/components/ui/button/switch";
import VideoPlayer from "@/core/components/ui/shared/video-player";
import { IMAGES } from "@/core/constants/images";
import { useViewTracker } from "@/core/hooks/ad/useViewTracker";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import {
    useIncrementAdViews,
    useToggleFavorite,
} from "@/core/services/ads/ad.mutations";
import useAuthStore from "@/core/store/auth.store";
import { AdvertisementInterface } from "@/core/types";
import { formatViews } from "@/core/utils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDate } from "date-fns";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { memo, useCallback, useState } from "react";
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const AdMediaGalleryComponent = memo(function Advertisement({ ad, currentIndex }: { ad: AdvertisementInterface, currentIndex: number }) {
    const [activeHorizontalIndex, setActiveHorizontalIndex] = useState(currentIndex || 0);
    const [hideActions, setHideActions] = useState(false);
    const isGuest = useAuthStore(state => state.isGuest);
    const { mutate: recordView } = useIncrementAdViews();
    const { mutate: favorite } = useToggleFavorite();
    const [visible, setVisible] = useState(false)
    const { protectAction } = useAuthGuard();
    const router = useRouter()

    useViewTracker(ad.id, true, recordView);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setActiveHorizontalIndex(index);
    };

    const handleToggleActions = useCallback(() => {
        setHideActions((state) => !state)
    }, [])

    const handleNavigate = () => {
        protectAction(() => router.push("/create"))
    }

    return (
        <View style={{ width, position: "relative" }}>
            {ad.media.length === 1 ? (
                <View style={{ width, height }}>
                    {ad.media[0].media_type === "VIDEO" ? (
                        <VideoPlayer
                            autoPlay
                            isVisible={true}
                            source={ad.media[0].transformed_url}
                        />
                    ) : (
                        <Image
                            source={{ uri: ad.media[0].transformed_url }}
                            style={styles.fullScreenImage}
                            contentFit="cover"
                            transition={200}
                        />
                    )}
                </View>
            ) : (
                <ScrollView
                    horizontal
                    pagingEnabled
                    snapToInterval={width}
                    decelerationRate="fast"
                    snapToAlignment="start"
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={handleScroll}
                    showsHorizontalScrollIndicator={false}
                >
                    {ad.media.sort((a, b) => b.media_type.localeCompare(a.media_type))
                        .map((item, index) => (
                            <View style={{ width, height }} key={item.public_id}>
                                {item.media_type === "VIDEO" ? (
                                    <VideoPlayer
                                        autoPlay
                                        source={item.transformed_url}
                                        isVisible={index === activeHorizontalIndex}
                                    />
                                ) : (
                                    <Image
                                        contentFit="cover"
                                        style={styles.fullScreenImage}
                                        source={{ uri: item.transformed_url }}
                                    />
                                )}
                            </View>
                        ))}
                </ScrollView>
            )}

            <View style={styles.rightSidebar}>
                {!hideActions && <>
                    <FlagButton
                        isFlagged={ad.is_flagged ?? false}
                        onPress={() => setVisible(true)}
                        disabled={isGuest}
                        color="white"
                        size={24}
                    />
                    <MaterialCommunityIcons name="file-download-outline" size={24} color="white" />
                    <FavoriteButton
                        isFavorite={ad.is_favorited ?? false}
                        onPress={() => favorite(ad.id)}
                        disabled={isGuest}
                        color="white"
                        size={24}
                    />
                    <ShareButton
                        onPress={() => { }}
                        disabled={isGuest}
                        color="white"
                        size={24}
                    />
                    <View>
                        <Ionicons name="eye-outline" color="white" size={22} />
                        <Text className="text-white text-xs text-center">
                            {formatViews(ad.views || 0)}
                        </Text>
                    </View>
                </>}
                <Switch
                    value={hideActions}
                    onValueChange={handleToggleActions}
                    thumbColor={hideActions ? "black" : "white"}
                    trackColor={{ false: "#B8C4CE", true: "#B8C4CE" }}
                />
                <TouchableOpacity
                    disabled={hideActions}
                    onPress={handleNavigate}
                    style={{ opacity: hideActions ? 0 : 1 }}
                    className="p-2 rounded-full bg-primary-500"
                >
                    <Ionicons name="add" size={34} />
                </TouchableOpacity>

                <Text className="text-white text-xs mt-2" style={{ opacity: hideActions ? 0 : 1 }}>
                    {ad.id}
                </Text>
            </View>

            <View style={styles.dots}>
                <ThreeDots />
            </View>

            {
                !hideActions && (
                    <View style={styles.bottomInfo}>
                        <Text className="text-white text-xs ms-2">
                            {activeHorizontalIndex}/{ad.media.length}
                        </Text>
                        <View className="flex-row gap-2 mt-2 items-center">
                            <Image
                                source={ad.user?.avatar ? { uri: ad.user.avatar.original_url } : IMAGES.DefaultAvatar}
                                contentFit="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 999,
                                }}
                            />
                            <View>
                                <Text className="font-inter-semibold text-white/50 text-[10px]">
                                    {ad.user?.fullname}
                                </Text>
                                <Text className="font-inter-semibold text-white/50 text-[10px] ms-1 -mt-1">
                                    Since {formatDate(ad.user?.created_at || new Date(), "yyyy")}
                                </Text>
                            </View>
                        </View>

                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="font-inter-medium text-lg text-white"
                        >
                            {ad.title}
                        </Text>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            className="font-inter-medium text-sm text-[#A3A2A2]"
                        >
                            {ad.description}
                        </Text>
                    </View>
                )
            }

            <ReportAdModal visible={visible} setVisible={setVisible} />
        </View>
    );
});

export default AdMediaGalleryComponent;

const styles = StyleSheet.create({
    rightSidebar: {
        position: "absolute",
        alignItems: "flex-end",
        bottom: 40,
        right: 10,
        gap: 30,
    },
    bottomInfo: {
        position: "absolute",
        bottom: 80,
        right: 80,
        left: 10,
    },
    fullScreenImage: {
        width: width,
        height: height,
    },
    dots: {
        position: "absolute",
        bottom: 200,
        left: "46%",
    }
});
