import EditProfileForm from "@/core/components/forms/profile/edit-profile-info";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function EditProfileScreen() {
    const { t } = useTranslation("common");
    const { dark } = useTheme()

    return (
        <Container scrollable backgroundColor={dark ? "black" : "#FAED02"} header={<ProfileHeader title={t("profile.editProfile")} />}>
            <EditProfileForm />
        </Container>
    )
}