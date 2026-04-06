import ReportAdModal from "@/core/components/layout/ads/reporting/report-ad-modal";
import { FavoriteButton } from "@/core/components/ui/button/favorite-button";
import { FlagButton } from "@/core/components/ui/button/flag-button";
import { ShareButton } from "@/core/components/ui/button/share-button";
import VideoPlayer from "@/core/components/ui/shared/video-player";
import { useViewTracker } from "@/core/hooks/ad/useViewTracker";
import {
    useIncrementAdViews,
    useToggleFavorite,
} from "@/core/services/ads/ad.mutations";
import useAuthStore from "@/core/store/auth.store";
import { AdvertisementInterface } from "@/core/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { memo, useState } from "react";
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const AdMediaGalleryComponent = memo(function Advertisement({ ad, currentIndex }: { ad: AdvertisementInterface, currentIndex: number }) {
    const [activeHorizontalIndex, setActiveHorizontalIndex] = useState(currentIndex || 0);
    const isGuest = useAuthStore(state => state.isGuest);
    const { mutate: recordView } = useIncrementAdViews();
    const { mutate: favorite } = useToggleFavorite();
    const [visible, setVisible] = useState(false)

    useViewTracker(ad.id, true, recordView);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setActiveHorizontalIndex(index);
    };

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
                <Text className="text-white text-xs text-center">
                    {activeHorizontalIndex}/{ad.media.length}
                </Text>
            </View>

            <ReportAdModal visible={visible} setVisible={setVisible} />
        </View>
    );
});

export default AdMediaGalleryComponent;

const styles = StyleSheet.create({
    rightSidebar: {
        position: "absolute",
        alignItems: "center",
        bottom: 40,
        right: 10,
        gap: 30,
    },
    bottomInfo: {
        position: "absolute",
        bottom: 40,
        right: 80,
        left: 10,
    },
    fullScreenImage: {
        width: width,
        height: height,
    },
});
