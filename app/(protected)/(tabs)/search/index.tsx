import SearchItem from "@/core/components/layout/ads/advanced-search/search-item";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { Ad_CATEGORIES } from "@/core/constants/ad";
import useUserPreferencesStore from "@/core/store/preferences.store";
import useAdvancedSearchStore from "@/core/store/search.store";
import { AntDesign, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SearchScreen() {
    const { appliedFilters: { ad_type }, setExternalFilter } = useAdvancedSearchStore()
    const { theme } = useUserPreferencesStore()
    const isDark = theme !== "light"

    return (
        <Container header={<ProfileHeader title="Choose your car" />}>
            <View className="p-2">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        Ad_CATEGORIES.map(category => (
                            <Pressable key={category} onPress={() => setExternalFilter("ad_type", category)}>
                                <View className={`ml-2 border border-[#EFEFEF] p-2 rounded-lg flex-row items-center dark:bg-darkish ${ad_type === category ? "border-primary-500" : ""}`}>
                                    <Text className="mr-2 text-black dark:text-white">{category}</Text>
                                </View>
                            </Pressable>
                        ))
                    }
                </ScrollView>
                <View className="mt-6 gap-y-4">
                    <SearchItem
                        content={<></>}
                        label="Location"
                        isDark={isDark}
                        icon={<Octicons name="location" size={20} color={isDark ? "white" : "black"} />}
                    />
                    <SearchItem
                        content={<></>}
                        label="Brand & Model"
                        isDark={isDark}
                        icon={<Ionicons name="car-sport" size={20} color={isDark ? "white" : "gray"} />}
                    />
                    <SearchItem
                        content={<></>}
                        label="Budget"
                        isDark={isDark}
                        icon={<AntDesign name="dollar" size={20} color={isDark ? "white" : "black"} />}
                    />
                    <SearchItem
                        content={<></>}
                        label="Model year"
                        isDark={isDark}
                        icon={<Ionicons name="calendar" size={20} color={isDark ? "white" : "black"} />}
                    />
                    <SearchItem
                        content={<></>}
                        label="Kms Driven"
                        isDark={isDark}
                        icon={<MaterialCommunityIcons name="signal-distance-variant" size={20} color={isDark ? "white" : "black"} />}
                    />
                    <SearchItem
                        content={<></>}
                        label="Color"
                        isDark={isDark}
                        icon={<Ionicons name="color-palette-outline" size={20} color={isDark ? "white" : "black"} />}
                    />
                    <TouchableOpacity className="rounded-lg bg-primary-500 py-3 mx-6 mt-6 px-12">
                        <Text className="text-center">555 offers</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    )
}