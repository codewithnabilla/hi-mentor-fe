import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value?: string | null;
  placeholder?: string;
  error?: string;
  options: Option[];
  onChange: (value: string | null) => void;
}

export default function FormSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Select",
  error,
}: Props) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Select
        value={value ?? "__ROOT__"}
        onValueChange={(v) =>
          onChange(v === "__ROOT__" ? null : v)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="__ROOT__">
            Root Menu
          </SelectItem>

          {options.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}