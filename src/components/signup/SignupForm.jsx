"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "@/validations/signup.schema";
import { hasSuspiciousFormInput } from "@/utils/security";
import DatePickerField from "./DatePickerField";
import SignupSuccess from "./SignupSuccess";
import GoogleSignupButton from "./GoogleSignupButton";

import InputField from "./InputField";
import PasswordField from "./PasswordField";
import TermsAgreement from "./TermsAgreement";
import {
  registerUser,
  registerUserWithGoogle,
} from "@/services/auth.service";
import { useCallback, useState } from "react";

export default function SignupForm() {
  const [apiError, setApiError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),

    mode: "onChange",
    reValidateMode: "onChange",

    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      encryptpassword: "",
      dob: "",
      terms: false,
      privacy: false,
    },
  });

  const handleGoogleSuccess = useCallback(async (credential) => {
    try {
      setApiError("");

      const result = await registerUserWithGoogle(credential);

      if (result.status === 200) {
        reset();
        setIsSuccess(true);
      }
    } catch (error) {
      setApiError(
        error.message || "Google registration failed."
      );
    }
  }, [reset]);

  const handleGoogleError = useCallback((message) => {
    setApiError(message);
  }, []);

  const onSubmit = async (data) => {
    setApiError("");

    if (hasSuspiciousFormInput(data)) {
      router.push("/invalid-input");
      return;
    }

    try {
      const payload = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        encryptpassword: data.encryptpassword,
        mobile: data.mobile,
        dob: data.dob,
      };

      const result = await registerUser(payload);

      console.log("Registration successful:", result);
      if (result.status == 200) {
        reset();
        setIsSuccess(true);
      }
    } catch (error) {
      console.log('error', error)
      setApiError(
        error.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div
      className={`signup-card ${isSuccess ? "signup-card--success" : ""
        }`}
    >
      <div className="signup-card-inner">

        {/* FRONT */}
        <div className="signup-card-face signup-card-front">
          <div className="signup-form-content">

            <h1>Welcome To Atologist Infotech</h1>

            <p className="signup-subtitle">
              Create your account
            </p>

            {/* <button
              type="button"
              className="google-button"
              aria-label="Continue with Google"
            >
              <img
                src="/images/signup/google_social_icon.jpg"
                alt=""
                className="google-icon"
                width={30}
                height={30}
              />
              <span>Sign Up with Google</span>
            </button> */}

            <GoogleSignupButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

            <div className="or-divider">
              <span>OR</span>
            </div>

            <form
              className="signup-form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >

              {/* YOUR EXISTING FORM FIELDS */}

              <div className="name-fields">
                <InputField
                  label="First Name"
                  name="firstname"
                  placeholder="Enter your first name"
                  register={register}
                  error={errors.firstname}
                  animationDelay="0.1s"
                />

                <InputField
                  label="Last Name"
                  name="lastname"
                  placeholder="Enter your last name"
                  register={register}
                  error={errors.lastname}
                  animationDelay="0.15s"
                />
              </div>

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                register={register}
                error={errors.email}
                animationDelay="0.2s"
              />

              <InputField
                label="Mobile"
                name="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                register={register}
                error={errors.mobile}
                animationDelay="0.25s"
              />

              <PasswordField
                register={register}
                error={errors.encryptpassword}
              />

              <DatePickerField
                control={control}
                error={errors.dob}
              />

              <TermsAgreement
                register={register}
                errors={errors}
              />

              {apiError && (
                <div
                  className="api-error"
                  role="alert"
                >
                  {apiError}
                </div>
              )}

              <button
                type="submit"
                className="signup-submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>
          </div>
        </div>

        {/* BACK */}
        <div className="signup-card-face signup-card-back">
          <SignupSuccess
            onBack={() => setIsSuccess(false)}
          />
        </div>

      </div>
    </div>
  );


}