import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMenus } from "@/hooks/useMenu";
import type { Menu } from "@/types/menu.type";
import { menuIcons } from "@/lib/menu-icons";
import { useMe } from "@/hooks/useLogin";
import AppLoader from "@/components/common/AppLoader";

interface AppSidebarProps {
  isOpen: boolean;
}

export default function AppSidebar({ isOpen }: AppSidebarProps) {
  const { data: menus, isLoading } = useMenus();
  const { data: meData } = useMe();
  const userName = meData?.user?.name ?? meData?.name ?? meData?.data?.name ?? "Dashboard";
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menuUuid: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuUuid]: !(prev[menuUuid] ?? true),
    }));
  };

  return (
    <aside className={`flex flex-col border-r border-[#d9e1db] bg-white transition-all duration-200 ${isOpen ? "w-64" : "w-20"}`}>
      {/* Logo */}
      <div className={`h-16 flex items-center border-b ${isOpen ? "px-6" : "px-3 justify-center"}`}>
        <div className={isOpen ? "block" : "hidden"}>
          <h5 className="text-lg font-bold">
            HI Mentor
          </h5>

          <p className="text-xs text-muted-foreground truncate">
            {userName}
          </p>
        </div>

        {!isOpen && (
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-lg font-bold">
            H
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {isLoading && (
          <AppLoader
            label={isOpen ? "Loading..." : ""}
            compact
            className={isOpen ? "justify-start px-2" : "justify-center"}
            size={14}
          />
        )}

        {menus?.data?.map((menu: Menu) => {
          const Icon = menuIcons[menu.icon as keyof typeof menuIcons];
          const hasChildren = (menu.children?.length ?? 0) > 0;
          const isExpanded = expandedMenus[menu.uuid] ?? true;

          if (hasChildren) {
            return (
              <div key={menu.uuid} className="space-y-1">
                <div className={`flex items-center rounded-md border border-transparent transition ${isOpen ? "px-2" : "justify-center p-2"}`}>
                  <button
                    type="button"
                    onClick={() => toggleMenu(menu.uuid)}
                    className={`flex flex-1 items-center rounded-md transition ${isOpen ? "px-2 py-2 text-sm text-left" : "justify-center p-2"} ${isExpanded ? "bg-muted/80" : "hover:bg-muted"}`}
                    title={isOpen ? undefined : menu.name}
                    aria-label={menu.name}
                  >
                    {Icon && <Icon className={isOpen ? "mr-2 h-4 w-4" : "h-4 w-4"} />}
                    {isOpen && menu.name}
                  </button>

                  {isOpen && (
                    <button
                      type="button"
                      onClick={() => toggleMenu(menu.uuid)}
                      className="ml-1 rounded-md p-1 hover:bg-muted"
                      aria-label={isExpanded ? `Collapse ${menu.name}` : `Expand ${menu.name}`}
                    >
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                  )}
                </div>

                {isOpen && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l pl-3">
                    {menu.children.map((child: Menu) => {
                      const ChildIcon = menuIcons[child.icon as keyof typeof menuIcons];

                      return (
                        <NavLink
                          key={child.uuid}
                          to={child.route}
                          className={({ isActive }) =>
                            `flex items-center rounded-md px-3 py-2 text-sm transition ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`
                          }
                        >
                          {ChildIcon && <ChildIcon className="mr-2 h-4 w-4" />}
                          {child.name}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={menu.uuid}
              to={menu.route}
              className={({ isActive }) =>
                `flex items-center rounded-md transition ${isOpen ? "px-3 py-2 text-sm" : "justify-center p-2"} ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`
              }
              title={isOpen ? undefined : menu.name}
            >
              {Icon && <Icon className={isOpen ? "mr-2 h-4 w-4" : "h-4 w-4"} />}
              {isOpen && menu.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}