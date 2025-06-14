"use client";

import { MediaSelector } from "@/components/forms/media-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SelectMedia } from "@/db/schema";
import { createCategory } from "@/lib/actions";
import { Plus } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useActionState, useState } from "react";

type AddCategoryFormProps = {
	media: SelectMedia[];
};

export function AddCategoryForm({ media }: AddCategoryFormProps) {
	const [state, formAction, isPending] = useActionState(createCategory, null);
	const [selectedMedia, setSelectedMedia] = useState<number[]>([]);

	const handleSubmit = (formData: FormData) => {
		formData.append("mediaIds", JSON.stringify(selectedMedia));
		formAction(formData);
	};

	return (
		<form action={handleSubmit} className="space-y-4">
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

			<MediaSelector
				onMediaChangeAction={setSelectedMedia}
				selectedMedia={selectedMedia}
				media={media}
			/>

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
