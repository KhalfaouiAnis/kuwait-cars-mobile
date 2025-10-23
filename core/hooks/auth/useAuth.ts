import { attemptLogin, verifyOTP } from "@/core/lib/api/authentication/login";
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
  // const { signIn } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useFormHook(LoginSchema, { defaultValues: { email: "", password: "" } });

  const onSubmit = async ({ email, password }: LoginInterface) => {
    try {
      const {
        data: { accessToken, refreshToken, user },
      } = await attemptLogin(email, password);
      // signIn(accessToken, refreshToken, user);
      router.replace("/categories");
    } catch (error) {
      console.log({ error });
    }
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting, control };
}

export function useSignUp() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormHook(SignupSchema, {
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit = async (data: SignupInterface) => {
    try {
      // await createAccount(data);
      // await requestOTP(data.phone);
      router.navigate(`/otp_verification?phone=${data.phone}`);
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
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: ResetPasswordInterface) => {
    router.replace("/authentication_success");
  };

  return { control, errors, isSubmitting, handleSubmit, onSubmit };
}

export function useOTP() {
  const router = useRouter();
  // const { signIn } = useAuthStore();

  const verifyOtp = async (email: string, code: string) => {
    try {
      const {
        data: { accessToken, refreshToken, user },
      } = await verifyOTP(email, code);

      // signIn(accessToken, refreshToken, user);
      router.replace("/categories");
    } catch (error) {
      console.log({ error });
    }
  };

  return { verifyOtp };
}
