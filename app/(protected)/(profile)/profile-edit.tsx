import EditProfileForm from "@/core/components/forms/profile/edit-profile-info";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";

export default function EditProfileScreen() {
    return (
        <Container
            backgroundColor="#FAED02"
            scrollable
            header={<ProfileHeader title="Edit Profile" />}
        >
            <EditProfileForm />
        </Container>
    )
}