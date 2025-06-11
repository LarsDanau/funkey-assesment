"use client";

import { ActivitySelector } from "@/components/forms/activity-selector";
import { MediaSelector } from "@/components/forms/media-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type {
	getAllActivities,
	getCategoryWithMediaAndActivities,
} from "@/db/queries";
import type { SelectMedia } from "@/db/schema";
import { updateCategory } from "@/lib/actions";
import { Pencil } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useActionState, useState } from "react";

type EditCategoryForm = {
	media: SelectMedia[];
	category: NonNullable<
		Awaited<ReturnType<typeof getCategoryWithMediaAndActivities>>
	>;
	activities: NonNullable<Awaited<ReturnType<typeof getAllActivities>>>;
};

export function EditCategoryForm({
	media,
	category,
	activities,
}: EditCategoryForm) {
	const [state, formAction, isPending] = useActionState(updateCategory, null);
	const [selectedMedia, setSelectedMedia] = useState<number[]>(
		category?.categoriesMedia
			.map((media) => media.media_id)
			.filter((media) => media !== null) ?? [],
	);

	const [selectedActivityIds, setSelectedActivityIds] = useState<number[]>(
		category?.activities?.map((activity) => activity.id) ?? [],
	);

	const handleSubmit = (formData: FormData) => {
		formData.append("mediaIds", JSON.stringify(selectedMedia));
		formData.append("activityIds", JSON.stringify(selectedActivityIds));
		formAction(formData);
	};

	return (
		<form action={handleSubmit} className="space-y-6">
			<input type="hidden" name="categoryId" value={category.id} />

			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="title">Category Title</Label>
					<Input
						id="title"
						name="title"
						placeholder="Enter category title"
						required
						defaultValue={category.title}
						disabled={isPending}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						name="description"
						placeholder="Enter category description"
						defaultValue={category.description}
						disabled={isPending}
					/>
				</div>
			</div>

			<Separator />

			<div className="space-y-4">
				<div className="space-y-2">
					<Label>Media</Label>
					<MediaSelector
						onMediaChangeAction={setSelectedMedia}
						selectedMedia={selectedMedia}
						media={media}
					/>
				</div>

				<div className="space-y-2">
					<Label>Activities</Label>
					<ActivitySelector
						activities={activities}
						selectedActivityIds={selectedActivityIds}
						onActivityChangeAction={setSelectedActivityIds}
						currentCategoryId={category.id}
					/>
				</div>
			</div>

			{state && !state.success && (
				<div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
					{state.message}
				</div>
			)}

			{state?.success && (
				<div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
					{state.message}
				</div>
			)}

			<div className="flex justify-end space-x-2 pt-4">
				<Button
					className="hover:cursor-pointer flex-row gap-2"
					type="submit"
					disabled={isPending}
				>
					{isPending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Updating...
						</>
					) : (
						<>
							<Pencil className="h-4 w-4" />
							Update Category
						</>
					)}
				</Button>
			</div>
		</form>
	);
}
