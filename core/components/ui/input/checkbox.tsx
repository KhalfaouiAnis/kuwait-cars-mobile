import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type CustomCheckboxProps = {
    onValueChange?: (value: boolean) => void;
    initialValue?: boolean;
    size?: number;
    color?: string;
};

export default function Checkbox({
    onValueChange,
    initialValue = false,
    size = 24,
}: CustomCheckboxProps) {
    const [isChecked, setIsChecked] = useState(initialValue);

    const handlePress = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onValueChange?.(newValue);
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <MaterialCommunityIcons
                size={size}
                color={isChecked ? "#FAED02" : "transparent"}
                name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
            />
        </TouchableOpacity>
    )
}