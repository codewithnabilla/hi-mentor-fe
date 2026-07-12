import { NavLink } from "react-router-dom";
import { useMenus } from "@/hooks/useMenu";
import type { Menu } from "@/types/menu.type";
import { menuIcons } from "@/lib/menu-icons";

export default function AppSidebar() {
  const { data: menus, isLoading } = useMenus();

  return (
    <aside className="w-64 bg-white border-r flex flex-col">

      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <div>
          <h5 className="text-lg font-bold">
            HI Mentor
          </h5>

          <p className="text-xs text-muted-foreground">
            Admin Dashboard
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">

        {isLoading && (
          <p className="text-sm text-muted-foreground">
            Loading...
          </p>
        )}

        {menus?.data?.map((menu: Menu) => {
          const Icon = menuIcons[menu.icon as keyof typeof menuIcons];

          return (
            <div key={menu.uuid}>
              <NavLink
                to={menu.route}
                className={({ isActive }) =>
                  `flex items-center rounded-md px-3 py-2 text-sm transition ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                  }`
                }
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {menu.name}
              </NavLink>

              {menu.children?.length > 0 && (
                <div className="ml-4 mt-1 space-y-1 border-l pl-3">
                  {menu.children.map((child: Menu) => {
                    const ChildIcon =
                      menuIcons[child.icon as keyof typeof menuIcons];

                    return (
                      <NavLink
                        key={child.uuid}
                        to={child.route}
                        className={({ isActive }) =>
                          `flex items-center rounded-md px-3 py-2 text-sm transition ${isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                          }`
                        }
                      >
                        {ChildIcon && (
                          <ChildIcon className="mr-2 h-4 w-4" />
                        )}
                        {child.name}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

      </nav>
    </aside>
  );
}