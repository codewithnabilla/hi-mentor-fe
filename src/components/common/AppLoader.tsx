import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLoaderProps {
  label?: string;
  className?: string;
  size?: number;
  compact?: boolean;
}

export default function AppLoader({
  label = "Loading...",
  className,
  size = 18,
  compact = false,
}: AppLoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 text-muted-foreground",
        compact ? "py-3" : "py-8",
        className,
      )}
    >
      <LoaderCircle className="animate-spin" style={{ width: size, height: size }} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
