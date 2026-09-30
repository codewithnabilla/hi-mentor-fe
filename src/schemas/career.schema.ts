import * as yup from "yup";

export const careerSchema = yup.object({
  name: yup
    .string()
    .required("Career name is required")
    .max(255, "Career name cannot exceed 255 characters"),
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

export type CareerFormData = yup.InferType<typeof careerSchema>;