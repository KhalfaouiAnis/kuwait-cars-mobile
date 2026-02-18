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
           border border-transparent rounded-xl bg-transparent`}
      >
        <View
          style={[boxShadow(4, 6, 14).button, { borderRadius: 30, width: 90, height: 70 }]}
          className="p-1 justify-center items-center bg-white dark:bg-darkish dark:border-[#46464640] border border-transparent">
          <Image
            source={image}
            style={{
              width: 64,
              height: 60,
              borderRadius: 30,
              backgroundColor: "transparent",
            }}
            contentFit="cover"
          />
        </View>
        <View className="justify-center mt-3">
          <Text
            numberOfLines={2}
            className="font-inter text-center text-blue text-xs"
          >
            {label}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
