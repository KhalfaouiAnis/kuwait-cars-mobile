import { VehicleAdFormSteps } from '@/core/types/schema/vehicleAd';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ChooseLocation from '../../forms/ad/choose-location';


export default function LocationInput({ control, errors, getValue }: VehicleAdFormSteps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <View className="w-full">
            <Pressable onPress={() => setShowModal(true)}>
                <View className='flex-row items-center justify-between p-3'
                    style={{
                        elevation: 2,
                        backgroundColor: "white", shadowColor: 'rgba(0, 0, 0, 0.4)', shadowRadius: 1, shadowOpacity: 0.2, shadowOffset: {
                            width: 4, height: 4
                        }
                    }}
                >
                    <View className='flex-row gap-2 items-center'>
                        <Ionicons name="location-outline" size={24} color="#000000" className="mr-2" />
                        <TextInput
                            className={` ${errors.location?.root ? 'border-red-500' : 'text-[#333]'}`}
                            editable={false}
                            placeholder='Location'
                            pointerEvents="none"
                            value={getValue?.("location.area") || ""}
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
                                    activeOpacity={1}
                                    onPress={() => { }}
                                    className="bg-white pt-2 mb-10 rounded-t-2xl p-4 w-full h-[86%] min-h-0">
                                    <View className="flex-row items-center p-4">
                                        <TouchableOpacity onPress={() => setShowModal(false)} className="mr-3">
                                            <Ionicons name="close" size={24} color="#8E8E93" />
                                        </TouchableOpacity>
                                        <Text className="text-lg font-semibold">Choose Location</Text>
                                    </View>
                                    <ChooseLocation control={control} errors={errors} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <View>
                        <Ionicons name='chevron-forward' size={20} />
                    </View>
                </View>
            </Pressable>
        </View>
    );
}