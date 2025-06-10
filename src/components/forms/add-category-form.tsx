import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCategory } from "@/lib/actions";
import { Plus } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";

type AddCategoryFormProps = {
	onCancel: () => void;
};

export function AddCategoryForm({ onCancel }: AddCategoryFormProps) {
	const [state, formAction, isPending] = useActionState(createCategory, null);

	return (
		<form action={formAction} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="title">Category Title</Label>
				<Input
					id="title"
					name="title"
					placeholder="Enter category title"
					required
					disabled={isPending}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Textarea
					id="description"
					name="description"
					placeholder="Enter category description"
					disabled={isPending}
				/>
			</div>

			{state && !state.success && (
				<div className="text-sm text-red-600 bg-red-50 p-2 rounded">
					{state.message}
				</div>
			)}

			{state?.success && (
				<div className="text-sm text-green-600 bg-green-50 p-2 rounded">
					{state.message}
				</div>
			)}

			<div className="flex justify-end space-x-2">
				<Button
					className="hover:cursor-pointer"
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={isPending}
				>
					Cancel
				</Button>
				<Button
					className="hover:cursor-pointer flex-row gap-2"
					type="submit"
					disabled={isPending}
				>
					{isPending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Creating...
						</>
					) : (
						<>
							<Plus className="h-4 w-4" />
							Create Category
						</>
					)}
				</Button>
			</div>
		</form>
	);
}
