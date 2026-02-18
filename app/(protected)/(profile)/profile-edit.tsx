import EditProfileForm from "@/core/components/forms/profile/edit-profile-info";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { useTranslation } from "react-i18next";

export default function EditProfileScreen() {
    const { t } = useTranslation("common");
    const { theme } = useUserPreferencesStore()

    return (
        <Container scrollable backgroundColor={theme !== "light" ? "black" : "#FAED02"} header={<ProfileHeader title={t("profile.editProfile")} />}>
            <EditProfileForm t={t} />
        </Container>
    )
}