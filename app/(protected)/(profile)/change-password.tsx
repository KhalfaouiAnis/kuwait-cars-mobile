import ChangePasswordForm from "@/core/components/forms/profile/change-password";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import useUserPreferencesStore from "@/core/lib/stores/preferences.store";

export default function ChangePasswordScreen() {
    const { theme } = useUserPreferencesStore()

    return (
        <Container backgroundColor={theme !== "light" ? "black" : "#FAED02"} header={<ProfileHeader title="Change Password" />}>
            <ChangePasswordForm />
        </Container>
    )
}