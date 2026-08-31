import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginSchema } from "../../schemas/auth.schema";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogIn } from "lucide-react";

type LoginFormValues = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data)
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f6f2] px-6 py-10 text-[#18231f]">
      <div className="pointer-events-none absolute -right-32 -top-36 h-[30rem] w-[30rem] rounded-full bg-[#d4e7dc] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#f0d7bb] opacity-70 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="Back to Hi Mentor home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#183d32] text-lg font-bold text-[#f6c877]">H</span>
            <span className="text-lg font-bold tracking-[-0.03em] text-[#183d32]">HI Mentor</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#607168] transition hover:text-[#183d32]">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>

        <Card className="border-[#d9e1db] bg-white/90 shadow-xl shadow-[#183d32]/10">
          <CardHeader className="space-y-3 px-7 pt-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0d7bb] text-[#a7652e]">
              <LogIn className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-[-0.04em] text-[#183d32]">Welcome back</CardTitle>
              <p className="text-sm text-[#69776f]">Continue learning, sharing, and growing.</p>
            </div>
          </CardHeader>

          <CardContent className="px-7 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-[#183d32] text-white hover:bg-[#285848]"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Loading..." : "Login"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate("/register")}
            >
              Don&apos;t have an account? Register
            </Button>
          </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}