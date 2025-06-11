import { DeleteActivityButton } from "@/components/activities/delete-activity-button";
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
import { Info, Pencil } from "lucide-react";
import Link from "next/link";

type ActivityCardProps = {
	activity: Awaited<
		ReturnType<typeof getCategoriesWithMediaAndActivities>
	>[number]["activities"][number];
	onEdit?: () => void;
	onDelete?: () => void;
};

export function ActivityCard({ activity }: ActivityCardProps) {
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
						<Link href={`/activities/${activity.id}/edit`}>
							<Button
								variant="outline"
								size="sm"
								className="hover:cursor-pointer bg-yellow-300"
							>
								<Pencil className="w-4 h-4" />
							</Button>
						</Link>
						<DeleteActivityButton activityId={activity.id} />
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
