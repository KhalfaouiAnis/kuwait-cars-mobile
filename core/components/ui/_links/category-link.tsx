import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    href: any,
    image: any,
    label: string
    params?: any,
    fullWidth?: boolean
}

export default function CategoryLink({ href, image, label, params, fullWidth = false }: Props) {
    return (
        <Link
            href={{ pathname: href, params }}
            asChild
        >
            <Pressable className={`items-center justify-center ${fullWidth ? "w-full" : "w-[31%]"} 
            h-36 p-2 border border-primary-500 rounded-xl bg-white dark:bg-darkish`}
                style={styles.button}>
                <View>
                    <Image
                        source={image}
                        style={{ width: 90, height: 70, objectFit: "contain", backgroundColor: "transparent" }}
                    />
                </View>
                <View className="w-full justify-center items-center">
                    <Text className="font-inter-medium text-center text-black dark:text-white" numberOfLines={2}>{label}</Text>
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    button: {
        boxShadow: [
            {
                offsetX: 4,
                offsetY: 6,
                blurRadius: 20,
                spreadDistance: 0,
                color: 'rgb(000 000 000 / 0.15)',
            },
        ],
    },
});