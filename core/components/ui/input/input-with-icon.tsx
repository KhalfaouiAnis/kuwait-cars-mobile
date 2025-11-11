import { cn } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type InputProps<TForm extends FieldValues> = TextInputProps & {
    placeholder: string
    icon?: keyof typeof Ionicons.glyphMap,
    customIcon?: ReactNode,
    name: FieldPath<TForm>;
    control: Control<TForm>;
    requiredMark?: boolean;
    label?: string;
    error?: string;
    endIcon?: keyof typeof Ionicons.glyphMap
    bordered?: boolean
}

export default function InputWithIcon<TForm extends FieldValues>({ placeholder, icon, label, endIcon, bordered = true, requiredMark, control, name, error, customIcon, ...props }: InputProps<TForm>) {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
        <View className="flex-1">
            {label && <Text className="text-base font-semibold pl-6 mb-1">{label}</Text>}
            <View className={cn("flex-row items-center", {
                "border-primary-500 border-[1px] p-2 pl-4 rounded-lg": bordered,
            })}>
                {
                    customIcon ? customIcon : <Ionicons name={icon} size={22} color={error ? "#D80027" : "#000000"} className="mr-2" />
                }
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className={cn("flex-1 h-12 overflow-hidden text-[#333] text-base", { "text-error": error })}
                            placeholder={placeholder}
                            placeholderTextColor="#A8A8A8"
                            onChangeText={onChange}
                            value={value as string}
                            {...props}
                            secureTextEntry={props.secureTextEntry && !showPassword}
                        />
                    )}
                />
                {endIcon && (
                    <Pressable onPress={() => setShowPassword(prevState => !prevState)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : endIcon} size={20} color={error ? "#D80027" : "#677185"} />
                    </Pressable>
                )}
                {requiredMark && (
                    <View>
                        <Text className="text-error self-end ml-3">*</Text>
                    </View>
                )}
            </View>
            {error && <Text className="text-error text-sm mt-1 ml-2">{error}</Text>}
        </View>
    )
}