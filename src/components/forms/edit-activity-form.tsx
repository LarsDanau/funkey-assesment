"use client";

import { MediaSelector } from "@/components/forms/media-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { getActivityWithMedia } from "@/db/queries";
import type { SelectMedia } from "@/db/schema";
import { updateActivity } from "@/lib/actions";
import { Pencil } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useActionState, useState } from "react";

type EditActivityForm = {
	media: SelectMedia[];
	activity: NonNullable<Awaited<ReturnType<typeof getActivityWithMedia>>>;
};

export function EditActivityForm({ media, activity }: EditActivityForm) {
	const [state, formAction, isPending] = useActionState(updateActivity, null);
	const [selectedMedia, setSelectedMedia] = useState<number[]>(
		activity?.activitiesMedia
			.map((media) => media.media_id)
			.filter((media) => media !== null) ?? [],
	);

	const handleSubmit = (formData: FormData) => {
		formData.append("mediaIds", JSON.stringify(selectedMedia));
		formAction(formData);
	};

	return (
		<form action={handleSubmit} className="space-y-4">
			<input type="hidden" name="activityId" value={activity.id} />
			<input
				type="hidden"
				name="categoryId"
				value={activity.category_id ?? ""}
			/>

			<div className="space-y-2">
				<Label htmlFor="title">Activity Title</Label>
				<Input
					id="title"
					name="title"
					placeholder="Enter activity title"
					required
					defaultValue={activity.title}
					disabled={isPending}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Textarea
					id="description"
					name="description"
					placeholder="Enter activity description"
					defaultValue={activity.description}
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
							Updating...
						</>
					) : (
						<>
							<Pencil className="h-4 w-4" />
							Edit Activity
						</>
					)}
				</Button>
			</div>
		</form>
	);
}
