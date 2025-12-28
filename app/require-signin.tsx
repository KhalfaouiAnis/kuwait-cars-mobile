import Container from "@/core/components/ui/container";
import Header from "@/core/components/ui/Header";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <Container>
            <Header title="back" />
            <View className="flex-1 items-center justify-center">
                <Ionicons color="#D80027" name="close-circle" size={100} />
                <Text className="font-inter-semibold mt-6">Please sign in to continue.</Text>
                <Link className="bg-primary-500 font-inter-semibold text-center text-base py-2 px-4 rounded-md mt-6" href={"/signin"}>Sign In</Link>
            </View>
        </Container>
    );
}
