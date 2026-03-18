import ChangePasswordForm from "@/core/components/forms/profile/change-password";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function ChangePasswordScreen() {
    const { t } = useTranslation("common");
    const { dark } = useTheme()

    return (
        <Container backgroundColor={dark ? "black" : "#FAED02"} header={<ProfileHeader title={t("profile.changePassword")} />}>
            <ChangePasswordForm t={t} />
        </Container>
    )
}