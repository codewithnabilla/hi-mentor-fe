import { useCreateCareer, useUpdateCareer } from "@/hooks/useCareer";
import { careerSchema, type CareerFormData } from "@/schemas/career.schema";
import type { Career } from "@/types/career.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AppDialog from "../common/AppDialog";
import FormInput from "../common/FormInput";
import SubmitButton from "../common/SubmitButton";

interface CareerFormProps {
  open: boolean;
  onClose: () => void;
  career?: Career;
}

export default function CareerForm({ open, onClose, career }: CareerFormProps) {
  const createMutation = useCreateCareer();
  const updateMutation = useUpdateCareer();
  const isEdit = !!career;
  const { register, reset, handleSubmit, formState: { errors } } = useForm<CareerFormData>({
    resolver: yupResolver(careerSchema),
    defaultValues: { name: "", code: "", description: "" },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values: CareerFormData) => {
    try {
      if (career) {
        await updateMutation.mutateAsync({ uuid: career.uuid, payload: values });
      } else {
        await createMutation.mutateAsync(values);
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!open) return;
    reset(career
      ? { name: career.name, code: career.code, description: career.description ?? "" }
      : { name: "", code: "", description: "" });
  }, [career, open, reset]);

  return (
    <AppDialog open={open} onClose={handleClose} title={isEdit ? "Edit Career" : "Create Career"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput label="Career Name" registration={register("name")} error={errors.name?.message} placeholder="Career Name" />
        <FormInput label="Code" registration={register("code")} error={errors.code?.message} placeholder="Career Code" />
        <FormInput label="Description" registration={register("description")} error={errors.description?.message} placeholder="Optional description" />
        <SubmitButton loading={createMutation.isPending || updateMutation.isPending} text={isEdit ? "Update" : "Create"} />
      </form>
    </AppDialog>
  );
}