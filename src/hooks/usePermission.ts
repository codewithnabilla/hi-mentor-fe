import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getPermission,
  getPermissions,
  updatePermission,
} from "@/services/master/permission.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const PERMISSION_QUERY_KEY = ["permissions"];

export const usePermissions = (page = 1, search = "") => {
  return useQuery({
    queryKey: [...PERMISSION_QUERY_KEY, page, search],
    queryFn: () => getPermissions(page, search),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const usePermission = (uuid: string) => {
  return useQuery({
    queryKey: [...PERMISSION_QUERY_KEY, uuid],
    queryFn: () => getPermission(uuid),
    enabled: !!uuid,
  });
};

export const useAllPermissions = (search = "") => {
  return useQuery({
    queryKey: [...PERMISSION_QUERY_KEY, "all", search],
    queryFn: () => getAllPermissions(search),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPermission,
    onSuccess: (data) => {
      toast.success(data.message ?? "Permission created successfully.");
      queryClient.invalidateQueries({
        queryKey: PERMISSION_QUERY_KEY,
      });
    },
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePermission,
    onSuccess: (data) => {
      toast.success(data.message ?? "Permission updated successfully.");
      queryClient.invalidateQueries({
        queryKey: PERMISSION_QUERY_KEY,
      });
    },
    onError: () => {
      toast.error("Failed to update permission.");
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePermission,
    onSuccess: (data) => {
      toast.success(data.message ?? "Permission deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: PERMISSION_QUERY_KEY,
      });
    },
    onError: () => {
      toast.error("Failed to delete permission.");
    },
  });
};
