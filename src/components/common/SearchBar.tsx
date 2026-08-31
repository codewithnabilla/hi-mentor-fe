import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  debounceMs?: number;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  className,
  disabled = false,
  debounceMs = 400,
}: SearchBarProps) {
  useEffect(() => {
    if (!onSearch) return;

    const timer = window.setTimeout(() => {
      onSearch(value.trim());
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [value, debounceMs, onSearch]);

  const handleClear = () => {
    onChange("");
    onSearch?.("");
  };

  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 rounded-lg border border-input bg-background px-2.5 py-1.5 shadow-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        className,
      )}
    >
      <Search className="h-4 w-4 text-muted-foreground" />

      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 [appearance:textfield] [-webkit-appearance:none] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={handleClear}
          disabled={disabled}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
