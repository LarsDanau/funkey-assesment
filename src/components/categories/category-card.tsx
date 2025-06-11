"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { ActivityCard } from "@/components/activities/activity-card";
import { Button } from "@/components/ui/button";
import type { getCategoriesWithMediaAndActivities } from "@/db/queries";
import { Info, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteCategoryButton } from "./delete-category-button";

interface CategoryCardProps {
	category: Awaited<
		ReturnType<typeof getCategoriesWithMediaAndActivities>
	>[number];
}

export function CategoryCard({ category }: CategoryCardProps) {
	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="self-start">
						<CardTitle>{category.title}</CardTitle>
						<CardDescription>{category.description}</CardDescription>
					</div>

					<div className="flex flex-col gap-2">
						<Link href={`/categories/${category.id}`}>
							<Button className="bg-blue-500 hover:cursor-pointer w-full">
								<Info className="h-4 w-4" />
								View Category
							</Button>
						</Link>
						<Link href={`/categories/${category.id}/edit`}>
							<Button variant="outline" className="hover:cursor-pointer w-full">
								<Pencil className="h-4 w-4" />
								Edit Category
							</Button>
						</Link>
						<DeleteCategoryButton categoryId={category.id} />
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<h4 className="text-md font-medium mb-3 flex items-center justify-between">
					Activities
					<Badge variant={"secondary"}>{category.activities.length}</Badge>
				</h4>
				{category.activities.length > 0 ? (
					<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
						{category.activities.map((activity) => (
							<ActivityCard key={activity.id} activity={activity} />
						))}
					</div>
				) : (
					<p>No activities found</p>
				)}
			</CardContent>
		</Card>
	);
}
