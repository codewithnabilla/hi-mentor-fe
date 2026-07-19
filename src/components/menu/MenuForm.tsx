import { useCreateMenu, useUpdateMenu } from "@/hooks/useMenu";
// import type { Menu, MenuFormData } from "@/types/menu.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import AppDialog from "../common/AppDialog";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import FormCheckbox from "../common/FormCheckbox";
import { useEffect } from "react";
// import { menuSchema } from "@/schemas/menu.schema";
import SubmitButton from "../common/SubmitButton";
import type { Menu } from "@/types/menu.type";
import { menuSchema, type MenuFormData } from "@/schemas/menu.schema";

interface MenuFormProps {
  open: boolean;
  onClose: () => void;
  menu?: Menu;
  menus: Menu[];
}

export default function MenuForm({
  open,
  onClose,
  menu,
  menus,
}: MenuFormProps) {
  const createMutation = useCreateMenu();
  const updateMutation = useUpdateMenu();

  const isEdit = !!menu;

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(menuSchema),
    defaultValues: {
      name: "",
      route: "",
      icon: "",
      order: 1,
      permission: "",
      parent_uuid: null,
      is_active: true,
    },
  });

  const handleClose = () => {
    reset();

    onClose();
  };

  const onSubmit = async (
    values: MenuFormData
  ) => {
    try {
      if (isEdit && menu) {
        await updateMutation.mutateAsync({
          uuid: menu.uuid,
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

  const loading =
    createMutation.isPending ||
    updateMutation.isPending;

  const parentOptions = menus
    .filter(
      (item) =>
        item.uuid !== menu?.uuid &&
        item.parent_uuid === null
    )
    .map((item) => ({
      label: item.name,
      value: item.uuid,
    }));

  useEffect(() => {
    if (!open) return;

    if (menu) {
      reset({
        name: menu.name,
        route: menu.route,
        icon: menu.icon,
        order: menu.order,
        permission: menu.permission ?? "",
        parent_uuid: menu.parent_uuid,
        is_active: menu.is_active,
      });
    } else {
      reset({
        name: "",
        route: "",
        icon: "",
        order: 1,
        permission: "",
        parent_uuid: null,
        is_active: true,
      });
    }
  }, [menu, open, reset]);

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title={isEdit ? "Edit Menu" : "Create Menu"}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormInput
          label="Menu Name"
          registration={register("name")}
          error={errors.name?.message}
        />

        <FormInput
          label="Route"
          registration={register("route")}
          error={errors.route?.message}
        />

        <FormInput
          label="Icon"
          registration={register("icon")}
          error={errors.icon?.message}
        />

        <FormInput
          label="Order"
          type="number"
          registration={register("order", {
            valueAsNumber: true,
          })}
          error={errors.order?.message}
        />

        <FormInput
          label="Permission"
          registration={register("permission")}
          error={errors.permission?.message}
        />

        <Controller
          control={control}
          name="parent_uuid"
          render={({ field }) => (
            <FormSelect
              label="Parent Menu"
              value={field.value}
              options={parentOptions}
              onChange={field.onChange}
              error={errors.parent_uuid?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="is_active"
          render={({ field }) => (
            <FormCheckbox
              label="Active"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />

        <SubmitButton
          loading={loading}
          text={isEdit ? "Update" : "Create"}
        />
      </form>
    </AppDialog>
  )
}