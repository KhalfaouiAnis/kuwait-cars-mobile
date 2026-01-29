import { DIMENSIONS } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow, cn } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type InputProps<TForm extends FieldValues> = TextInputProps & {
  name: FieldPath<TForm>;
  control: Control<TForm>;
  placeholder: string;
  icon?: keyof typeof Ionicons.glyphMap;
  customIcon?: ReactNode;
  requiredMark?: boolean;
  label?: string;
  error?: string;
  endIcon?: keyof typeof Ionicons.glyphMap;
  bordered?: boolean;
};

export default function AuthTextInput<TForm extends FieldValues>({
  placeholder,
  icon,
  label,
  endIcon,
  bordered = true,
  requiredMark,
  control,
  name,
  error,
  customIcon,
  ...props
}: InputProps<TForm>) {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("common")
  const {
    field: { onChange, value },
  } = useController({ control, name });
  const { theme, isRTL } = useUserPreferencesStore();

  return (
    <View className="flex-1" style={{ direction: isRTL ? "rtl" : "ltr" }}>
      {label && (
        <Text className="text-base font-semibold ps-6 mb-1 dark:text-white text-black">
          {label}
        </Text>
      )}
      <View
        className={cn("flex-row items-center", {
          "border-grayish dark:border-[#46464640] dark:bg-[#1B1B1B80] border p-2 pe-2 rounded-3xl": bordered,
        })}
        style={{
          boxShadow: boxShadow(4, 6, 20).button.boxShadow,
          width: DIMENSIONS.width - 60,
        }}
      >
        {customIcon ? (
          customIcon
        ) : (
          <Ionicons
            name={icon}
            size={22}
            color={error ? "#D80027" : theme !== "light" ? "white" : "black"}
            className="ms-2"
          />
        )}
        <TextInput
          className={cn(
            "flex-1 overflow-hidden text-[#333] dark:text-white text-base ms-4",
            { "text-error dark:text-error": error },
          )}
          placeholder={placeholder}
          placeholderTextColor="#A8A8A8"
          onChangeText={onChange}
          value={value as string}
          {...props}
          secureTextEntry={props.secureTextEntry && !showPassword}
          style={{
            writingDirection: isRTL ? "rtl" : "ltr",
            textAlign: isRTL ? "right" : "left"

          }}
        />
        <View className="flex-row mx-2 gap-4 items-center">
          {endIcon && (
            <Pressable
              hitSlop={6}
              onPress={() => setShowPassword((prevState) => !prevState)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : endIcon}
                size={22}
                color={error ? "#D80027" : "#677185"}
              />
            </Pressable>
          )}
          {requiredMark && (
            <View>
              <Text className="text-error">*</Text>
            </View>
          )}
        </View>

      </View>
      {error && <Text className="text-error text-sm ms-2 pt-2">{t(`validation.${error}`)}</Text>}
    </View>
  );
}
