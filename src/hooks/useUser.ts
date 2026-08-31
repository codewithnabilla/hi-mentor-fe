import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "@/services/master/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const USER_QUERY_KEY = ["users"];

export const useUsers = (page = 1, search = "") => {
  return useQuery({
    queryKey: [...USER_QUERY_KEY, page, search],
    queryFn: () => getUsers(page, search),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useUser = (uuid: string) => {
  return useQuery({
    queryKey: [...USER_QUERY_KEY, uuid],
    queryFn: () => getUser(uuid),
    enabled: !!uuid,
  });
};

// export const useCreateUser = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createUser,
//     onSuccess: (data) => {
//       toast.success(data.message ?? "User created successfully.");
//       queryClient.invalidateQueries({
//         queryKey: USER_QUERY_KEY,
//       });
//     },
//   });
// };

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success(data.message ?? "User updated successfully.");
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      });
    },
    onError: () => {
      toast.error("Failed to update User.");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      toast.success(data.message ?? "User deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      });
    },
    onError: () => {
      toast.error("Failed to delete User.");
    },
  });
};
