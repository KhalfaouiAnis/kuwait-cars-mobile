import { clsx } from 'clsx';
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
            className={clsx("p-3 border", {
                "bg-primary-500 border-error": selected,
                "bg-white border-transparent": !selected,
                "flex-1": fullWidth
            })}
            style={{
                elevation: 3, shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowRadius: 1, shadowOpacity: 0.2,
                shadowOffset: { width: 4, height: 4 },
                minWidth: 34,
            }}
        >
            <Text
                className='text-center font-semibold'
                ellipsizeMode="tail"
                numberOfLines={1}
            >{label}</Text>
        </TouchableOpacity>
    );
}