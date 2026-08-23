import * as yup from "yup";

export const permissionSchema = yup.object({
  name: yup
    .string()
    .required("Permission name is required")
    .max(255, "Permission name cannot exceed 255 characters"),
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

export type PermissionFormData = yup.InferType<typeof permissionSchema>;
