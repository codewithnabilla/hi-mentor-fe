import * as yup from "yup";

export const userSchema = yup.object({
  name: yup
    .string()
    .required("User name is required")
    .max(100, "User name cannot exceed 100 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email")
    .max(255, "Email cannot exceed 255 characters"),
  //   password: yup
  //     .string()
  //     .required("Password is required")
  //     .max(50, "Password cannot exceed 50 characters"),
});

export type UserFormData = yup.InferType<typeof userSchema>;