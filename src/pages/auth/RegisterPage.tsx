import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useLogin";
import { registerSchema } from "@/schemas/auth.schema";

export default function RegisterPage() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const onSubmit = (data: any) => {
        registerMutation.mutate({
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Create Account</CardTitle>
                </CardHeader>

                <CardContent>
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

                        <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                            {registerMutation.isPending ? "Registering..." : "Register"}
                        </Button>

                        <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/")}>
                            Already have an account? Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
