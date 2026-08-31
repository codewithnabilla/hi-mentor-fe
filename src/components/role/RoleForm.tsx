import { useCreateRole, useUpdateRole } from "@/hooks/useRole";
import { roleSchema, type RoleFormData } from "@/schemas/role.schema";
import type { Role } from "@/types/role.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AppDialog from "../common/AppDialog";
import FormInput from "../common/FormInput";
import SubmitButton from "../common/SubmitButton";

interface RoleFormProps {
  open: boolean;
  onClose: () => void;
  role?: Role;
}

export default function RoleForm({ open, onClose, role }: RoleFormProps) {
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();

  const isEdit = !!role;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(roleSchema),
    defaultValues: {
      name: "",
      guard_name: "web",
      description: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values: RoleFormData) => {
    try {
      if (isEdit && role) {
        await updateMutation.mutateAsync({
          uuid: role.uuid,
          payload: values,
        });
      } else {
        await createMutation.mutateAsync(values);
      }

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const loading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!open) return;

    if (role) {
      reset({
        name: role.name,
        guard_name: role.guard_name,
        description: role.description ?? "",
      });
    } else {
      reset({
        name: "",
        guard_name: "web",
        description: "",
      });
    }
  }, [role, open, reset]);

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title={isEdit ? "Edit Role" : "Create Role"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Role Name"
          registration={register("name")}
          error={errors.name?.message}
          placeholder="e.g. admin"
        />

        <FormInput
          label="Guard Name"
          registration={register("guard_name")}
          error={errors.guard_name?.message}
          placeholder="web"
        />

        <FormInput
          label="Description"
          registration={register("description")}
          error={errors.description?.message}
          placeholder="Optional description"
        />

        <SubmitButton loading={loading} text={isEdit ? "Update" : "Create"} />
      </form>
    </AppDialog>
  );
}
