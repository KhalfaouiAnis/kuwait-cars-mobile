import SuccessIcon from "@/assets/svg/success";
import Container from "@/core/components/ui/container";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AdPublishSuccess() {
    return (
        <Container>
            <View className="flex-1 items-center justify-center mt-32">
                <View className="flex-1">
                    <View className="items-center justify-center">
                        <SuccessIcon />
                    </View>
                    <View className="px-4 mt-8">
                        <Text className="text-2xl text-center font-inter-bold">Success !</Text>
                        <Text className="mt-2 text-base text-center">Your car has been successfully published and is now visible to buyers</Text>
                    </View>
                </View>
                <View className="px-4 flex-1 w-full">
                    <Link href={"/(protected)/(profile)/my-ads"} asChild>
                        <Pressable className="bg-primary-500 py-3 mt-4 rounded-lg items-center">
                            <Text className="text-lg font-inter-bold text-secondary-900">View my listing</Text>
                        </Pressable>
                    </Link>
                    <Link href={"/categories"} asChild>
                        <Pressable className="bg-primary-500 py-3 mt-4 rounded-lg items-center">
                            <Text className="text-lg font-inter-bold text-secondary-900">Main menu</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </Container>
    )
}