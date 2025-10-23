import Container from "@/core/components/ui/container";
import Header from "@/core/components/ui/Header";
import { images } from "@/core/constants/images";
import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <Container>
            <Header title="No content" />
            <View className="flex-1 items-center justify-center">
                <Image source={images.NoContent} style={{ width: 200, height: 200 }} contentFit="cover" />
                <Text className="font-inter-semibold">Nothing here at the moment</Text>
            </View>
        </Container>
    );
}
