import DynamicIcon from "@/core/components/layout/ads/advanced-search/dynamic-icon";
import { DIMENSIONS } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { forwardRef } from "react";
import { Pressable, Text, View } from "react-native";

const FilterButton = forwardRef(({ label, icon, onPress, family = "AntDesign" }: any, ref) => {
  const { isRTL } = useUserPreferencesStore();

  return (
    <Pressable
      ref={ref as any}
      onPress={onPress}
      style={{
        height: 48,
        width: DIMENSIONS.width - 80,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "white",
        boxShadow: boxShadow().button.boxShadow
      }}
    >
      <View className='items-center me-4 ms-4'>
        <DynamicIcon family={family} icon={icon} color="black" />
      </View>
      <View>
        <Text className='font-inter'>{label}</Text>
      </View>
      <View className='ms-auto'>
        <Ionicons size={20} name={isRTL ? 'chevron-back' : 'chevron-forward'} />
      </View>
    </Pressable>
  )
});

FilterButton.displayName = "FilterButton"
export default FilterButton