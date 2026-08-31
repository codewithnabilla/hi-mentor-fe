import {
  assignPermissionsToRole,
  createRole,
  deleteRole,
  getAllRoles,
  getRole,
  getRoles,
  updateRole,
} from "@/services/master/role.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const ROLE_QUERY_KEY = ["roles"];

export const useRoles = (page = 1, search = "") => {
  return useQuery({
    queryKey: [...ROLE_QUERY_KEY, page, search],
    queryFn: () => getRoles(page, search),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useAllRoles = (search = "") => {
  return useQuery({
    queryKey: [...ROLE_QUERY_KEY, "all", search],
    queryFn: () => getAllRoles(search),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useRole = (uuid: string) => {
  return useQuery({
    queryKey: [...ROLE_QUERY_KEY, uuid],
    queryFn: () => getRole(uuid),
    enabled: !!uuid,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRole,
    onSuccess: (data) => {
      toast.success(data.message ?? "Role created successfully.");
      queryClient.invalidateQueries({
        queryKey: ROLE_QUERY_KEY,
      });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRole,
    onSuccess: (data) => {
      toast.success(data.message ?? "Role updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ROLE_QUERY_KEY,
      });
    },
    onError: () => {
      toast.error("Failed to update role.");
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRole,
    onSuccess: (data) => {
      toast.success(data.message ?? "Role deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ROLE_QUERY_KEY,
      });
    },
    onError: () => {
      toast.error("Failed to delete role.");
    },
  });
};

export const useAssignPermissionsToRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignPermissionsToRole,
    onSuccess: (data) => {
      toast.success(data.message ?? "Permissions assigned successfully.");
      queryClient.invalidateQueries({
        queryKey: ROLE_QUERY_KEY,
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => {
      toast.error("Failed to assign permissions.");
    },
  });
};
