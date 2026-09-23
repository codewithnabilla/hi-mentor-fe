import { createDepartment, deleteDepartment, getAllDepartments, getDepartments, updateDepartment } from "@/services/master/department.service"
import { getPermission } from "@/services/master/permission.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

const DEPARTMENT_QUERY_KEY = ["departments"]

export const useDepartments = (page = 1, search = "") => {
  return useQuery({
    queryKey: [...DEPARTMENT_QUERY_KEY, page, search],
    queryFn: () => getDepartments(page, search),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}

export const useDepartment = (uuid: string) => {
  return useQuery({
    queryKey: [...DEPARTMENT_QUERY_KEY, uuid],
    queryFn: () => getPermission(uuid),
    enabled: !!uuid,
  })
}

export const useAllDepartments = (search = "") => {
  return useQuery({
    queryKey: [...DEPARTMENT_QUERY_KEY, "all", search],
    queryFn: () => getAllDepartments(search),
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,
    onSuccess: (data) => {
      toast.success(data.message ?? "Department created successfully.");
      queryClient.invalidateQueries({
        queryKey: DEPARTMENT_QUERY_KEY
      })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        toast.error(message ?? "Failed to create department.");
      } else {
        toast.error("Failed to create department.");
      }
    },
  })
}

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDepartment,
    onSuccess: (data) => {
      toast.success(data.message ?? "Department updated successfully.");
      queryClient.invalidateQueries({
        queryKey: DEPARTMENT_QUERY_KEY
      })
    },
    onError: (data) => {
      console.log("ini data dep", data);

      toast.error(data.message ?? "Failed to update department.");
    },
  })
}

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: (data) => {
      toast.success(data.message ?? "Department deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: DEPARTMENT_QUERY_KEY,
      });
    },
    onError: () => {
      toast.error("Failed to delete department.");
    },
  });
};

