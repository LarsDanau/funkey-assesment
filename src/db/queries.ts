import { db } from "@/db/index";
import {
	type InsertActivitiesMedia,
	type InsertActivity,
	type InsertCategoriesMedia,
	type InsertCategory,
	type SelectActivity,
	type SelectCategory,
	activities,
	activitiesMedia,
	categories,
	categoriesMedia,
	media,
} from "@/db/schema";

import { eq } from "drizzle-orm";

export async function insertActivity(activity: InsertActivity) {
	return db.insert(activities).values(activity).returning();
}

export async function insertCategory(category: InsertCategory) {
	return db.insert(categories).values(category).returning();
}

export async function insertCategoryMedias(
	categoryMedias: InsertCategoriesMedia[],
) {
	return db.insert(categoriesMedia).values(categoryMedias);
}

export async function insertActivityMedias(
	activityMedias: InsertActivitiesMedia[],
) {
	return db.insert(activitiesMedia).values(activityMedias);
}

export async function deleteActivity(activityId: SelectActivity["id"]) {
	return db.delete(activities).where(eq(activities.id, activityId));
}

export async function deleteCategory(categoryId: SelectCategory["id"]) {
	return db.delete(categories).where(eq(categories.id, categoryId));
}

export async function getCategories() {
	return await db.query.categories.findMany();
}

export async function getCategoryWithMedia(categoryId: SelectCategory["id"]) {
	return await db.query.categories.findFirst({
		where: (categories, { eq }) => eq(categories.id, categoryId),
		with: {
			categoriesMedia: { with: { media: true } },
		},
	});
}

export async function getActivityWithMedia(activityId: SelectActivity["id"]) {
	return await db.query.activities.findFirst({
		where: (activities, { eq }) => eq(activities.id, activityId),
		with: {
			activitiesMedia: { with: { media: true } },
		},
	});
}

export async function getCategoriesWithMediaAndActivities() {
	return await db.query.categories.findMany({
		orderBy: (categories, { desc }) => [desc(categories.created_at)],
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

export async function getCategoryById(id: SelectCategory["id"]) {
	return await db.query.categories.findFirst({
		where: (categories, { eq }) => eq(categories.id, id),
		with: {
			categoriesMedia: {
				with: {
					media: true,
				},
			},
			activities: {
				with: {
					activitiesMedia: {
						with: { media: true },
					},
				},
			},
		},
	});
}

export async function getActivityById(id: SelectActivity["id"]) {
	return await db.query.activities.findFirst({
		where: (activities, { eq }) => eq(activities.id, id),
		with: {
			category: true,
			activitiesMedia: {
				with: { media: true },
			},
		},
	});
}

export async function getMedia() {
	return await db.select().from(media);
}

export async function updateCategoryWithMedia(
	categoryId: SelectCategory["id"],
	categoryData: Partial<InsertCategory>,
	categoryMedias?: InsertCategoriesMedia[],
) {
	return await db.transaction(async (tx) => {
		const updatedCategory = await tx
			.update(categories)
			.set(categoryData)
			.where(eq(categories.id, categoryId))
			.returning();

		if (categoryMedias) {
			await tx
				.delete(categoriesMedia)
				.where(eq(categoriesMedia.category_id, categoryId));

			if (categoryMedias.length > 0) {
				await tx.insert(categoriesMedia).values(categoryMedias);
			}
		}

		return updatedCategory;
	});
}

export async function updateActivityWithMedia(
	activityId: SelectActivity["id"],
	activityData: Partial<InsertActivity>,
	activityMedias?: InsertActivitiesMedia[],
) {
	return await db.transaction(async (tx) => {
		const updatedActivity = await tx
			.update(activities)
			.set(activityData)
			.where(eq(activities.id, activityId))
			.returning();

		if (activityMedias) {
			await tx
				.delete(activitiesMedia)
				.where(eq(activitiesMedia.activity_id, activityId));

			if (activityMedias.length > 0) {
				await tx.insert(activitiesMedia).values(activityMedias);
			}
		}

		return updatedActivity;
	});
}
