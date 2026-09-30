import {
  createSkill,
  deleteSkill,
  getAllSkills,
  getSkill,
  getSkills,
  updateSkill,
} from "@/services/master/skill.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const SKILL_QUERY_KEY = ["skills"];

export const useSkills = (page = 1, search = "") =>
  useQuery({
    queryKey: [...SKILL_QUERY_KEY, page, search],
    queryFn: () => getSkills(page, search),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useSkill = (uuid: string) =>
  useQuery({
    queryKey: [...SKILL_QUERY_KEY, uuid],
    queryFn: () => getSkill(uuid),
    enabled: !!uuid,
  });

export const useAllSkills = (search = "") =>
  useQuery({
    queryKey: [...SKILL_QUERY_KEY, "all", search],
    queryFn: () => getAllSkills(search),
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSkill,
    onSuccess: (data) => {
      toast.success(data.message ?? "Skill created successfully.");
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEY });
    },
    onError: (error) => {
      const message = axios.isAxiosError(error) ? error.response?.data?.message : undefined;
      toast.error(message ?? "Failed to create skill.");
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSkill,
    onSuccess: (data) => {
      toast.success(data.message ?? "Skill updated successfully.");
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEY });
    },
    onError: () => toast.error("Failed to update skill."),
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: (data) => {
      toast.success(data.message ?? "Skill deleted successfully.");
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEY });
    },
    onError: () => toast.error("Failed to delete skill."),
  });
};