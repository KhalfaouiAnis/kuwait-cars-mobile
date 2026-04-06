import { AdsListing } from "@/core/components/layout/ads/ad-listing";
import { MainFilters } from "@/core/components/layout/ads/filters/main-filters";
import MainHeader from "@/core/components/layout/header/main/main-header";
import Container from "@/core/components/ui/container";
import { useUsedCarsFilterConfig } from "@/core/hooks/ad/useFilterConfig";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function SearchResultScreen() {
    const router = useRouter()
    const { protectAction } = useAuthGuard()
    const filterConfig = useUsedCarsFilterConfig()
    const [view, setView] = useState<"vertical" | "horizontal">("horizontal");

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
                            showReset
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
                    onPress={handleNavigate}
                    className="absolute right-5 bottom-3 z-20 p-2 rounded-full bg-primary-500"
                >
                    <Ionicons name="add" size={38} />
                </TouchableOpacity>
            </View>
        </Container>
    )
}