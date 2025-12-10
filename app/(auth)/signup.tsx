import FormWrapper from "@/core/components/forms/auth/form-wrapper";
import SignUpForm from "@/core/components/forms/auth/sign-up-form";
import { useTranslation } from "react-i18next";

export default function SignUpScreen() {
    const { t } = useTranslation("auth");

    return (
        <FormWrapper title={t("signUp")}>
            <SignUpForm />
        </FormWrapper>
    )
}