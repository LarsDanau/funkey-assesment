import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { SelectCategory } from "@/db/schema";
import { Pencil } from "lucide-react";
import { useState } from "react";

export function EditCategoryDialog({
	categoryId,
}: { categoryId: SelectCategory["id"] }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="secondary"
					className="flex items-center gap-2 hover:cursor-pointer bg-yellow-300 text-black"
				>
					<Pencil className="h-4 w-4" />
					Edit Category
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Category</DialogTitle>
					<DialogDescription>
						Create a new category to organize your activities.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
