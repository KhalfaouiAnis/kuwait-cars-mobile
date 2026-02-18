import { boxShadow, cn } from "@/core/utils/cn";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  borderRadius?: number
  square?: boolean
}

export default function RadioButton({
  label,
  selected,
  onPress,
  square,
  disabled,
  fullWidth = false,
  borderRadius = 15,
}: RadioButtonProps) {
  const { t } = useTranslation("common")
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.wrapper, { borderRadius, width: square ? 40 : undefined }]}
      className={cn("p-3  border border-grayish", {
        "bg-[#D9D9D9]": selected,
        "bg-white": !selected,
        "flex-1": fullWidth,
      })}
    >
      <Text
        className="text-center font-semibold dark:text-white"
        numberOfLines={1}
      >
        {t(label)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    ...boxShadow().button,
  }
});