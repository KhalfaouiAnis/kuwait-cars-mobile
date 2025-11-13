import ChangePasswordForm from "@/core/components/forms/profile/change-password";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";

export default function ChangePasswordScreen() {
    return (
        <Container
            backgroundColor="#FAED02"
            header={<ProfileHeader title="Change Password" />}
        >
            <ChangePasswordForm />
        </Container>
    )
}