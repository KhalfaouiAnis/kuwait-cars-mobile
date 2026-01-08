import {
  ACC_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/core/constants";
import {
  attemptLogin,
  createAccount,
  verifyOTP,
} from "@/core/services/authentication/standard";
import { authStore } from "@/core/store/auth.store";
import { storage } from "@/core/store/storage";
import {
  LoginInterface,
  LoginSchema,
  ResetPasswordInterface,
  ResetPasswordSchema,
  SignupInterface,
  SignupSchema,
} from "@/core/types/schema/auth";
import { useRouter } from "expo-router";
import { useFormHook } from "../use-form-hook";

export function useSignIn() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useFormHook(LoginSchema, { defaultValues: { phone: "", password: "" } });

  const onSubmit = async ({ phone, password }: LoginInterface) => {
    try {
      const {
        data: { accessToken, refreshToken, user },
      } = await attemptLogin(phone, password);
      storage.set(ACC_TOKEN_STORAGE_KEY, accessToken);
      storage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
      authStore.setState({ user });
      router.replace("/categories");
    } catch (error) {
      console.log({ error });
    }
  };

  return { handleSubmit, onSubmit, errors, isSubmitting, control };
}

export function useSignUp() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormHook(SignupSchema, {
    defaultValues: {
      email: undefined,
      password: "",
      fullname: "",
      phone: "",
    },
  });

  const onSubmit = async (data: SignupInterface) => {
    try {
      await createAccount(data);
      // await requestOTP(data.phone);
      // router.navigate(`/otp_verification?phone=${data.phone}`);
      router.replace("/signin");
    } catch (error) {
      console.log({ error });
    }
  };

  return { control, handleSubmit, onSubmit, errors, isSubmitting };
}

export function useResetPassword() {
  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormHook(ResetPasswordSchema, {
    defaultValues: { phone: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: ResetPasswordInterface) => {
    router.replace("/authentication_success");
  };

  return { control, errors, isSubmitting, handleSubmit, onSubmit };
}

export function useOTP() {
  const router = useRouter();
  const verifyOtp = async (email: string, code: string) => {
    try {
      const {
        data: { accessToken, refreshToken, user },
      } = await verifyOTP(email, code);
      storage.set(ACC_TOKEN_STORAGE_KEY, accessToken);
      storage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);

      authStore.setState({ user });
      router.replace("/categories");
    } catch (error) {
      console.log({ error });
    }
  };

  return { verifyOtp };
}
