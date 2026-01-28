import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import TextAreaSpeech from "@/core/components/ui/input/text/text-area-speech";
import { AdFormStepProps } from "@/core/types";
import { ShowCarAdInterface } from "@/core/types/schema/ads/showCar";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

export default function PostAd({ control, errors }: AdFormStepProps<ShowCarAdInterface>) {
    const { t } = useTranslation("common")

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 px-2"
            contentContainerStyle={{ paddingBottom: 10, rowGap: 8 }}
        >
            <InputWithSpeech
                control={control}
                label={t("createAd.Title")}
                name="title"
                required
                maxLength={30}
                error={errors.title?.ref?.name}
                placeholder={t("createAd.WriteYourAdvertisementTitle")}
            />
            <TextAreaSpeech
                control={control}
                label={t("description")}
                name="description"
                maxLength={500}
                required
                error={errors.description?.ref?.name}
                placeholder={t("createAd.WriteYourAdvertisementDescription")}
            />
        </ScrollView>
    )
}
