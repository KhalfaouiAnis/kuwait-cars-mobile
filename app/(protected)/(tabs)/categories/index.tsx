import MainHeader from "@/core/components/layout/header/main-header";
import Container from "@/core/components/ui/container";
import { images } from "@/core/constants/images";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function CategoriesScreen() {
    return (
        <Container
            header={<MainHeader drawer back={false} />}
            scrollable
        >
            <View className="mt-4 flex-row items-center gap-2 mx-2 flex-wrap">
                <Link href={"/categories/4f5f4/"}>
                    <View className="items-center gap-y-2 w-[108px] p-2 inset-0 border border-primary-500 rounded-xl">
                        <Image
                            source={images.BrakesCategory}
                            style={{ width: 70, height: 70, objectFit: "cover" }}
                        />
                        <Text className="font-inter-medium text-center">Brakes</Text>
                    </View>
                </Link>
                <View className="items-center gap-y-2 w-[108px] p-2 inset-0 border border-primary-500 rounded-xl">
                    <Image
                        source={images.CarAccessoriesCategory}
                        style={{ width: 70, height: 70, objectFit: "cover" }}
                    />
                    <Text className="font-inter-medium text-center">Car Accessories</Text>
                </View>
                <View className="items-center gap-y-2 w-[108px] p-2 inset-0 border border-primary-500 rounded-xl">
                    <Image
                        source={images.EngineCoolingSystemCategory}
                        style={{ width: 70, height: 70, objectFit: "cover" }}
                    />
                    <Text className="font-inter-medium text-center">Engine cooling</Text>
                </View>
                <View className="items-center gap-y-2 w-[108px] p-2 inset-0 border border-primary-500 rounded-xl">
                    <Image
                        source={images.ZerexG05PhosphateCategory}
                        style={{ width: 70, height: 70, objectFit: "cover" }}
                    />
                    <Text className="font-inter-medium text-center">Zerex Phosphate</Text>
                </View>
                <View className="items-center gap-y-2 w-[108px] p-2 inset-0 border border-primary-500 rounded-xl">
                    <Image
                        source={images.AirConditionCategory}
                        style={{ width: 70, height: 70, objectFit: "cover" }}
                    />
                    <Text className="font-inter-medium text-center">Air Condition</Text>
                </View>
                <View className="items-center gap-y-2 w-[108px] p-2 inset-0 border border-primary-500 rounded-xl">
                    <Image
                        source={images.LexusNX250Category}
                        style={{ width: 100, height: 50, objectFit: "cover" }}
                    />
                    <Text className="font-inter-medium text-center">Lexus NX250</Text>
                </View>
                <View className="items-center gap-y-2 w-[108px] p-2 inset-0 border border-primary-500 rounded-xl">
                    <Image
                        source={images.BlackHawkStreetHU01UHPCategory}
                        style={{ width: 70, height: 70, objectFit: "cover" }}
                    />
                    <Text className="font-inter-medium text-center">Black Hawk Street</Text>
                </View>
                <View className="items-center gap-y-2 w-[108px] p-2 inset-0 border border-primary-500 rounded-xl">
                    <Image
                        source={images.BMW3SeriesE46Category}
                        style={{ width: 70, height: 70, objectFit: "cover" }}
                    />
                    <Text className="font-inter-medium text-center">BMW 3 Series</Text>
                </View>
            </View>
        </Container>
    )
}