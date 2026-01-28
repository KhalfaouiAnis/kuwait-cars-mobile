import { boxShadow } from "@/core/utils/cn";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface Props {
  href: any;
  image: any;
  label: string;
  params?: any;
  fullWidth?: boolean;
}

export default function NewCategoryLink({
  href,
  image,
  label,
  params,
  fullWidth = false,
}: Props) {
  return (
    <Link href={{ pathname: href, params }} asChild>
      <Pressable
        className={`items-center justify-center ${fullWidth ? "w-[100px]" : "w-[100px]"} 
           border border-transparent rounded-xl bg-white dark:bg-black dark:border-darkish`}
      >
        <View style={[boxShadow(4, 6, 14).button, { borderRadius: 30, width: 100 }]} className="p-1 justify-center items-center bg-white dark:bg-black">
          <Image
            source={image}
            style={{
              width: 90,
              height: 70,
              borderRadius: 30,
              backgroundColor: "transparent",
            }}
            contentFit="cover"
          />
        </View>
        <View className="justify-center mt-2">
          <Text
            className="font-inter text-center text-black dark:text-white text-sm"
            numberOfLines={2}
          >
            {label}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
