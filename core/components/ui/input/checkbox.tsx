import useUserPreferencesStore from "@/core/store/preferences.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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
    const [isChecked, setIsChecked] = useState(() => checked);
    const { theme } = useUserPreferencesStore()

    const handlePress = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onValueChange?.(newValue);
    };

    useEffect(() => {
        setIsChecked(checked)
    }, [checked])

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled}
            onPress={handlePress}
        >
            <MaterialCommunityIcons
                size={size}
                color={isChecked ? "#D9D9D9" : theme !== "light" ? "white" : "black"}
                name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
            />
        </TouchableOpacity>
    )
}