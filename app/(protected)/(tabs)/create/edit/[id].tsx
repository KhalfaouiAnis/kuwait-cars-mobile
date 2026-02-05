import EditFormController from "@/core/components/forms/ads/shared/edit-form-controller";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function EditAdScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [initialData, setInitialData] = useState<any>(null);
    const [ad_type, setAdType] = useState<string>("");

    useEffect(() => {
        const fetchAd = async () => {
            const data = null // Your Node.js backend call
            setInitialData(data);
            //   setAdType(data.ad_type);
        };
        fetchAd();
    }, [id]);

    //   if (!initialData) return < />;

    return (
        <EditFormController
            ad_type={ad_type}
            initialData={initialData}
            adId={id}
        />
    );
}
