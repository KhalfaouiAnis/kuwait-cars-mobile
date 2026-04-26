import { IMAGES } from "@/core/constants/images";
import { Image } from "expo-image";
import { View } from "react-native";

export default function SocialLinks() {
    return (
        <View className="bg-transparent flex-row items-center self-center gap-3">
            <Image source={IMAGES.Logo} style={{ width: 40, height: 40, borderRadius: 99 }} contentFit="contain" />
            <Image source={IMAGES.Tiktok} style={{ width: 40, height: 40, borderRadius: 99 }} contentFit="contain" />
            <Image source={IMAGES.Facebook} style={{ width: 40, height: 40, borderRadius: 99 }} contentFit="contain" />
            <Image source={IMAGES.Insta} style={{ width: 40, height: 40, borderRadius: 99 }} contentFit="contain" />
            <Image source={IMAGES.Snap} style={{ width: 40, height: 40, borderRadius: 99 }} contentFit="contain" />
            <Image source={IMAGES.Whats} style={{ width: 40, height: 40, borderRadius: 99 }} contentFit="contain" />
        </View>
    )
}