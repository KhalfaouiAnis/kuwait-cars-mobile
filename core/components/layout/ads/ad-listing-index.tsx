import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Container from "../../ui/container";
import MainHeader from "../header/main/main-header";
import { AdsListing } from "./ad-listing";
import { MainFilters } from "./filters/main-filters";

interface Props {
    filterConfig: any
}

export default function AdCategoryIndex({ filterConfig }: Props) {
    const { dark } = useTheme()
    const { protectAction } = useAuthGuard()
    const [view, setView] = useState<"vertical" | "horizontal">("vertical");

    const handleNavigate = () => {
        protectAction(() => router.push("/create"))
    }

    return (
        <Container
            header={
                <View className="flex mb-2 mt-4 pl-0.5">
                    <MainHeader back={true} />
                    <View className="mt-2">
                        <MainFilters
                            isDark={dark}
                            setView={setView}
                            filterConfig={filterConfig}
                        />
                    </View>
                </View>
            }
        >
            <View className="px-0.5 relative flex-1">
                <AdsListing view={view} />
                <TouchableOpacity
                    className="absolute right-5 bottom-3 z-20 p-2 rounded-full bg-primary-500"
                    onPress={handleNavigate}
                >
                    <Ionicons name="add" size={38} />
                </TouchableOpacity>
            </View>
        </Container>
    )
}