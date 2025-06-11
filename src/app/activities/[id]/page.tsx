"use server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActivityById } from "@/db/queries";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ActivityPage({
	params,
}: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	const activity = await getActivityById(id);

	if (!activity) {
		return notFound();
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				<div className="mb-6">
					<Link href={`/categories/${activity.category_id}`}>
						<Button
							variant="ghost"
							size="sm"
							className="mb-4 hover:cursor-pointer"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to {activity.category?.title}
						</Button>
					</Link>

					<div className="flex items-center justify-between">
						<div>
							<div className="flex items-center gap-2 mb-2">
								<Badge variant="secondary">{activity.category?.title}</Badge>
							</div>
							<h1 className="text-3xl font-bold tracking-tight">
								{activity.title}
							</h1>
							<p className="text-muted-foreground mt-1">
								{activity.description}
							</p>
						</div>
						<div className="flex gap-2">
							{/* <EditActivityDialog activityId={activity.id} /> */}
						</div>
					</div>
				</div>
				{activity.activitiesMedia.length > 0 && (
					<Card className="mb-6">
						<CardHeader>
							<CardTitle className="text-lg">Media</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-3 gap-2">
								{activity.activitiesMedia
									.filter(
										(
											actMedia,
										): actMedia is typeof actMedia & {
											media: { link: string };
										} =>
											actMedia.media !== null && actMedia.media.link !== null,
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
			</div>
		</div>
	);
}
