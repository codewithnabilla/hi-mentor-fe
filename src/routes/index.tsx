import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import MenuPage from "@/pages/menu/MenuPage";
import PermissionPage from "@/pages/permission/PermissionPage";
import RolePage from "@/pages/role/RolePage";
import UserPage from "@/pages/user/UserPage";

export const router = createBrowserRouter([
    {
        path: "/",
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
]);