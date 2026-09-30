import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import MenuPage from "@/pages/menu/MenuPage";
import PermissionPage from "@/pages/permission/PermissionPage";
import RolePage from "@/pages/role/RolePage";
import UserPage from "@/pages/user/UserPage";
import LandingPage from "@/pages/LandingPage";
import DepartmentPage from "@/pages/department/DepartmentPage";
import CareerPage from "@/pages/career/CareerPage";
import SkillPage from "@/pages/skill/SkillPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/menus",
        element: (
            <ProtectedRoute>
                <MenuPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/permissions",
        element: (
            <ProtectedRoute>
                <PermissionPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/roles",
        element: (
            <ProtectedRoute>
                <RolePage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/users",
        element: (
            <ProtectedRoute>
                <UserPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/departments",
        element: (
            <ProtectedRoute>
                <DepartmentPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/careers",
        element: (
            <ProtectedRoute>
                <CareerPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/skills",
        element: (
            <ProtectedRoute>
                <SkillPage />
            </ProtectedRoute>
        ),
    },
]);