import {
  createCareer,
  deleteCareer,
  getAllCareers,
  getCareer,
  getCareers,
  updateCareer,
} from "@/services/master/career.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const CAREER_QUERY_KEY = ["careers"];

export const useCareers = (page = 1, search = "") =>
  useQuery({
    queryKey: [...CAREER_QUERY_KEY, page, search],
    queryFn: () => getCareers(page, search),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useCareer = (uuid: string) =>
  useQuery({
    queryKey: [...CAREER_QUERY_KEY, uuid],
    queryFn: () => getCareer(uuid),
    enabled: !!uuid,
  });

export const useAllCareers = (search = "") =>
  useQuery({
    queryKey: [...CAREER_QUERY_KEY, "all", search],
    queryFn: () => getAllCareers(search),
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export const useCreateCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCareer,
    onSuccess: (data) => {
      toast.success(data.message ?? "Career created successfully.");
      queryClient.invalidateQueries({ queryKey: CAREER_QUERY_KEY });
    },
    onError: (error) => {
      const message = axios.isAxiosError(error) ? error.response?.data?.message : undefined;
      toast.error(message ?? "Failed to create career.");
    },
  });
};

export const useUpdateCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCareer,
    onSuccess: (data) => {
      toast.success(data.message ?? "Career updated successfully.");
      queryClient.invalidateQueries({ queryKey: CAREER_QUERY_KEY });
    },
    onError: () => toast.error("Failed to update career."),
  });
};

export const useDeleteCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCareer,
    onSuccess: (data) => {
      toast.success(data.message ?? "Career deleted successfully.");
      queryClient.invalidateQueries({ queryKey: CAREER_QUERY_KEY });
    },
    onError: () => toast.error("Failed to delete career."),
  });
};