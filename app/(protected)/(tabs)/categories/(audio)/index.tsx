import CallActionButtons from "@/core/components/layout/communication/call-action-buttons";
import Container from "@/core/components/ui/container";
import Header from "@/core/components/ui/Header";
import RoundedWavedView from "@/core/components/ui/shared/rounded-waved-view";
import { IMAGES } from "@/core/constants/images";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

export default function AudioCallScreen() {
    return (
        <Container header={<Header title="" />}>
            <LinearGradient
                className="flex-1 justify-center items-center rounded-lg"
                colors={['#fde68a', '#9ca3af']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <View className="flex-1 mt-12 items-center ">
                    <View className="flex-1 items-center gap-y-3">
                        <RoundedWavedView>
                            <Image source={IMAGES.AvatarVideoBoy} style={{ width: 168, height: 168, objectFit: "cover", borderRadius: 100 }} />
                        </RoundedWavedView>
                        <Text className="text-white text-2xl font-inter-semibold mt-12">Mohamed</Text>
                        <Text className="text-[#677185] text-xl font-inter">01:59</Text>
                    </View>
                    <CallActionButtons />
                </View>
            </LinearGradient>
        </Container>
    )
}
