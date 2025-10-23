import ProfileHeader from "@/core/components/layout/header/profile-header";
import { SettingsLink } from "@/core/components/ui/_links/settings-link";
import Container from "@/core/components/ui/container";
import { images } from "@/core/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ProfileScreen() {
    return (
        <Container 
            backgroundColor="#FAED02"
            header={<ProfileHeader title="Profile" />}
            >
            <View className="flex-1 mt-2 bg-white px-4 py-2">
                <View className="flex-row justify-between w-full border border-primary-500 rounded-lg px-4 pt-1 pb-3">
                    <View>
                        <Text className="font-inter-semibold text-xl">Mohamed Tunisia</Text>
                        <Text className="my-2 font-inter">View and edit profile</Text>
                        <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={20} color="#FAED02" />
                            <Text className="ml-2">Kuwait</Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <View className="relative">
                            <Image source={images.Logo} style={{ width: 75, height: 75 }} contentFit="cover" />
                            <Pressable className="absolute -left-7 bottom-1 z-10 bg-white rounded-full p-2">
                                <Ionicons name="camera-outline" size={24} />
                            </Pressable>
                        </View>
                        <Link href={"/profile-edit"} className="flex-row px-4 py-2 bg-primary-500 rounded-lg mt-4">
                            <Text className="mr-2 font-inter-semibold">Edit Profile</Text>
                            <Ionicons name="pencil-outline" size={18} />
                        </Link>
                    </View>
                </View>

                <View className="flex-1 py-2 px-4 mt-4 border border-primary-500 rounded-lg gap-y-6">
                    <SettingsLink href={"/change-password"} icon="key-outline" label="Change password" />
                    <SettingsLink href={"/my-ads"} icon="file-tray-stacked-outline" label="My ads" />
                    <SettingsLink href={"/"} icon="card-outline" label="My payments" />
                    <SettingsLink href={"/recently-viewed"} icon="eye-outline" label="Recently viewed" />
                    <SettingsLink href={"/general-condition"} icon="warning-outline" label="General condition" />

                    <SettingsLink href={"/change-language"} icon="language-outline" label="Language" />
                    <SettingsLink href={"/"} icon="notifications" label="Notification" />
                    <SettingsLink href={"/"} icon="phone-portrait-outline" label="Contact customer service" />
                    <SettingsLink href={"/"} icon="log-out-outline" label="Logout" />
                </View>
            </View>
        </Container>
    )
}