import { DIMENSIONS } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
}

export default function ReportAdModal({ visible, setVisible }: Props) {
    return (
        <Modal
            transparent
            visible={visible}
            hardwareAccelerated
            animationType="fade"
            presentationStyle="overFullScreen"
            onRequestClose={() => setVisible(false)}
        >
            <Pressable className="flex-1 bg-black/10" onPress={() => setVisible(false)}>
                <View className="items-center justify-center flex-1 bg-white/90 dark:bg-black/90">
                    <View
                        className="bg-white p-4 py-6 rounded-2xl items-center gap-2"
                        style={{ boxShadow: boxShadow(4, 6, 20).button.boxShadow }}
                    >
                        <Pressable
                            className="text-center py-2 rounded-xl w-full"
                            style={{ boxShadow: boxShadow().button.boxShadow, width: DIMENSIONS.width - 100 }}
                        >
                            <Text className="text-center font-inter-medium text-base">Misleading price</Text>
                        </Pressable>
                        <Pressable
                            className="text-center py-2 rounded-xl w-full"
                            style={{ boxShadow: boxShadow().button.boxShadow, width: DIMENSIONS.width - 100 }}
                        >
                            <Text className="text-center font-inter-medium text-base">Unwanted messages</Text>
                        </Pressable>
                        <Pressable
                            className="text-center py-2 rounded-xl w-full"
                            style={{ boxShadow: boxShadow().button.boxShadow, width: DIMENSIONS.width - 100 }}
                        >
                            <Text className="text-center font-inter-medium text-base">Fraud suspicious listing</Text>
                        </Pressable>
                        <Pressable
                            className="text-center py-2 rounded-xl w-full"
                            style={{ boxShadow: boxShadow().button.boxShadow, width: DIMENSIONS.width - 100 }}
                        >
                            <Text className="text-center font-inter-medium text-base">Listing does not exist</Text>
                        </Pressable>
                        <Pressable
                            className="text-center py-2 rounded-xl w-full"
                            style={{ boxShadow: boxShadow().button.boxShadow, width: DIMENSIONS.width - 100 }}
                        >
                            <Text className="text-center font-inter-medium text-base">Other</Text>
                        </Pressable>
                        <View
                            style={{
                                boxShadow: boxShadow().button.boxShadow,
                                width: DIMENSIONS.width - 90,
                                height: 120
                            }}
                            className="rounded-xl border border-orange mt-2"
                        >
                            <TextInput
                                placeholder="Write yor report"
                                // className="w-full"
                                multiline
                            />
                        </View>
                        <Pressable
                            style={{
                                boxShadow: boxShadow().button.boxShadow,
                            }}
                            className="bg-primary-500 py-2 px-16 rounded-xl mt-2"
                        >
                            <Text className="font-inter-bold text-base">Send</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Modal>
    )
}