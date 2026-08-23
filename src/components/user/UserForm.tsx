import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AppDialog from "../common/AppDialog";
import FormInput from "../common/FormInput";
import SubmitButton from "../common/SubmitButton";
import type { User } from "@/types/user.type";
import { useUpdateUser } from "@/hooks/useUser";
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

  const isEdit = !!user;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values: UserFormData) => {
    try {
      if (isEdit && user) {
        await updateMutation.mutateAsync({
          uuid: user.uuid,
          payload: values,
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

    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    } else {
      reset({
        name: "",
        email: "",
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

        <SubmitButton loading={loading} text={isEdit ? "Update" : "Create"} />
      </form>
    </AppDialog>
  );
}
