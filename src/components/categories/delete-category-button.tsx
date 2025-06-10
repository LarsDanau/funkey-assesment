"use client";

import { Button } from "@/components/ui/button";
import type { SelectCategory } from "@/db/schema";
import { deleteCategoryAction } from "@/lib/actions";
import { Trash } from "lucide-react";
import { useTransition } from "react";

export function DeleteCategoryButton({
	categoryId,
}: { categoryId: SelectCategory["id"] }) {
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			variant="destructive"
			className="flex gap-2 hover:cursor-pointer"
			disabled={isPending}
			onClick={() => {
				startTransition(() => deleteCategoryAction(categoryId));
			}}
		>
			<Trash className="w-4 h-4" />
			{isPending ? "Deleting..." : "Delete Category"}
		</Button>
	);
}
