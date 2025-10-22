import CameraIcon from "@/assets/svg/camera";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { images } from "@/core/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function EditProfileScreen() {
    return (
        <Container
            backgroundColor="#FAED02"
            header={<ProfileHeader title="Edit Profile" />}
        >
            <View className="flex-1 mt-2 bg-white px-4 py-2">
                <View className="flex-row justify-between w-full border border-primary-500 rounded-lg px-4 py-1">
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
                                <CameraIcon />
                            </Pressable>
                        </View>
                        <Link href={"/profile-edit"} className="flex-row px-4 py-2 bg-primary-500 rounded-lg mt-2">
                            <Text className="mr-2 font-inter-semibold">Edit Profile</Text>
                            <Ionicons name="pencil-outline" size={18} />
                        </Link>
                    </View>
                </View>

                <View className="flex-1 py-2 px-4 mt-4 border border-primary-500 rounded-lg gap-y-6">
                    <Link href={"/"} className="w-full flex-row items-center" asChild>
                        <View className="flex-row items-center">
                            <Ionicons name="key-outline" size={20} />
                            <Text className="ml-2">Change password</Text>
                            <Ionicons name="chevron-forward" size={20} className="ml-auto" />
                        </View>
                    </Link>
                    <Link href={"/"} className="w-full flex-row items-center" asChild>
                        <View className="flex-row items-center">
                            <Ionicons name="file-tray-stacked-outline" size={20} />
                            <Text className="ml-2">My ads</Text>
                            <Ionicons name="chevron-forward" size={20} className="ml-auto" />
                        </View>
                    </Link>
                    <Link href={"/"} className="w-full flex-row items-center" asChild>
                        <View className="flex-row items-center">
                            <Ionicons name="card-outline" size={20} />
                            <Text className="ml-2">My payments</Text>
                            <Ionicons name="chevron-forward" size={20} className="ml-auto" />
                        </View>
                    </Link>

                    <Link href={"/"} className="w-full flex-row items-center" asChild>
                        <View className="flex-row items-center">
                            <Ionicons name="eye-outline" size={20} />
                            <Text className="ml-2">Recently viewed</Text>
                            <Ionicons name="chevron-forward" size={20} className="ml-auto" />
                        </View>
                    </Link>
                    <Link href={"/"} className="w-full flex-row items-center" asChild>
                        <View className="flex-row items-center">
                            <Ionicons name="warning-outline" size={20} />
                            <Text className="ml-2">General condition</Text>
                            <Ionicons name="chevron-forward" size={20} className="ml-auto" />
                        </View>
                    </Link>
                    <Link href={"/"} className="w-full flex-row items-center" asChild>
                        <View className="flex-row items-center">
                            <Ionicons name="language-outline" size={20} />
                            <Text className="ml-2">Language</Text>
                            <Ionicons name="chevron-forward" size={20} className="ml-auto" />
                        </View>
                    </Link>
                    <Link href={"/"} className="w-full flex-row items-center" asChild>
                        <View className="flex-row items-center">
                            <Ionicons name="notifications" size={20} />
                            <Text className="ml-2">Notification</Text>
                            <Ionicons name="toggle-outline" size={20} className="ml-auto" />
                        </View>
                    </Link>
                    <Link href={"/"} className="w-full flex-row items-center" asChild>
                        <View className="flex-row items-center">
                            <Ionicons name="phone-portrait-outline" size={20} />
                            <Text className="ml-2">Contact customer service</Text>
                            <Ionicons name="chevron-forward" size={20} className="ml-auto" />
                        </View>
                    </Link>
                    <Link href={"/"} className="w-full flex-row items-center" asChild>
                        <View className="flex-row items-center">
                            <Ionicons name="log-out-outline" size={20} />
                            <Text className="ml-2">Logout</Text>
                            <Ionicons name="chevron-forward" size={20} className="ml-auto" />
                        </View>
                    </Link>
                </View>
            </View>
        </Container>
    )
}