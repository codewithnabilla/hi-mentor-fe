import {
    Bell,
    CircleHelp,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";
import { useLogout } from "@/hooks/useLogout";

export default function AppHeader() {
    const { mutate: logout } = useLogout();

    return (
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">

            {/* Left */}
            <Button
                variant="ghost"
                size="icon"
            >
                <Menu className="h-5 w-5" />
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

                <Avatar
                    className="cursor-pointer"
                    onClick={() => logout()}
                >
                    <AvatarFallback>T</AvatarFallback>
                </Avatar>

            </div>
        </header>
    );
}