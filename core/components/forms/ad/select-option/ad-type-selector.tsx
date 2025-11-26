import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface Mark { label: string; value: string; }

interface Brand { label: string; marks: Mark[]; }

interface Region { label: string; brands: Brand[]; }

interface Category { id: string, label: string; regions: Region[]; }

type DataItem = Category;

type AdTypeSelectorProps = TextInputProps & {
    onChange: (value: any) => void,
    data: DataItem[];
    selectedValue?: string;
    placeholder?: string;
    required?: boolean;
}

export default function AdTypeSelector({ data, onChange, placeholder, selectedValue, required, ...props }: AdTypeSelectorProps) {
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
        const itemPath = [...path, item.label].join('-');
        const isExpanded = expandedPaths.has(itemPath);

        const children = item.regions || item.brands || item.marks || [];
        const hasChildren = children.length > 0;

        const isLeaf = !hasChildren;

        if (isLeaf) {
            return (
                <TouchableOpacity
                    className={`flex-row items-center my-1 p-3 border border-transparent bg-white ms-${(level) * 4}`}
                    style={{ elevation: 2, shadowColor: 'rgba(0, 0, 0, 0.4)', shadowRadius: 1, shadowOpacity: 0.2, shadowOffset: { width: 4, height: 4 } }}
                    onPress={() => handleSelect(item.value)}
                >
                    <Ionicons
                        name={selectedValue === item.value ? 'checkmark-circle' : 'radio-button-off'}
                        size={18}
                        color={selectedValue === item.value ? 'blue' : 'gray'}
                        style={{ marginStart: level * 2 }}
                    />
                    <Text className="flex-1 text-sm ms-3">{item.label}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <>
                <TouchableOpacity
                    className="flex-row items-center my-1 p-3 py-4 border border-transparent bg-white rounded-sm"
                    style={{ elevation: 2, shadowColor: 'rgba(0, 0, 0, 0.4)', shadowRadius: 1, shadowOpacity: 0.2, shadowOffset: { width: 4, height: 4 } }}
                    onPress={() => hasChildren && toggleExpand(itemPath)}
                >
                    <Text className="flex-1 text-sm font-medium ml-3">{item.label}</Text>
                    <Ionicons
                        name={isExpanded ? 'chevron-down' : 'chevron-forward'}
                        size={16}
                        color="gray"
                        style={{ marginStart: level + 6 }}
                    />
                </TouchableOpacity>

                {isExpanded && hasChildren && children.map((child: any, idx: number) => (
                    <View style={{ marginStart: level + 6 }} key={idx}>
                        {renderItem(child, level + 1, [...path, item.label], handleSelect)}
                    </View>
                ))}
            </>
        );
    };

    const handleSelect = (value: string) => {
        onChange(value);
        setShowModal(false)
    };

    return (
        <Pressable onPress={() => setShowModal(true)}>
            <View className='flex-row items-center justify-between p-3'
                style={{
                    elevation: 2,
                    backgroundColor: "white", shadowColor: 'rgba(0, 0, 0, 0.4)', shadowRadius: 1, shadowOpacity: 0.2, shadowOffset: {
                        width: 4, height: 4
                    }
                }}
            >
                <View>
                    <TextInput
                        className={"text-[#333]"}
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
                                className="bg-white pt-2 mb-10 rounded-t-2xl p-2 w-full h-[86%] min-h-0">
                                <View className="flex-row items-center p-4">
                                    <TouchableOpacity onPress={() => setShowModal(false)} className="me-3">
                                        <Ionicons name="close" size={24} color="#8E8E93" />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={data}
                                    renderItem={({ item }) => renderItem(item, 1, [], handleSelect)}
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
                    {required && (
                        <View>
                            <Text className="text-error">*</Text>
                        </View>
                    )}
                    <Ionicons name='chevron-forward' size={20} />
                </View>
            </View>
        </Pressable>
    );
}
