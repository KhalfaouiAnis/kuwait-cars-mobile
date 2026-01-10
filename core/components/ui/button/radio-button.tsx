import { boxShadow, cn } from '@/core/utils/cn';
import { Text, TouchableOpacity } from 'react-native';

interface RadioButtonProps {
    label: string;
    selected: boolean;
    onPress: () => void;
    disabled?: boolean;
    fullWidth?: boolean
};

export default function RadioButton({ label, selected, onPress, disabled, fullWidth = false }: RadioButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={boxShadow().button}
            className={cn("min-w-[34px] p-3 px-4 dark:bg-darkish border", {
                "bg-primary-500 border-error": selected,
                "bg-white border-[#e7e7e7] dark:border-primary-500": !selected,
                "flex-1": fullWidth
            })}
        >
            <Text className='text-center font-semibold dark:text-white' numberOfLines={1}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}
