"use client";
import { AddActivityDialog } from "@/components/activities/add-activity-dialog";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { ActivityCard } from "@/components/activities/activity-card";
import { DeleteCategoryButton } from "@/components/categories/delete-category-button";
import { EditCategoryDialog } from "@/components/categories/edit-category-dialog";
import { ViewCategoryButton } from "@/components/categories/view-category-button";
import type { getCategoriesWithMediaAndActivities } from "@/db/queries";

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
					<div>
						<CardTitle>{category.title}</CardTitle>
						<CardDescription>{category.description}</CardDescription>
					</div>

					<div className="flex flex-col gap-2">
						<AddActivityDialog categoryId={category.id} />
						<DeleteCategoryButton categoryId={category.id} />
						<EditCategoryDialog categoryId={category.id} />
						<ViewCategoryButton categoryId={category.id} />
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
