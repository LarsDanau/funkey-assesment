"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { getCategoryWithMediaAndActivities } from "@/db/queries";
import { Activity } from "lucide-react";
import { useState } from "react";

type ActivitySelectorProps = {
	activities: NonNullable<
		Awaited<ReturnType<typeof getCategoryWithMediaAndActivities>>
	>["activities"];
	selectedActivityIds: number[];
	onActivityChangeAction: (activityIds: number[]) => void;
	currentCategoryId: number;
};

export function ActivitySelector({
	activities,
	selectedActivityIds,
	onActivityChangeAction,
}: ActivitySelectorProps) {
	const [showSelector, setShowSelector] = useState(false);

	const handleActivityToggle = (activityId: number, checked: boolean) => {
		if (checked) {
			onActivityChangeAction([...selectedActivityIds, activityId]);
		} else {
			onActivityChangeAction(
				selectedActivityIds.filter((id) => id !== activityId),
			);
		}
	};

	const selectedCount = selectedActivityIds.length;

	return (
		<div className="space-y-2">
			<div className="space-y-2">
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => setShowSelector(!showSelector)}
					className="w-full"
				>
					<Activity className="h-4 w-4 mr-2" />
					{selectedCount > 0
						? `${selectedCount} ${selectedCount === 1 ? "activity" : "activities"} selected`
						: "Select activities"}
				</Button>

				{showSelector && (
					<Card>
						<CardHeader>
							<CardTitle className="text-sm">Link Activities</CardTitle>
							<CardDescription className="text-xs">
								Select activities to link to this category. Activities already
								linked to other categories are not shown.
							</CardDescription>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<div className="space-y-3 max-h-64 overflow-y-auto">
								{activities.length === 0 ? (
									<p className="text-sm text-muted-foreground text-center py-4">
										No available activities to link
									</p>
								) : (
									activities.map((activity) => (
										<div
											key={activity.id}
											className="flex items-start space-x-3 p-2 border rounded-lg"
										>
											<Checkbox
												id={`activity-${activity.id}`}
												checked={selectedActivityIds.includes(activity.id)}
												onCheckedChange={(checked) =>
													handleActivityToggle(activity.id, checked as boolean)
												}
												className="mt-1"
											/>
											<div className="flex-1 min-w-0">
												<div className="flex items-center justify-between">
													<h4 className="text-sm font-medium truncate">
														{activity.title}
													</h4>
												</div>
												<p className="text-xs text-muted-foreground mt-1 line-clamp-2">
													{activity.description}
												</p>
											</div>
										</div>
									))
								)}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
