export default async function CategoryPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return (
		<div>
			<h1>Category {id}</h1>
		</div>
	);
}
