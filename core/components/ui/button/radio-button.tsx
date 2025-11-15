import { clsx } from 'clsx';
import { Text, TouchableOpacity } from 'react-native';

interface RadioButtonProps {
    label: string;
    selected: boolean;
    onPress: () => void;
    disabled?: boolean;
};

export default function RadioButton({ label, selected, onPress, disabled }: RadioButtonProps) {
    return (
        <TouchableOpacity className={clsx("py-2 px-3", {
            "bg-primary-500 border-error border": selected,
            "bg-white border-transparent": !selected
        })}
            onPress={onPress}
            disabled={disabled}
            accessible
            style={{
                elevation: 3, shadowColor: 'rgba(0, 0, 0, 0.6)', shadowRadius: 1, shadowOpacity: 0.2, shadowOffset: { width: 4, height: 4 },
            }}
        >
            <Text className='text-center font-semibold'>{label}</Text>
        </TouchableOpacity>
    );
}