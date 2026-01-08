import useUserPreferencesStore from "@/core/store/preferences.store";
import { cn } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Control, FieldPath, FieldValues, useController } from "react-hook-form";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type InputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    placeholder: string
    icon?: keyof typeof Ionicons.glyphMap,
    customIcon?: ReactNode,
    requiredMark?: boolean;
    label?: string;
    error?: string;
    endIcon?: keyof typeof Ionicons.glyphMap
    bordered?: boolean
}

export default function InputWithIcon<TForm extends FieldValues>({ placeholder, icon, label, endIcon, bordered = true, requiredMark, control, name, error, customIcon, ...props }: InputProps<TForm>) {
    const [showPassword, setShowPassword] = useState(false)
    const { field: { onChange, value } } = useController({ control, name });
    const { theme, isRTL } = useUserPreferencesStore()

    return (
        <View className="flex-1" style={{ direction: isRTL ? "rtl" : "ltr" }}>
            {label && <Text className="text-base font-semibold pl-6 mb-1 dark:text-white text-black">{label}</Text>}
            <View className={cn("flex-row items-center", {
                "border-primary-500 border p-1 pe-2 rounded-lg": bordered,
            })}>
                {customIcon ? customIcon : <Ionicons name={icon} size={20} color={error ? "#D80027" : theme !== "light" ? "white" : "black"} className="mr-2" />}
                <TextInput
                    className={cn("flex-1 text-start overflow-hidden text-[#333] dark:text-white text-base", { "text-error": error })}
                    placeholder={placeholder}
                    placeholderTextColor="#A8A8A8"
                    onChangeText={onChange}
                    value={value as string}
                    {...props}
                    secureTextEntry={props.secureTextEntry && !showPassword}
                />
                {endIcon && (
                    <Pressable hitSlop={6} className="me-1" onPress={() => setShowPassword(prevState => !prevState)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : endIcon} size={20} color={error ? "#D80027" : "#677185"} />
                    </Pressable>
                )}
                {requiredMark && (
                    <View>
                        <Text className="text-error self-end">*</Text>
                    </View>
                )}
            </View>
            {error && <Text className="text-error text-sm ms-2">{error}</Text>}
        </View>
    )
}