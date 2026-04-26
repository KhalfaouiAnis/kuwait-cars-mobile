import AppLogo from "@/assets/svg/logo";
import AuthHeader from "@/core/components/layout/header/auth-header";
import Container from "@/core/components/ui/container";
import { boxShadow } from "@/core/utils/cn";
import { PropsWithChildren } from "react";
import { ScrollView, Text, View } from "react-native";

export default function FormWrapper({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <Container>
      <AuthHeader />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="items-center bg-white dark:bg-black"
      >
        <View className="pt-2">
          <AppLogo size={150} />
        </View>
        <View
          className="w-full pt-5 mt-5 bg-white dark:bg-darkish rounded-t-[36px]"
          style={boxShadow(2, 2, 20, 0, "rgb(183 183 183 / 0.5)").button}
        >
          <View className="items-center justify-center w-full">
            <Text className="font-inter-semibold text-xl dark:text-white">{title}</Text>
          </View>
          <View className="rounded-t-[30px] h-full">{children}</View>
        </View>
      </ScrollView>
    </Container>
  );
}
