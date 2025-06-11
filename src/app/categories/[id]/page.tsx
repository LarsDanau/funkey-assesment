"use server";

import { ActivityCard } from "@/components/activities/activity-card";
import { DeleteCategoryButton } from "@/components/categories/delete-category-button";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getCategoryById } from "@/db/queries";
import { ArrowLeft, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
export default async function CategoryPage({
	params,
}: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	const category = await getCategoryById(id);

	if (!category) {
		return notFound();
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				<Link href="/">
					<Button className="flex gap-2 hover:cursor-pointer">
						<ArrowLeft className="h-4 w-4" />
						Back to home
					</Button>
				</Link>
				<div className="my-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold">{category.title}</h1>
							<p className="text-muted-foreground mt-1">
								{category.description}
							</p>
						</div>
						<div className="flex gap-2">
							<Link href={`/categories/${category.id}/edit`}>
								<Button variant="outline" className="hover:cursor-pointer">
									<Pencil className="h-4 w-4" />
									Edit Category
								</Button>
							</Link>
							<DeleteCategoryButton categoryId={category.id} />
						</div>
					</div>
				</div>
				{category.categoriesMedia.length > 0 && (
					<Card className="mb-6">
						<CardHeader>
							<CardTitle className="text-lg">Media</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-3 gap-2">
								{category.categoriesMedia
									.filter(
										(
											catMedia,
										): catMedia is typeof catMedia & {
											media: { link: string };
										} =>
											catMedia.media !== null && catMedia.media.link !== null,
									)
									.map((catMedia) => (
										<div className="relative group" key={catMedia.media_id}>
											<Image
												alt={"Image alt here"}
												src={catMedia.media.link}
												width={300}
												height={200}
												className="object-cover h-48 w-full rounded-md transition-transform group-hover:scale-105"
											/>
										</div>
									))}
							</div>
						</CardContent>
					</Card>
				)}

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-lg">Activities</CardTitle>
								<CardDescription className="text-sm text-muted-foreground">
									{category.activities.length}{" "}
									{category.activities.length === 1 ? "activity" : "activities"}
								</CardDescription>
							</div>
							<Link href={"/activities/create"}>
								<Button className="hover:cursor-pointer flex gap-2">
									<Plus className="h-4 w-4" />
									Add Activity
								</Button>
							</Link>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{category.activities.map((activity) => (
								<Link key={activity.id} href={`/activities/${activity.id}`}>
									<ActivityCard activity={activity} />
								</Link>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
