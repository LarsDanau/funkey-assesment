"use client";

import { AddActivityForm } from "@/components/forms/add-activity-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { InsertCategory } from "@/db/schema";
import { Plus } from "lucide-react";
import { useState } from "react";
export function AddActivityDialog({
	categoryId,
}: { categoryId: NonNullable<InsertCategory["id"]> }) {
	const [open, setOpen] = useState<boolean>(false);

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm" className="hover:cursor-pointer">
					<Plus className="h-4 w-4 mr-1" />
					Add Activity
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Activity</DialogTitle>
					<DialogDescription>
						Create a new activity for this category.
					</DialogDescription>
				</DialogHeader>
				<AddActivityForm categoryId={categoryId} onCancel={handleCancel} />
			</DialogContent>
		</Dialog>
	);
}
