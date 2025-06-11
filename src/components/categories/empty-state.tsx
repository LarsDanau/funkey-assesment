import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function EmptyCategoryList() {
	return (
		<div>
			<h3 className="text-center py-12">No categories found</h3>
			<Link href="categories/create">
				<Button>
					<Plus className="h-4 w-4 mr-2" />
					Add Category
				</Button>
			</Link>
		</div>
	);
}
