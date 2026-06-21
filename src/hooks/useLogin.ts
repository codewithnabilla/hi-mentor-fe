import { useMutation } from "@tanstack/react-query"
import { login } from "../services/auth/auth.service"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: login,

        onSuccess: (data) => {
            localStorage.setItem(
                "token",
                data.token
            )

            toast.success(data.message);
            navigate("/dashboard");
        },


        onError: () => {
            toast.error("Invalid credentials");
        },
    })
}