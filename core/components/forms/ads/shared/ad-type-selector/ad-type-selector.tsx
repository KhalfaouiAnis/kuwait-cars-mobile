import { AD_TYPES } from '@/core/constants/ad';
import { DataItem } from '@/core/types/schema/shared';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type AdTypeSelectorProps = TextInputProps & {
    onChange: (value: any) => void,
    data: DataItem[];
    selectedValue?: string;
    placeholder?: string;
}

export default function AdTypeSelector({ data, onChange, placeholder, selectedValue, ...props }: AdTypeSelectorProps) {
    const [showModal, setShowModal] = useState(false);
    const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

    const toggleExpand = (path: string) => {
        const newExpanded = new Set(expandedPaths);
        if (newExpanded.has(path)) {
            newExpanded.delete(path);
        } else {
            newExpanded.add(path);
        }
        setExpandedPaths(newExpanded);
    };

    const renderItem = (item: any, level: number, path: string[], handleSelect: any) => {
        const itemPath = [...path, item.value].join(';');
        const isExpanded = expandedPaths.has(itemPath);

        const children = item.regions || item.brands || item.marks || [];
        const hasChildren = children.length > 0;

        const isLeaf = !hasChildren;

        if (isLeaf) {
            return (
                <TouchableOpacity
                    className={`flex-row items-center my-1 p-3 py-4 elevation-sm border border-transparent dark:border-primary-500 bg-white dark:bg-darkish ms-${(level) * 4}`}
                    onPress={() => {
                        if ([AD_TYPES.used_cars, AD_TYPES.motorcycles].includes(path[0])) {
                            const [brand, model] = item.value.split("/")
                            handleSelect({
                                label: item.label,
                                path: path[0],
                                params: { model, brand, path: path[0] }
                            })
                        } else if (AD_TYPES.spare_parts === path[0]) {
                            handleSelect({
                                label: item.label,
                                path: path[0],
                                params: { regison: item.value, path: path[0] }
                            })
                        } else {
                            handleSelect({ label: item.label, path: item.value, params: { path: item.value } })
                        }
                    }}
                >
                    <Text className="flex-1 text-sm font-semibold ms-3 dark:text-grayish">{item.label}</Text>
                    <View className='justify-end'>
                        <Ionicons
                            name='chevron-forward'
                            size={16}
                            color="gray"
                        />
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <>
                <TouchableOpacity
                    className="flex-row items-center my-1 p-3 py-4 elevation-sm border border-transparent dark:border-primary-500 bg-white dark:bg-darkish rounded-sm"
                    onPress={() => hasChildren && toggleExpand(itemPath)}
                >
                    <Text className="flex-1 text-sm font-semibold ms-3 dark:text-grayish">{item.label}</Text>
                    <Ionicons
                        name={isExpanded ? 'chevron-down' : 'chevron-forward'}
                        size={16}
                        color="gray"
                        style={{ marginStart: level + 6 }}
                    />
                </TouchableOpacity>

                {isExpanded && hasChildren && children.map((child: any, idx: number) => (
                    <View style={{ marginStart: level + 6 }} key={idx}>
                        {renderItem(child, level + 1, [...path, item.value], handleSelect)}
                    </View>
                ))}
            </>
        );
    };

    const handleSelect = (value: any) => {
        onChange(value);
        setShowModal(false)
    };

    return (
        <Pressable onPress={() => setShowModal(true)}>
            <View className={'flex-row items-center justify-between border border-transparent bg-white dark:bg-darkish dark:border-primary-500 elevation-md p-3'}>
                <View>
                    <TextInput
                        className={"text-[#333] dark:text-white"}
                        editable={false}
                        pointerEvents="none"
                        value={selectedValue}
                        placeholder={placeholder}
                        {...props}
                    />
                    <Modal
                        visible={showModal}
                        animationType="slide"
                        transparent={false}
                        onRequestClose={() => setShowModal(false)}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setShowModal(false)}
                            className="flex-1 justify-end bg-black/20">
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { }}
                                className="bg-white dark:bg-darkish pt-6 mb-10 rounded-t-2xl p-2 w-full h-[86%] min-h-0">
                                <FlatList
                                    data={data}
                                    renderItem={({ item }) => renderItem(item, 0, [], handleSelect)}
                                    keyExtractor={(_, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    style={{ marginBottom: 20 }}
                                    nestedScrollEnabled
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                </View>
                <View className="ms-auto flex-row items-end">
                    <View>
                        <Text className="text-error">*</Text>
                    </View>
                    <Ionicons name='chevron-forward' size={20} />
                </View>
            </View>
        </Pressable>
    );
}
