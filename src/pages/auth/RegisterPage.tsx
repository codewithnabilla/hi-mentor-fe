import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRegister } from "@/hooks/useLogin";
import { registerSchema } from "@/schemas/auth.schema";
import { ArrowLeft, UserRoundPlus } from "lucide-react";

type RegisterFormValues = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "Mentor",
            password: "",
            password_confirmation: "",
        },
    });

    const selectedRole = watch("role");

    const onSubmit = (data: RegisterFormValues) => {
        const normalizedRole = data.role;

        registerMutation.mutate({
            name: data.name,
            email: data.email,
            role: normalizedRole,
            roles: [normalizedRole],
            password: data.password,
            password_confirmation: data.password_confirmation,
        });
    };

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f6f2] px-6 py-10 text-[#18231f]">
            <div className="pointer-events-none absolute -left-32 -top-36 h-[30rem] w-[30rem] rounded-full bg-[#d4e7dc] opacity-70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-32 h-[24rem] w-[24rem] rounded-full bg-[#f0d7bb] opacity-70 blur-3xl" />

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
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6e7dc] text-[#285848]">
                            <UserRoundPlus className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                            <CardTitle className="text-2xl font-bold tracking-[-0.04em] text-[#183d32]">Create your account</CardTitle>
                            <p className="text-sm text-[#69776f]">Join a community built around shared skills.</p>
                        </div>
                    </CardHeader>

                    <CardContent className="px-7 pb-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input placeholder="Enter your name" {...register("name")} />
                            {errors.name && (
                                <p className="text-sm text-red-500">{String(errors.name.message)}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input placeholder="Enter your email" {...register("email")} />
                            {errors.email && (
                                <p className="text-sm text-red-500">{String(errors.email.message)}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Select
                                value={selectedRole}
                                onValueChange={(value) => setValue("role", value, { shouldValidate: true })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Mentor">Mentor</SelectItem>
                                    <SelectItem value="Student">Student</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.role && (
                                <p className="text-sm text-red-500">{String(errors.role.message)}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input type="password" placeholder="Enter your password" {...register("password")} />
                            {errors.password && (
                                <p className="text-sm text-red-500">{String(errors.password.message)}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                placeholder="Confirm your password"
                                {...register("password_confirmation")}
                            />
                            {errors.password_confirmation && (
                                <p className="text-sm text-red-500">
                                    {String(errors.password_confirmation.message)}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full bg-[#183d32] text-white hover:bg-[#285848]" disabled={registerMutation.isPending}>
                            {registerMutation.isPending ? "Registering..." : "Register"}
                        </Button>

                        <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/login")}>
                            Already have an account? Login
                        </Button>
                    </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
