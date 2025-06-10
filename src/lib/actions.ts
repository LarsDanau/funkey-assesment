"use server";

import { deleteCategory, insertActivity, insertCategory } from "@/db/queries";
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
});

export async function createActivity(
	prevState: ActionState | null,
	formData: FormData,
) {
	const dataToValidate = Object.fromEntries(formData);
	const parsed = createActivitySchema.safeParse(dataToValidate);

	if (!parsed.success) {
		return {
			success: false,
			message: parsed.error.message,
		};
	}

	const { title, description, categoryId } = parsed.data;

	await insertActivity({ category_id: categoryId, title, description });

	revalidatePath("/");
	redirect("/");

	return {
		success: true,
		message: "Activity created successfully",
	};
}

const createCategorySchema = z.object({
	title: z.string().min(1),
	description: z.string(),
});

export async function createCategory(
	prevState: ActionState | null,
	formData: FormData,
) {
	const dataToValidate = Object.fromEntries(formData);
	const parsed = createCategorySchema.safeParse(dataToValidate);

	if (!parsed.success) {
		return {
			success: false,
			message: parsed.error.message,
		};
	}

	const { title, description } = parsed.data;

	await insertCategory({ title, description });

	revalidatePath("/");
	redirect("/");

	return {
		success: true,
		message: "Category created successfully",
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
