import { CategoriesList } from "@/components/categories/categories-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-end">
				<div>
					<h1 className="text-4xl font-bold">Funkey Assesment</h1>
					<h2 className="text-3xl font-semibold mb-4">
						Categories & Activities
					</h2>
				</div>
				<Link href="/categories/create">
					<Button className="flex items-center gap-2 hover:cursor-pointer">
						<Plus className="h-4 w-4" />
						New Category
					</Button>
				</Link>
			</div>
			<Separator className="my-4" />
			<Suspense fallback={<div>Loading...</div>}>
				<CategoriesList />
			</Suspense>
		</div>
	);
}
