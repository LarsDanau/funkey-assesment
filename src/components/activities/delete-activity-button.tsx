"use client";

import type { SelectActivity } from "@/db/schema";
import { deleteActivityAction } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../ui/button";

export function DeleteActivityButton({
	activityId,
}: { activityId: SelectActivity["id"] }) {
	const [isDeleting, startDelete] = useTransition();

	return (
		<Button
			className="hover:cursor-pointer"
			variant="destructive"
			size="sm"
			disabled={isDeleting}
			onClick={() => {
				startDelete(() => deleteActivityAction(activityId));
			}}
		>
			{isDeleting ? (
				<Loader2 className="animate-spin" />
			) : (
				<Trash className="h-4 w-4" />
			)}
		</Button>
	);
}
