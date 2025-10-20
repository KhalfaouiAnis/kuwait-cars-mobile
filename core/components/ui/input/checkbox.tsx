import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

type CustomCheckboxProps = {
    onValueChange?: (value: boolean) => void;
    initialValue?: boolean;
    size?: number;
    color?: string;
    uncheckedColor?: string;
};

export default function Checkbox({
    onValueChange,
    initialValue = false,
    size = 24,
    color = '#007AFF',
    uncheckedColor = '#8E8E93',
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
                <Ionicons
                    name={isChecked ? 'square' : 'square-outline'}
                    size={size}
                    color={isChecked ? color : uncheckedColor}
                />
            </View>
        </TouchableOpacity>
    )
}