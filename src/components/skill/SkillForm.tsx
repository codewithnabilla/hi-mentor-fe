import { useCreateSkill, useUpdateSkill } from "@/hooks/useSkill";
import { skillSchema, type SkillFormData } from "@/schemas/skill.schema";
import type { Skill } from "@/types/skill.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AppDialog from "../common/AppDialog";
import FormInput from "../common/FormInput";
import SubmitButton from "../common/SubmitButton";

interface SkillFormProps {
  open: boolean;
  onClose: () => void;
  skill?: Skill;
}

export default function SkillForm({ open, onClose, skill }: SkillFormProps) {
  const createMutation = useCreateSkill();
  const updateMutation = useUpdateSkill();
  const isEdit = !!skill;
  const { register, reset, handleSubmit, formState: { errors } } = useForm<SkillFormData>({
    resolver: yupResolver(skillSchema),
    defaultValues: { name: "", code: "", description: "" },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values: SkillFormData) => {
    try {
      if (skill) {
        await updateMutation.mutateAsync({ uuid: skill.uuid, payload: values });
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
    reset(skill
      ? { name: skill.name, code: skill.code, description: skill.description ?? "" }
      : { name: "", code: "", description: "" });
  }, [skill, open, reset]);

  return (
    <AppDialog open={open} onClose={handleClose} title={isEdit ? "Edit Skill" : "Create Skill"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput label="Skill Name" registration={register("name")} error={errors.name?.message} placeholder="Skill Name" />
        <FormInput label="Code" registration={register("code")} error={errors.code?.message} placeholder="Skill Code" />
        <FormInput label="Description" registration={register("description")} error={errors.description?.message} placeholder="Optional description" />
        <SubmitButton loading={createMutation.isPending || updateMutation.isPending} text={isEdit ? "Update" : "Create"} />
      </form>
    </AppDialog>
  );
}