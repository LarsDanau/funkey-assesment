"use server";

import {
	deleteCategory,
	insertActivity,
	insertActivityMedias,
	insertCategory,
	insertCategoryMedias,
	updateActivityWithMedia,
	updateCategoryWithMediaAndActivities,
} from "@/db/queries";
import { deleteActivity } from "@/db/queries";
import type { SelectActivity, SelectCategory } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod/v4";

type ActionState = {
	success: boolean;
	message: string;
};

const createActivitySchema = z.object({
	title: z.string().min(1),
	description: z.string(),
	categoryId: z.coerce.number(),
	mediaIds: z.string(),
});

export async function createActivity(
	_prevState: ActionState | null,
	formData: FormData,
) {
	const dataToValidate = Object.fromEntries(formData);
	const parsed = createActivitySchema.safeParse(dataToValidate);
	const mediaIdsString = formData.get("mediaIds") as string;

	const mediaIds = mediaIdsString
		? (JSON.parse(mediaIdsString) as number[])
		: [];

	if (!parsed.success) {
		return {
			success: false,
			message: parsed.error.message,
		};
	}

	const { title, description, categoryId } = parsed.data;

	const activity = await insertActivity({
		category_id: categoryId,
		title,
		description,
	});
	await insertActivityMedias(
		mediaIds.map((id) => ({ activity_id: activity[0]?.id, media_id: id })),
	);

	revalidatePath(`/categories/${categoryId}`);
	redirect(`/categories/${categoryId}`);

	return {
		success: true,
		message: "Activity created successfully",
	};
}

const createCategorySchema = z.object({
	title: z.string().min(1),
	description: z.string(),
	mediaIds: z.string(),
});

export async function createCategory(
	_prevState: ActionState | null,
	formData: FormData,
) {
	const dataToValidate = Object.fromEntries(formData);
	const parsed = createCategorySchema.safeParse(dataToValidate);
	const mediaIdsString = formData.get("mediaIds") as string;

	const mediaIds = mediaIdsString
		? (JSON.parse(mediaIdsString) as number[])
		: [];

	if (!parsed.success) {
		return {
			success: false,
			message: parsed.error.message,
		};
	}

	const { title, description } = parsed.data;

	const category = await insertCategory({ title, description });
	await insertCategoryMedias(
		mediaIds.map((id) => ({ category_id: category[0]?.id, media_id: id })),
	);

	revalidatePath("/");
	redirect("/");

	return {
		success: true,
		message: "Category created successfully",
	};
}

const editCategorySchema = z.object({
	categoryId: z.coerce.number(),
	title: z.string().min(1),
	description: z.string(),
	mediaIds: z.string(),
	activityIds: z.string().optional(),
});

export async function updateCategory(
	_prevState: ActionState | null,
	formData: FormData,
) {
	const dataToValidate = Object.fromEntries(formData);
	const parsed = editCategorySchema.safeParse(dataToValidate);
	const mediaIdsString = formData.get("mediaIds") as string;
	const activityIdsString = formData.get("activityIds") as string;

	const mediaIds = mediaIdsString
		? (JSON.parse(mediaIdsString) as number[])
		: [];

	const activityIds = activityIdsString
		? (JSON.parse(activityIdsString) as number[])
		: [];

	if (!parsed.success) {
		return {
			success: false,
			message: parsed.error.message,
		};
	}

	const { title, description } = parsed.data;

	await updateCategoryWithMediaAndActivities(
		parsed.data.categoryId,
		{ title, description },
		mediaIds.map((id) => ({
			category_id: parsed.data.categoryId,
			media_id: id,
		})),
		activityIds,
	);

	revalidatePath(`/categories/${parsed.data.categoryId}`);
	redirect(`/categories/${parsed.data.categoryId}`);

	return {
		success: true,
		message: "Category updated successfully",
	};
}

const editActivitySchema = z.object({
	categoryId: z.coerce.number(),
	activityId: z.coerce.number(),
	title: z.string().min(1),
	description: z.string(),
	mediaIds: z.string(),
});

export async function updateActivity(
	_prevState: ActionState | null,
	formData: FormData,
) {
	const dataToValidate = Object.fromEntries(formData);
	const parsed = editActivitySchema.safeParse(dataToValidate);
	const mediaIdsString = formData.get("mediaIds") as string;

	const mediaIds = mediaIdsString
		? (JSON.parse(mediaIdsString) as number[])
		: [];

	if (!parsed.success) {
		return {
			success: false,
			message: parsed.error.message,
		};
	}

	const { title, description } = parsed.data;

	await updateActivityWithMedia(
		parsed.data.activityId,
		{ title, description },
		mediaIds.map((id) => ({
			activity_id: parsed.data.activityId,
			media_id: id,
		})),
	);

	revalidatePath(`/categories/${parsed.data.categoryId}`);
	redirect(`/categories/${parsed.data.categoryId}`);

	return {
		success: true,
		message: "Activity updated successfully",
	};
}

export async function deleteActivityAction(activityId: SelectActivity["id"]) {
	await deleteActivity(activityId);
	revalidatePath("/");
}

export async function deleteCategoryAction(categoryId: SelectCategory["id"]) {
	await deleteCategory(categoryId);
	revalidatePath("/");
}
