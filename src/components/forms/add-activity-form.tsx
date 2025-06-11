"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { SelectCategory, SelectMedia } from "@/db/schema";
import { createActivity } from "@/lib/actions";
import { Plus } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useActionState, useState } from "react";
import { MediaSelector } from "./media-selector";
type AddActivityFormProps = {
	categories: SelectCategory[];
	media: SelectMedia[];
};

export function AddActivityForm({ categories, media }: AddActivityFormProps) {
	const [categoryId, setCategoryId] = useState<string | null>(null);
	const [state, formAction, isPending] = useActionState(createActivity, null);
	const [selectedMedia, setSelectedMedia] = useState<number[]>([]);

	const handleSubmit = (formData: FormData) => {
		formData.append("mediaIds", JSON.stringify(selectedMedia));
		formData.append("categoryId", categoryId ?? "");
		formAction(formData);
	};

	return (
		<form action={handleSubmit} className="space-y-4">
			<Select onValueChange={setCategoryId}>
				<SelectTrigger>
					<SelectValue placeholder="Select a category" />
				</SelectTrigger>
				<SelectContent>
					{categories.map((category) => (
						<SelectItem key={category.id} value={category.id.toString()}>
							{category.title}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
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
					placeholder="Enter activity description"
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
