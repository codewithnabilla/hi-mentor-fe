import {
    Bell,
    CircleHelp,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";
import { useLogout } from "@/hooks/useLogout";
import { useMe } from "@/hooks/useLogin";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppHeaderProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export default function AppHeader({ isSidebarOpen, onToggleSidebar }: AppHeaderProps) {
    const { mutate: logout } = useLogout();
    const { data: meData } = useMe();
    const userName = meData?.user?.name ?? meData?.name ?? "User";
    const initials = userName
        .trim()
        .split(/\s+/)
        .map((part: string) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "U";

    return (
        <header className="flex h-16 items-center justify-between border-b border-[#d9e1db] bg-white/90 px-6 backdrop-blur">

            {/* Left */}
            <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSidebar}
                aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
                {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
            </Button>

            {/* Right */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                >
                    <CircleHelp className="h-5 w-5" />
                </Button>

                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <Bell className="h-5 w-5" />
                    </Button>

                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px]">
                        12
                    </span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-9 w-9 rounded-full p-0"
                        >
                            <Avatar className="h-9 w-9 cursor-pointer">
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-52">
                        <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                            {userName}
                        </div>

                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => logout()}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </header>
    );
}