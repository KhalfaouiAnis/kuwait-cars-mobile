import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function PickerSelect() {
    const [selectedValue, setSelectedValue] = useState(null);

    const options = [
        { label: 'KM', value: 'KM' },
        { label: 'ML', value: 'ML' },
    ];

    const placeholder = {
        label: 'Unit',
        value: null,
    };

    return (
        <View style={styles.container}>
            <RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={(value) => setSelectedValue(value)}
                value={selectedValue}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Ionicons name='chevron-down' size={20} color="gray" />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingEnd: 30,
        backgroundColor: 'white',
        flex: 1,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        color: 'black',
        borderWidth: .2,
        borderColor: 'gray',
        paddingEnd: 20,
        backgroundColor: 'white',
        flex: 1,
    },
    iconContainer: {
        end: 2,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});