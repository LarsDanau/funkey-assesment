import { db } from "@/db/index";
import {
	type InsertActivity,
	type InsertCategory,
	type SelectActivity,
	type SelectCategory,
	activities,
	categories,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function insertActivity(activity: InsertActivity) {
	return db.insert(activities).values(activity);
}

export async function insertCategory(category: InsertCategory) {
	return db.insert(categories).values(category);
}

export async function deleteActivity(activityId: SelectActivity["id"]) {
	return db.delete(activities).where(eq(activities.id, activityId));
}

export async function deleteCategory(categoryId: SelectCategory["id"]) {
	return db.delete(categories).where(eq(categories.id, categoryId));
}

export async function getCategoriesWithMediaAndActivities() {
	return await db.query.categories.findMany({
		with: {
			categoriesMedia: {
				with: {
					media: true,
				},
			},
			activities: {
				with: {
					activitiesMedia: {
						with: {
							media: true,
						},
					},
				},
			},
		},
	});
}
