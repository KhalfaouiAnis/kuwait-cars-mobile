import DynamicIcon from "@/core/components/layout/ads/advanced-search/dynamic-icon";
import { DIMENSIONS } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { forwardRef } from "react";
import { Pressable, Text, View } from "react-native";

const FilterButton = forwardRef(({ label, icon, onPress, family = "AntDesign" }: any, ref) => {
  const { isRTL } = useUserPreferencesStore();
  const { dark } = useTheme()

  return (
    <Pressable
      ref={ref as any}
      onPress={onPress}
      style={{
        height: 48,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        width: DIMENSIONS.width - 80,
        boxShadow: boxShadow().button.boxShadow
      }}
      className="dark:bg-darkish"
    >
      <View className='items-center me-4 ms-4'>
        <DynamicIcon family={family} icon={icon} color={dark ? "white" : "black"} />
      </View>
      <View>
        <Text className='font-inter text-base dark:text-white'>{label}</Text>
      </View>
      <View className='ms-auto'>
        <Ionicons size={20} name={isRTL ? 'chevron-back' : 'chevron-forward'} color={dark ? "white" : "black"} />
      </View>
    </Pressable>
  )
});

FilterButton.displayName = "FilterButton"
export default FilterButton