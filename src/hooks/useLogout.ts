import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { logout } from "../services/auth/auth.service"
import { toast } from "sonner"

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,

    onSuccess: (data) => {
      localStorage.removeItem("token");
      queryClient.clear();

      toast.success(data.message ?? "Logged out successfully");
      navigate("/");
    },

    onError: () => {
      localStorage.removeItem("token");
      queryClient.clear();

      toast.error("Session expired");
      navigate("/");
    },

  })
}