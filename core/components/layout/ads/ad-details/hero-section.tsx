import VideoIcon from "@/assets/svg/video-icon";
import { FavoriteButton } from "@/core/components/ui/button/favorite-button";
import { FlagButton } from "@/core/components/ui/button/flag-button";
import { ShareButton } from "@/core/components/ui/button/share-button";
import { useToggleFavorite } from "@/core/services/ads/ad.mutations";
import useAuthStore from "@/core/store/auth.store";
import { AdvertisementInterface, AdvertisementMedia } from "@/core/types";
import { formatViews } from "@/core/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");

const generateCloudinaryThumbnail = (url: string) => {
    return url.replace(/\.[^/.]+$/, ".jpg");
};

export default function HeroSection({ ad }: { ad: AdvertisementInterface }) {
    const [heroImage, setHeroImage] = useState(ad.media[0].transformed_url)
    const isGuest = useAuthStore(state => state.isGuest);
    const [currentIndex, setCurrentIndex] = useState(1)
    const { mutate: favorite } = useToggleFavorite();
    const router = useRouter()

    const renderMediaItem = ({ item, index }: { item: AdvertisementMedia, index: number }) => (
        <View key={item.public_id}>
            <Pressable
                className="relative"
                onPress={() => {
                    setHeroImage(item.media_type === "VIDEO" ? generateCloudinaryThumbnail(item.transformed_url) : item.transformed_url)
                    setCurrentIndex(index + 1)
                }}
            >
                {item.media_type === "VIDEO" && (
                    <View className="absolute top-2 start-2 z-10">
                        <VideoIcon />
                    </View>
                )}
                <Image
                    source={{ uri: item.media_type === "VIDEO" ? generateCloudinaryThumbnail(item.transformed_url) : item.transformed_url }}
                    style={styles.galleryImageWrapper}
                    contentFit="cover"
                />
            </Pressable>
        </View>
    );

    return (
        <View style={{ width, position: "relative" }}>
            <View style={{ width, height: height / 2, position: "relative" }}>
                <Pressable
                    onPress={() => router.navigate({ pathname: "/gallery", params: { id: ad.id, currentIndex } })}
                >
                    <Image
                        style={styles.fullScreenImage}
                        source={{ uri: heroImage }}
                        contentFit="cover"
                    />
                </Pressable>
                <View style={styles.pagination}>
                    <Text
                        ellipsizeMode="tail"
                        style={{ width: 28 }}
                        className="font-inter-medium text-xs text-white"
                    >
                        {currentIndex}/{ad.media.length}
                    </Text>
                    {
                        ad.media[currentIndex - 1]?.media_type === "VIDEO" && <Ionicons name="videocam-outline" color="white" size={16} />
                    }
                </View>
                <View style={styles.rightSidebar}>
                    <FlagButton
                        isFlagged={ad.is_flagged ?? false}
                        onPress={() => { }}
                        disabled={isGuest}
                        color="white"
                        size={24}
                    />
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
                </View>
            </View>
            <FlatList
                getItemLayout={(_, index) => ({ length: width / 4, offset: width / 4 * index, index })}
                data={ad.media.sort((a, b) => b.media_type.localeCompare(a.media_type))}
                contentContainerClassName="mt-3 mx-3 gap-2 pe-12"
                keyExtractor={(item) => item.public_id}
                showsHorizontalScrollIndicator={false}
                renderItem={renderMediaItem}
                horizontal
            />
        </View>
    );
}

const styles = StyleSheet.create({
    rightSidebar: {
        position: "absolute",
        alignItems: "center",
        zIndex: 50,
        bottom: 30,
        right: 10,
        gap: 20,
    },
    pagination: {
        backgroundColor: "#A8A8A8",
        justifyContent: "center",
        position: "absolute",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        display: "flex",
        opacity: 0.7,
        zIndex: 20,
        height: 17,
        bottom: 20,
        width: 50,
        left: 20,
    },
    fullScreenImage: {
        height: height / 2,
        width: width,
    },
    galleryImageWrapper: {
        borderColor: "#A8A8A8",
        position: "relative",
        width: width / 4,
        borderRadius: 10,
        borderWidth: 1,
        height: 69,
    }
});
