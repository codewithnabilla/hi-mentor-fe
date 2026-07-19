import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";


interface Props {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export default function FormCheckbox({
    label,
    checked,
    onCheckedChange,
}: Props) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                checked={checked}
                onCheckedChange={(value) =>
                    onCheckedChange(!!value)
                }
            />

            <Label>{label}</Label>
        </div>
    );
}