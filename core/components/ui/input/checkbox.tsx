import CheckboxIcon from "@/assets/svg/remember-me";
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
                <CheckboxIcon checked={isChecked} color={isChecked ? "green" : "black"} />
            </View>
        </TouchableOpacity>
    )
}