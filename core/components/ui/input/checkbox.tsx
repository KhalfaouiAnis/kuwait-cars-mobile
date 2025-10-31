import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

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
            <View style={{ width: size, height: size }} className="justify-center items-center">
                <MaterialCommunityIcons name={isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline"} size={24} color={isChecked ? "green" : "black"} />
            </View>
        </TouchableOpacity>
    )
}