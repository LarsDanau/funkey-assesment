import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { InsertCategory } from "@/db/schema";
import { createActivity } from "@/lib/actions";
import { Plus } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";

type AddActivityFormProps = {
	categoryId: NonNullable<InsertCategory["id"]>;
	onCancel: () => void;
};

export function AddActivityForm({
	categoryId,
	onCancel,
}: AddActivityFormProps) {
	const [state, formAction, isPending] = useActionState(createActivity, null);

	return (
		<form action={formAction} className="space-y-4">
			<input type="hidden" name="categoryId" value={categoryId} />
			<div className="space-y-2">
				<Label htmlFor="activity-title">Activity Name</Label>
				<Input
					id="activity-title"
					name="title"
					placeholder="Enter activity title"
					required
					disabled={isPending}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="activity-description">Description</Label>
				<Textarea
					id="activity-description"
					name="description"
					placeholder="Enter activity description (optional)"
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
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={isPending}
				>
					Cancel
				</Button>
				<Button
					type="submit"
					disabled={isPending}
					className="hover:cursor-pointer flex gap-2"
				>
					{isPending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Creating...
						</>
					) : (
						<>
							<Plus className="h-4 w-4" />
							Create Activity
						</>
					)}
				</Button>
			</div>
		</form>
	);
}
