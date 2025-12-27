import { AD_TYPES } from '@/core/constants/ad';
import { DataItem } from '@/core/types/schema/shared';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from "@shopify/flash-list";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type AdTypeSelectorProps = {
    onChange: (value: { ad_type: string, params: any } | null) => void,
    data: DataItem[];
    isRTL: boolean;
    selectedValue?: string;
    placeholder?: string;
}

export default function AdTypeSelector({ data, onChange, placeholder, selectedValue, isRTL }: AdTypeSelectorProps) {
    const { t } = useTranslation("car_categories")
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

        const children = item.regions || item.brands || item.models || [];
        const hasChildren = children.length > 0;

        const isLeaf = !hasChildren;

        if (isLeaf) {
            return (
                <TouchableOpacity
                    style={styles.selectButton}
                    className={`flex-row items-center my-1.5 p-3 py-4 dark:border-primary-500 dark:border ms-${(level) * 6}`}
                    onPress={() => {
                        if (AD_TYPES.used_cars === path[0]) {
                            const [brand, model] = item.value.split("/")
                            handleSelect({
                                ad_type: AD_TYPES.used_cars,
                                params: { model, brand, label: t(item.label) }
                            })
                        } else if (AD_TYPES.motorcycles === path[0]) {
                            const [ad_category, brand] = item.value.split("/")
                            handleSelect({
                                ad_type: AD_TYPES.motorcycles,
                                params: { ad_category, brand, label: t(item.label) }
                            })
                        } else if (AD_TYPES.spare_parts === path[0]) {
                            handleSelect({
                                ad_type: AD_TYPES.spare_parts,
                                params: { regison: item.value, label: t(item.label) }
                            })
                        } else {
                            handleSelect({ ad_type: item.value, params: { label: t(item.label), } })
                        }
                    }}
                >
                    <Ionicons name={item?.icon} size={20} color="gray" />
                    <Text className="flex-1 text-sm font-semibold ms-3 dark:text-grayish">{t(item.label)}</Text>
                    <Ionicons
                        className='justify-start'
                        name={isRTL ? 'chevron-back' : 'chevron-forward'}
                        size={16}
                        color="gray"
                    />
                </TouchableOpacity>
            )
        }

        return (
            <>
                <TouchableOpacity
                    style={[styles.selectButton]}
                    className="flex-row items-center my-1.5 p-3 py-4 dark:border-primary-500 dark:border rounded-sm"
                    onPress={() => hasChildren && toggleExpand(itemPath)}
                >
                    <Ionicons name={item?.icon} size={20} color="gray" />
                    <Text className="flex-1 text-sm font-semibold ms-3 dark:text-grayish">{t(item.label)}</Text>
                    <Ionicons
                        name={isExpanded ? 'chevron-down' : isRTL ? 'chevron-back' : 'chevron-forward'}
                        size={16}
                        color="gray"
                        style={{ marginStart: level + 6 }}
                    />
                </TouchableOpacity>
                {isExpanded && hasChildren && children.map((child: any, idx: number) => (
                    <View style={{ marginStart: level + 10 }} key={idx}>
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
        <Pressable
            style={styles.wrapper}
            onPress={() => setShowModal(true)}
            className={'flex-row items-center justify-between bordered-box p-3'}
        >
            <View>
                <Text
                    className={"text-[#333] dark:text-white"}
                    pointerEvents="none"
                >
                    {selectedValue ? t(selectedValue) : placeholder}
                </Text>
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
                            className="bg-white dark:bg-darkish pt-6 mb-10 rounded-t-3xl p-2 w-full h-[86%] min-h-0 px-4">
                            <FlashList
                                data={data}
                                renderItem={({ item }) => renderItem(item, 0, [], handleSelect)}
                                keyExtractor={(_, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                contentContainerClassName='pb-6 px-1.5'
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
                <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} color="gray" size={20} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 70,
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 4,
                blurRadius: 9,
                spreadDistance: 0,
                color: 'rgb(000 000 000 / 0.25)',
            },
        ],
    },
    selectButton: {
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 4,
                blurRadius: 4,
                spreadDistance: 0,
                color: 'rgb(000 000 000 / 0.25)',
            },
        ],
    }
});