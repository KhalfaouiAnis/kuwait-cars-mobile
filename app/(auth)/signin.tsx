import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import SignInForm from "@/core/components/forms/auth/sign-in-form";
import { useTranslation } from "react-i18next";

export default function SignInScreen() {
    const { t } = useTranslation("auth");

    return (
        <FormWrapper title={t("signIn")}>
            <SignInForm />
        </FormWrapper>
    )
}