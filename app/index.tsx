import Container from "@/core/components/ui/container";
import { icons } from "@/core/constants/icons";
import { images } from "@/core/constants/images";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <Container>
      <View className="flex-1 items-center mt-12">
        <View className="flex items-center">
          <Image source={images.Logo} style={{ width: 175, height: 175, objectFit: 'contain' }} />
          <Text className="font-extrabold text-2xl mt-12">Welcome to Kiwait Car</Text>
          <Text className="font-semibold text-lg">Welcome to Kiwait Car</Text>
        </View>
        <View className="flex items-center mt-8 gap-y-4">
          <Link className="border border-[#FAED02] font-bold text-center py-4 w-[300px] rounded-md" href="/(auth)/signin">Sign In</Link>
          <Link className="border border-[#FAED02] font-bold text-center py-4 w-[300px] rounded-md" href="/(auth)/signup">Sign Up</Link>
          <Link className="border border-[#FAED02] font-bold text-center py-4 w-[300px] rounded-md" href="/(auth)/signin">As a Guest</Link>
          <Link className="font-normal text-sm self-end mr-4" href="/(auth)/signin">Skip →</Link>
        </View>
        <View className="flex items-center py-4">
          <Text className="text-[#B5B5B5] text-sm">or continue with</Text>
          <View className="flex-row mt-2 gap-x-10">
            <Image source={icons.Google} style={{ width: 60, height: 60, objectFit: 'contain' }} />
            <Image source={icons.Apple} style={{ width: 60, height: 60, objectFit: 'contain' }} />
            <Image source={icons.Facebook} style={{ width: 60, height: 60, objectFit: 'contain' }} />
          </View>
        </View>
      </View>
    </Container>
  );
}
