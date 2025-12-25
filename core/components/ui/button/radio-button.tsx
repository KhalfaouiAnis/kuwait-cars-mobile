import { clsx } from 'clsx';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
            style={styles.button}
            className={clsx("min-w-[34px] p-3 px-4 dark:bg-darkish border", {
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

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 2,
                blurRadius: 4,
                spreadDistance: 0,
                color: 'rgb(000 000 000 / 0.25)',
            },
        ],
    }
});