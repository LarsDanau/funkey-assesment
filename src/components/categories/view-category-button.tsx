"use client";
import type { SelectCategory } from "@/db/schema";
import { Info } from "lucide-react";
import Link from "next/link";

export function ViewCategoryButton({
	categoryId,
}: { categoryId: SelectCategory["id"] }) {
	return (
		<Link
			href={`/categories/${categoryId}`}
			className="flex items-center gap-2 hover:cursor-pointer bg-blue-500 text-white py-2 px-3 rounded-md"
		>
			<Info className="h-4 w-4" />
			View Category
		</Link>
	);
}
