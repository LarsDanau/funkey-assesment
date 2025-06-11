"use server";
import { EditCategoryForm } from "@/components/forms/edit-category-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	getAllActivities,
	getCategoryWithMediaAndActivities,
	getMedia,
} from "@/db/queries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({
	params,
}: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	const media = await getMedia();
	const category = await getCategoryWithMediaAndActivities(id);
	const activities = await getAllActivities();

	if (!category) {
		return notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<Link href={`/categories/${id}`} className="hover:cursor-pointer">
					<Button
						variant="ghost"
						size="sm"
						className="mb-4 hover:cursor-pointer"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to category
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
					<EditCategoryForm
						media={media}
						category={category}
						activities={activities}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
