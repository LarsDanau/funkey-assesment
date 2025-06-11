"use server";
import { getCategoriesWithMediaAndActivities } from "@/db/queries";
import { CategoryCard } from "./category-card";
import { EmptyCategoryList } from "./empty-state";

export async function CategoriesList() {
	const data = await getCategoriesWithMediaAndActivities();

	if (data.length === 0) {
		return <EmptyCategoryList />;
	}
	return (
		<div className="space-y-8">
			{data.map((category) => (
				<CategoryCard key={category.id} category={category} />
			))}
		</div>
	);
}
