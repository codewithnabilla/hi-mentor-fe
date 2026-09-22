import { useCreateDepartment, useUpdateDepartment } from "@/hooks/useDepartment"
import { departmentSchema, type DepartmentFormData } from "@/schemas/department.schema"
import type { Department } from "@/types/department.type"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import AppDialog from "../common/AppDialog"
import FormInput from "../common/FormInput"
import SubmitButton from "../common/SubmitButton"

interface DepatmentFormProps {
  open: boolean
  onClose: () => void
  department?: Department
}

export default function DepartmentForm({
  open,
  onClose,
  department
}: DepatmentFormProps) {
  const createMutation = useCreateDepartment()
  const updateMutation = useUpdateDepartment()

  const isEdit = !!department

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(departmentSchema),
    defaultValues: {
      name: "",
      code: "",
      description: ""
    }
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = async (values: DepartmentFormData) => {
    try {
      if (isEdit && department) {
        await updateMutation.mutateAsync({
          uuid: department.uuid,
          payload: values
        })
      } else {
        await createMutation.mutateAsync(values)
      }

      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  const loading = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (!open) return

    if (department) {
      reset({
        name: department.name,
        code: department.code,
        description: department.description ?? ''
      })
    } else {
      reset({
        name: "",
        code: "",
        description: ""
      })
    }
  }, [department, open, reset])

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title={isEdit ? "Edit Department" : "Create Department"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Department Name"
          registration={register("name")}
          error={errors.name?.message}
          placeholder="Department Name"
        />

        <FormInput
          label="Code"
          registration={register("code")}
          error={errors.code?.message}
          placeholder="Department Code"
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