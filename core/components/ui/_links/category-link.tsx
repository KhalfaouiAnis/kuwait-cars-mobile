import { boxShadow } from "@/core/utils/cn";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  href: any;
  image: any;
  label: string;
  params?: any;
  fullWidth?: boolean;
}

export default function CategoryLink({
  href,
  image,
  label,
  params,
  fullWidth = false,
}: Props) {
  return (
    <Link href={{ pathname: href, params }} asChild>
      <Pressable
        className={`items-center justify-center ${fullWidth ? "w-full" : "w-[31%]"} 
            h-36 p-2 border border-primary-500 rounded-xl bg-white dark:bg-black`}
        style={boxShadow(4, 6, 20, 0).button}
      >
        <View>
          <Image
            source={image}
            style={{
              width: 90,
              height: 70,
              objectFit: "contain",
              backgroundColor: "transparent",
            }}
          />
        </View>
        <View className="w-full justify-center items-center">
          <Text
            className="font-inter-medium text-center text-black dark:text-white"
            numberOfLines={2}
          >
            {label}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
