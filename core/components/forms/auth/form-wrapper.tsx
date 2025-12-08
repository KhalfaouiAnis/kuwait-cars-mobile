import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { Image } from "expo-image";
import { PropsWithChildren } from "react";
import { ScrollView, Text, View } from "react-native";
import AuthHeader from "./auth-header";

export default function FormWrapper({ children, title }: PropsWithChildren<{ title: string }>) {
    return (
        <Container>
            <AuthHeader />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerClassName="items-center bg-white dark:bg-darkish">
                <View className="pt-6">
                    <Image source={IMAGES.Logo} style={{ width: 160, height: 160, objectFit: "cover" }} />
                </View>
                <View className="w-full pt-5 mt-5 bg-primary-500 rounded-t-[26px]">
                    <View className="items-center justify-center w-full">
                        <Text className="font-semibold text-xl">{title}</Text>
                    </View>
                    <View className="bg-white mt-5 rounded-t-[30px] dark:bg-darkish">
                        {children}
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}
