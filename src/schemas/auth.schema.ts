import * as yup from "yup";

export const loginSchema = yup
    .object({
        email: yup
            .string()
            .required("Email is required")
            .email("Invalid email"),

        password: yup
            .string()
            .required("Password is required"),
    })
    .required();

export const registerSchema = yup
    .object({
        name: yup
            .string()
            .required("Name is required")
            .max(100, "Name cannot exceed 100 characters"),

        email: yup
            .string()
            .required("Email is required")
            .email("Invalid email")
            .max(255, "Email cannot exceed 255 characters"),

        role: yup
            .string()
            .required("Please select a role")
            .oneOf(["Mentor", "Student"], "Role must be Mentor or Student"),

        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),

        password_confirmation: yup
            .string()
            .required("Please confirm your password")
            .oneOf([yup.ref("password")], "Passwords must match"),
    })
    .required();