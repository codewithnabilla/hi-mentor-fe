import { useCreatePermission, useUpdatePermission } from "@/hooks/usePermission";
import { permissionSchema, type PermissionFormData } from "@/schemas/permission.schema";
import type { Permission } from "@/types/permission.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AppDialog from "../common/AppDialog";
import FormInput from "../common/FormInput";
import SubmitButton from "../common/SubmitButton";

interface PermissionFormProps {
  open: boolean;
  onClose: () => void;
  permission?: Permission;
}

export default function PermissionForm({
  open,
  onClose,
  permission,
}: PermissionFormProps) {
  const createMutation = useCreatePermission();
  const updateMutation = useUpdatePermission();

  const isEdit = !!permission;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(permissionSchema),
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

  const onSubmit = async (values: PermissionFormData) => {
    try {
      if (isEdit && permission) {
        await updateMutation.mutateAsync({
          uuid: permission.uuid,
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

    if (permission) {
      reset({
        name: permission.name,
        guard_name: permission.guard_name,
        description: permission.description ?? "",
      });
    } else {
      reset({
        name: "",
        guard_name: "web",
        description: "",
      });
    }
  }, [permission, open, reset]);

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title={isEdit ? "Edit Permission" : "Create Permission"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Permission Name"
          registration={register("name")}
          error={errors.name?.message}
          placeholder="e.g. view-users"
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
