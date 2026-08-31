import { createMenu, deleteMenu, getMenu, getMenus, updateMenu } from "@/services/master/menu.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const MENU_QUERY_KEY = ["menus"];

// get all
export const useMenus = (search = "") => {
  return useQuery({
    queryKey: [...MENU_QUERY_KEY, search],
    queryFn: () => getMenus(search),

    // just fetch once

    staleTime: Infinity,
    gcTime: Infinity,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

// get detail
export const useMenu = (uuid: string) => {
  return useQuery({
    queryKey: [...MENU_QUERY_KEY, uuid],
    queryFn: () => getMenu(uuid),
    enabled: !!uuid
  })
}

// create
export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMenu,

    onSuccess: (data) => {
      toast.success(data.message ?? "Menu created successfully.");
      queryClient.invalidateQueries({
        queryKey: MENU_QUERY_KEY,
      });
    }
  })
}

// update
export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMenu,

    onSuccess: (data) => {
      toast.success(data.message ?? "Menu updated successfully.");
      queryClient.invalidateQueries({
        queryKey: MENU_QUERY_KEY,
      });
    },

    onError: () => {
      toast.error("Failed to update menu.");
    },
  });
};

// delete
export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMenu,

    onSuccess: (data) => {
      toast.success(data.message ?? "Menu deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: MENU_QUERY_KEY,
      });
    },

    onError: () => {
      toast.error("Failed to delete menu.");
    },
  });
};