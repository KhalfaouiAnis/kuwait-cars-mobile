import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import { AdFormStepProps } from "@/core/types";
import { ShowCarAdInterface } from "@/core/types/schema/ads/showCar";
import { ScrollView } from "react-native";

export default function PostAd({ control, errors }: AdFormStepProps<ShowCarAdInterface>) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 10, rowGap: 8 }}
        >
            <InputWithSpeech
                control={control}
                name="title"
                label="Title"
                required
                maxLength={30}
                error={errors.title?.message}
                placeholder="Write Your Advertisement Title" />
            <InputWithSpeech
                control={control}
                name="description"
                label="Description"
                maxLength={500}
                multiline
                required
                numberOfLines={4}
                error={errors.description?.message}
                placeholder="Write Your Advertisement Description"
            />
        </ScrollView>
    )
}
