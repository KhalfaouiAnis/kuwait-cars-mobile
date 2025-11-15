import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function NewAdScreen() {
    return (
        <Container header={<ProfileHeader title="Post an Ad" />}>
            <View className="my-4 p-3 gap-3">
                <Link href={"/create/flowOne"}                >
                    <View className="py-3 w-full rounded-lg bg-primary-500">
                        <Text className="text-center font-inter-semibold text-xl">Cars for sale | Damaged cars</Text>
                    </View>
                </Link>
                <Link href={"/create/flowTwo"}                >
                    <View className="py-3 w-full rounded-lg bg-primary-500">
                        <Text className="text-center font-inter-semibold text-xl">Motorcycles</Text>
                    </View>
                </Link>
                <Link href={"/create/flowThree"}                >
                    <View className="py-3 w-full rounded-lg bg-primary-500">
                        <Text className="text-center font-inter-semibold text-xl">Home services...</Text>
                    </View>
                </Link>
            </View>
        </Container>
    )
}