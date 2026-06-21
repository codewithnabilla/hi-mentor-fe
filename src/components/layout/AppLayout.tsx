import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const logout = useLogout();

  return (
    <div className="min-h-screen flex bg-muted/40">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">

        {/* Logo / Brand */}
        <div className="p-6 border-b">
          <h5 className="text-xl font-bold">Hi Mentor</h5>
          <p className="text-sm text-muted-foreground">
            Admin Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block rounded px-3 py-2 text-sm transition ${isActive
                ? "bg-primary text-white"
                : "hover:bg-muted"
              }`
            }
          >
            Dashboard
          </NavLink>

          {/* add more menus later */}
          {/* 
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/roles">Roles</NavLink>
          */}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <Button
            variant="destructive"
            className="w-full"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}