import SuccessIcon from "@/assets/svg/success";
import Container from "@/core/components/ui/container";
import { Text, TouchableOpacity, View } from "react-native";

export default function AuthenticationSuccessScreen() {
    return (
        <Container>
            <View className="mt-20 items-center">
                <SuccessIcon />
            </View>
            <View className="px-4 mt-8">
                <Text className="text-2xl text-center font-inter-bold dark:text-white">Success !</Text>
                <Text className="mt-2 text-base text-center dark:text-white">Congratulations! You have been successfully authenticated</Text>
            </View>
            <View className="px-4 mt-52">
                <TouchableOpacity className="bg-primary-500 py-3 mt-4 rounded-lg items-center">
                    <Text className="text-lg font-inter-bold text-secondary-900">Update Password</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}