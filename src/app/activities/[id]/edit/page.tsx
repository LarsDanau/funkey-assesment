"use server";

export default async function EditActivityPage({
	params,
}: { params: Promise<{ id: number }> }) {
	const { id } = await params;
}
