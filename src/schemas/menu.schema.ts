import * as yup from "yup";

export const menuSchema = yup.object({
    name: yup.string().required("Menu name is required"),
    route: yup.string().required("Route is required"),
    icon: yup.string().nullable().defined(),
    permission: yup.string().nullable().defined(),
    order: yup
        .number()
        .typeError("Order must be a number")
        .required("Order is required"),
    parent_uuid: yup.string().nullable().defined(),
    is_active: yup.boolean().required(),
});

export type MenuFormData = yup.InferType<typeof menuSchema>;