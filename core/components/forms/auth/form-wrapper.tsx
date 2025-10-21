import Container from "@/core/components/ui/container";
import { images } from "@/core/constants/images";
import { useKeyboardScroll } from "@/core/hooks/use-keyboard-scroll";
import { Image } from "expo-image";
import { PropsWithChildren } from "react";
import { ScrollView, Text, View } from "react-native";
import AuthHeader from "./auth-header";

export default function FormWrapper({ children, title }: PropsWithChildren<{ title: string }>) {
    const keyboardHeight = useKeyboardScroll()

    return (
        <Container>
            <AuthHeader />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerClassName="items-center bg-white">
                <View className="pt-6">
                    <Image source={images.Logo} style={{ width: 160, height: 160, objectFit: "cover" }} />
                </View>
                <View className="w-full pt-5 mt-5 bg-primary-500 rounded-t-[26px]">
                    <View className="items-center justify-center w-full">
                        <Text className="font-semibold text-xl">{title}</Text>
                    </View>
                    <View className="bg-white mt-5 rounded-t-[30px]" style={{ paddingBottom: keyboardHeight }}>
                        {children}
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}
