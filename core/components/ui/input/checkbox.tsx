import useUserPreferencesStore from "@/core/lib/stores/preferences.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type CustomCheckboxProps = {
    onValueChange?: (value: boolean) => void;
    checked?: boolean;
    disabled?: boolean;
    size?: number;
    color?: string;
};

export default function Checkbox({
    onValueChange,
    checked = false,
    disabled,
    size = 24,
}: CustomCheckboxProps) {
    const [isChecked, setIsChecked] = useState(checked);
    const { theme } = useUserPreferencesStore()

    const handlePress = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onValueChange?.(newValue);
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7} disabled={disabled}>
            <MaterialCommunityIcons
                size={size}
                color={isChecked ? "#FAED02" : theme !== "light" ? "white" : "black"}
                name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
            />
        </TouchableOpacity>
    )
}