import ProfileHeader from "@/core/components/layout/header/profile-header";
import { SettingsLink } from "@/core/components/ui/_links/settings-link";
import Switch from "@/core/components/ui/button/switch";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { authStore } from "@/core/lib/stores/auth.store";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ProfileScreen() {
    const { signOut, user } = authStore.getState();

    return (
        <Container
            scrollable
            backgroundColor="#FAED02"
            header={<ProfileHeader title="Profile" />}
        >
            <View className="flex-1 mt-2 bg-white px-4 py-2">
                <View className="flex-row justify-between w-full border border-primary-500 rounded-lg px-4 pt-1 pb-3">
                    <View>
                        <Text className="font-inter-bold text-xl">{user?.fullname}</Text>
                        <Text className="my-2 font-inter">View and edit profile</Text>
                        <View className="flex-row items-start">
                            <Ionicons name="location-outline" size={20} color="#FAED02" />
                            <Text className="ms-2">{user?.city}</Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <View className="relative">
                            <Image
                                source={user?.avatar
                                    ? { uri: `${process.env.EXPO_PUBLIC_API_URL}${user?.avatar}` }
                                    : IMAGES.DefaultAvatar}
                                style={{ width: 75, height: 75, borderRadius: 50 }}
                                contentFit="cover"
                            />
                            <Pressable className="absolute -left-7 bottom-1 z-10 bg-white rounded-full p-2">
                                <Ionicons name="camera-outline" size={24} />
                            </Pressable>
                        </View>
                        <Link href={"/profile-edit"} className="bg-primary-500 rounded-lg w-full mt-4">
                            <View className="flex-row px-3 py-2 items-center justify-center gap-1">
                                <Text className="font-inter-semibold text-sm">Edit Profile</Text>
                                <Feather name="edit-3" size={16} color="black" />
                            </View>
                        </Link>
                    </View>
                </View>

                <View className="flex-1 py-2 px-4 mt-4 border bg-white border-primary-500 rounded-lg gap-y-6">
                    <SettingsLink
                        href={"/change-password"}
                        icon={<Feather name="key" size={24} color="black" />}
                        label="Change password" />
                    <SettingsLink href={"/my-ads"}
                        icon={<MaterialCommunityIcons name="text-box-multiple-outline" size={24} color="black" />}
                        label="My ads" />
                    <SettingsLink href={"/(profile)/(audio)/index"}
                        icon={<Ionicons name="card" size={24} color="black" />}
                        label="My payments" />
                    <SettingsLink href={"/recently-viewed"}
                        icon={<Ionicons name="eye-outline" size={24} color="black" />}
                        label="Recently viewed" />
                    <SettingsLink href={"/general-condition"}
                        icon={<AntDesign name="exclamation-circle" size={24} color="black" />}
                        label="General condition" />
                    <SettingsLink href={"/change-language"} icon={<Ionicons name="language-outline" size={24} color="black" />} label="Language" />
                    <View className="w-full  flex-row items-center">
                        <MaterialIcons name="notifications-active" size={24} color="black" />
                        <Text className="ms-2 me-auto">Notification</Text>
                        <Switch value={true} onValueChange={() => { }} />
                    </View>

                    <SettingsLink
                        href={"/"}
                        icon={<Ionicons name="call-outline" size={24} color="black" />}
                        label="Contact customer service" />
                    <SettingsLink onPress={signOut} icon={<Ionicons name="log-out-outline" size={24} color="black" />} label="Logout" />
                </View>
            </View>
        </Container>
    )
}