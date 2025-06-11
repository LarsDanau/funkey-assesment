import { AddCategoryForm } from "@/components/forms/add-category-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getMedia } from "@/db/queries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateCategoryPage() {
	const media = await getMedia();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<Link href="/" className="hover:cursor-pointer">
					<Button
						variant="ghost"
						size="sm"
						className="mb-4 hover:cursor-pointer"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Categories
					</Button>
				</Link>

				<h1 className="text-3xl font-bold">Create New Category</h1>
				<p className="text-muted-foreground mt-1">
					Add a new category to organize your activities.
				</p>
			</div>

			<Card className="max-w-2xl">
				<CardHeader>
					<CardTitle>Category Details</CardTitle>
					<CardDescription>
						Fill in the information below to create your new category.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<AddCategoryForm media={media} />
				</CardContent>
			</Card>
		</div>
	);
}
