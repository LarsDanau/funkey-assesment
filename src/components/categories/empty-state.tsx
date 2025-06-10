"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function EmptyCategoryList() {
	const router = useRouter();

	const handleAddCategory = () => {
		router.push("categories/create");
	};

	return (
		<div>
			<h3 className="text-center py-12">No categories found</h3>
			<Button onClick={handleAddCategory}>
				<Plus className="h-4 w-4 mr-2" />
				Add Category
			</Button>
		</div>
	);
}
