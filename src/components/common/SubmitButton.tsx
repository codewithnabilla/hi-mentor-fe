import { Button } from "@/components/ui/button";

interface Props {
	loading: boolean;
	text?: string;
	loadingText?: string;
}

export default function SubmitButton({
	loading,
	text = "Save",
	loadingText = "Saving...",
}: Props) {
	return (
		<Button
			type="submit"
			className="w-full"
			disabled={loading}
		>
			{loading ? loadingText : text}
		</Button>
	);
}