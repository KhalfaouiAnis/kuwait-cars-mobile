import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

interface Props {
    href: any,
    image: any,
    label: string
}

export default function CategoryLink({ href, image, label }: Props) {
    return (
        <Link href={href} className="items-center justify-center w-[31%] h-36 p-2 border border-primary-500 rounded-xl bg-white">
            <View className="w-full items-center justify-center">
                <Image
                    source={image}
                    style={{ width: 90, height: 70, objectFit: "contain" }}
                />
            </View>
            <View className="w-full justify-center items-center">
                <Text className="font-inter-medium text-center" numberOfLines={2}>{label}</Text>
            </View>
        </Link>
    )
}