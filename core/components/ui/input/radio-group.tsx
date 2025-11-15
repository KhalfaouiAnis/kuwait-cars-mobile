import { SelectOption } from '@/core/types';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Text, View } from 'react-native';
import RadioButton from '../button/radio-button';

type RadioGroupProps<TForm extends FieldValues> = {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    options: SelectOption[]
    label?: string;
    disabled?: boolean;
}

export default function RadioGroup<TForm extends FieldValues>({ control, name, options, label, disabled }: RadioGroupProps<TForm>) {
    return (
        <View className=''>
            {label && <Text className="text-base font-semibold mb-1">{label}</Text>}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <View className='flex-row flex-wrap gap-2'>
                        {options.map(option => (
                            <RadioButton
                                key={option.id}
                                label={option.label}
                                selected={value === option.value}
                                onPress={() => onChange(option.value)}
                                disabled={disabled}
                            />
                        ))}
                    </View>
                )}
            />
        </View>
    );
}