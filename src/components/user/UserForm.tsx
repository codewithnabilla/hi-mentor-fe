import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AppDialog from "../common/AppDialog";
import FormCheckbox from "../common/FormCheckbox";
import FormInput from "../common/FormInput";
import SubmitButton from "../common/SubmitButton";
import type { User } from "@/types/user.type";
import { useUpdateUser } from "@/hooks/useUser";
import { useRoles } from "@/hooks/useRole";
import { userSchema, type UserFormData } from "@/schemas/user.schema";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  user?: User;
}

export default function UserForm({
  open,
  onClose,
  user,
}: UserFormProps) {
  // const createMutation = useCreatePermission();
  const updateMutation = useUpdateUser();
  const { data: rolesResponse } = useRoles();

  const isEdit = !!user;
  const allRoles = Array.isArray(rolesResponse) ? rolesResponse : rolesResponse?.data ?? [];
  const allowedRoles = allRoles;

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role_ids: [],
    },
  });

  const selectedRoleIds = watch("role_ids") ?? [];

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values: UserFormData) => {
    try {
      if (isEdit && user) {
        const roleIds = values.role_ids ?? [];

        await updateMutation.mutateAsync({
          uuid: user.uuid,
          payload: {
            ...values,
            role_ids: roleIds,
            roles: roleIds,
          },
        });
      }

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const loading = updateMutation.isPending;

  useEffect(() => {
    if (!open) return;

    const currentRoleIds = (user?.roles ?? []).map((role) => role.uuid);

    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role_ids: currentRoleIds,
      });
    } else {
      reset({
        name: "",
        email: "",
        role_ids: [],
      });
    }
  }, [user, open, reset]);

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title={isEdit ? "Edit User" : "Create User"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Name"
          registration={register("name")}
          error={errors.name?.message}
        />

        <FormInput
          label="Email"
          registration={register("email")}
          error={errors.email?.message}
          placeholder="user@mail.com"
        />

        <div className="space-y-3">
          <label className="text-sm font-medium">Role</label>

          <div className="space-y-2 rounded-md border p-3">
            {allowedRoles.length === 0 ? (
              <p className="text-sm text-muted-foreground">No mentor/student roles available.</p>
            ) : (
              allowedRoles.map((role: any) => {
                const checked = selectedRoleIds.includes(role.uuid);

                return (
                  <FormCheckbox
                    key={role.uuid}
                    label={role.name}
                    checked={checked}
                    onCheckedChange={(value) => {
                      const nextValue = value
                        ? [...selectedRoleIds, role.uuid]
                        : selectedRoleIds.filter((id: string) => id !== role.uuid);

                      setValue("role_ids", nextValue, { shouldValidate: true });
                    }}
                  />
                );
              })
            )}
          </div>

          {errors.role_ids && (
            <p className="text-sm text-red-500">{String(errors.role_ids.message)}</p>
          )}
        </div>

        <SubmitButton loading={loading} text={isEdit ? "Update" : "Create"} />
      </form>
    </AppDialog>
  );
}
