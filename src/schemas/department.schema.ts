import * as yup from "yup";

export const departmentSchema = yup.object({
    name: yup
        .string()
        .required("Department name is required")
        .max(255, "Department name cannot exceed 255 characters"),
    code: yup
        .string()
        .required("Code is required")
        .max(50, "Code cannot exceed 50 characters"),
    description: yup
        .string()
        .nullable()
        .defined()
        .max(255, "Description cannot exceed 255 characters"),
});

export type DepartmentFormData = yup.InferType<typeof departmentSchema>;
