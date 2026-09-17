import { z } from "zod";

export const signupSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name is too long")
    .regex(
      /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
      "Please enter a valid first name"
    ),

  lastname: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name is too long")
    .regex(
      /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
      "Please enter a valid last name"
    ),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),

  mobile: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(
      /^[0-9]{10}$/,
      "Please enter a valid 10-digit mobile number"
    ),

  encryptpassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must contain at least 8 characters")
    .max(128, "Password is too long"),

  dob: z
    .string()
    .trim()
    .min(1, "Date of birth is required"),

  terms: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must accept the Terms of Service"
    ),

  privacy: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must accept the Privacy Policy"
    ),
});