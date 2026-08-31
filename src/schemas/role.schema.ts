import * as yup from "yup";

export const roleSchema = yup.object({
  name: yup
    .string()
    .required("Role name is required")
    .max(255, "Role name cannot exceed 255 characters"),
  guard_name: yup
    .string()
    .required("Guard name is required")
    .max(50, "Guard name cannot exceed 50 characters"),
  description: yup
    .string()
    .nullable()
    .defined()
    .max(255, "Description cannot exceed 255 characters"),
});

export type RoleFormData = yup.InferType<typeof roleSchema>;
