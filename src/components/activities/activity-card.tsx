"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { getCategoriesWithMediaAndActivities } from "@/db/queries";
import { deleteActivityAction } from "@/lib/actions";
import { Info, Loader2, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

type ActivityCardProps = {
	activity: Awaited<
		ReturnType<typeof getCategoriesWithMediaAndActivities>
	>[number]["activities"][number];
	onEdit?: () => void;
	onDelete?: () => void;
};

export function ActivityCard({ activity }: ActivityCardProps) {
	const [isDeleting, startDelete] = useTransition();

	return (
		<Card className="h-full transition-shadow hover:shadow-md">
			<CardHeader className="pb-3">
				<CardTitle className="text-lg">{activity.title}</CardTitle>
				<CardDescription>{activity.description}</CardDescription>
			</CardHeader>
			<CardContent className="flex h-full items-end">
				<div className="flex items-center justify-between w-full">
					<Badge variant="outline" className="text-xs font-bold">
						{activity.activitiesMedia.length} media
					</Badge>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							className="hover:cursor-pointer bg-yellow-300"
						>
							<Pencil className="w-4 h-4" />
						</Button>
						<Button
							className="hover:cursor-pointer"
							variant="destructive"
							size="sm"
							disabled={isDeleting}
							onClick={() => {
								startDelete(() => deleteActivityAction(activity.id));
							}}
						>
							{isDeleting ? (
								<Loader2 className="animate-spin" />
							) : (
								<Trash className="h-4 w-4" />
							)}
						</Button>
						<Link href={`/activities/${activity.id}`}>
							<Button
								variant="default"
								size="sm"
								className="hover:cursor-pointer bg-blue-500 flex gap-2"
							>
								<Info className="w-4 h-4" />
								Details
							</Button>
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
