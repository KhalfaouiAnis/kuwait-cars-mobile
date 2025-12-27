import { SelectOption } from '@/core/types';
import { BOX_SHADOW, cn } from '@/core/utils/cn';
import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { Text, View } from 'react-native';
import RadioButton from '../button/radio-button';

type RadioGroupProps<TForm extends FieldValues> = {
    control: Control<TForm>;
    name: FieldPath<TForm>;
    options: SelectOption[]
    label?: string;
    disabled?: boolean;
    fullWidth?: boolean
    bordered?: boolean
}

export default function RadioGroup<TForm extends FieldValues>({ control, name, options, label, disabled, fullWidth, bordered }: RadioGroupProps<TForm>) {
    const { field: { onChange, value } } = useController({ control, name });

    return (
        <View className='flex-1'>
            {label && <Text className="text-base font-semibold mb-1 dark:text-white">{label}</Text>}
            <View
                className={cn('flex-row gap-2 flex-wrap', { "border border-gray-200 p-1 dark:border-primary-500": bordered })}
                style={bordered ? BOX_SHADOW.button : undefined}
            >
                {options.map(option => (
                    <RadioButton
                        key={option.id}
                        label={option.label}
                        selected={value === option.value}
                        onPress={() => onChange(option.value)}
                        disabled={disabled}
                        fullWidth={fullWidth}
                    />
                ))}
            </View>
        </View>
    );
}