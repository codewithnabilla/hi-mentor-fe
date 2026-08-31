import { useMutation, useQuery } from "@tanstack/react-query"
import { login, me, register } from "../services/auth/auth.service"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: me,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};

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

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: register,

        onSuccess: (data) => {
            if (data?.token) {
                localStorage.setItem("token", data.token);
            }

            toast.success(data?.message ?? "Registration successful.");
            navigate(data?.token ? "/dashboard" : "/");
        },

        onError: () => {
            toast.error("Registration failed. Please check your form.");
        },
    });
};