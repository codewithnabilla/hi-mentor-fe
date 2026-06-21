import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/auth.schema";
import { Navigate } from "react-router-dom";


export default function LoginPage() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    loginMutation.mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          placeholder="Email"
          {...register("email")}
        />

        <p>{errors.email?.message}</p>
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        <p>{errors.password?.message}</p>
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending
          ? "Loading..."
          : "Login"}
      </button>
    </form>
  )
}