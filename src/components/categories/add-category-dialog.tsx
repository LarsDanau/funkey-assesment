"use client";

import { AddCategoryForm } from "@/components/forms/add-category-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddCategoryDialog() {
	const [open, setOpen] = useState(false);

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="flex items-center gap-2 hover:cursor-pointer">
					<Plus className="h-4 w-4" />
					New Category
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Category</DialogTitle>
					<DialogDescription>
						Create a new category to organize your activities.
					</DialogDescription>
				</DialogHeader>
				<AddCategoryForm onCancel={handleCancel} />
			</DialogContent>
		</Dialog>
	);
}
