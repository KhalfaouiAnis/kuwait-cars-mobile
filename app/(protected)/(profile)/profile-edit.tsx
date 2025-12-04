import EditProfileForm from "@/core/components/forms/profile/edit-profile-info";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import useUserPreferencesStore from "@/core/lib/stores/preferences.store";

export default function EditProfileScreen() {
    const { theme } = useUserPreferencesStore()

    return (
        <Container scrollable backgroundColor={theme !== "light" ? "black" : "#FAED02"} header={<ProfileHeader title="Edit Profile" />}>
            <EditProfileForm theme={theme} />
        </Container>
    )
}