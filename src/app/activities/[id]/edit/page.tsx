"use server";
import { EditActivityForm } from "@/components/forms/edit-activity-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getActivityWithMedia, getMedia } from "@/db/queries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({
	params,
}: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	const media = await getMedia();
	const activity = await getActivityWithMedia(id);

	if (!activity) {
		return notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<Link href={`/activities/${id}`} className="hover:cursor-pointer">
					<Button
						variant="ghost"
						size="sm"
						className="mb-4 hover:cursor-pointer"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to activity
					</Button>
				</Link>

				<h1 className="text-3xl font-bold">Edit activity</h1>
				<p className="text-muted-foreground mt-1">
					Edit the activity details below.
				</p>
			</div>

			<Card className="max-w-2xl">
				<CardHeader>
					<CardTitle>Activity Details</CardTitle>
					<CardDescription>
						Fill in the information below to edit the activity.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<EditActivityForm media={media} activity={activity} />
				</CardContent>
			</Card>
		</div>
	);
}
