import Container from "@/core/components/ui/container";
import { images } from "@/core/constants/images";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

export default function AuthenticationSuccessScreen() {
    return (
        <Container>
            <View className="mt-20 items-center">
                <Image source={images.Logo} style={{ width: 180, height: 180, objectFit: "cover" }} />
            </View>
            <View className="px-4 mt-8">
                <Text className="text-2xl font-bold text-center">Success !</Text>
                <Text className="mt-2 text-base text-center">Congratulations! You have been successfully authenticated</Text>
            </View>
            <View className="px-4 mt-52">
                <TouchableOpacity className="bg-primary-500 py-3 mt-4 rounded-lg items-center">
                    <Text className="text-lg font-bold text-secondary-900">Update Password</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}