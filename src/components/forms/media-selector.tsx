"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { SelectMedia } from "@/db/schema";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type MediaSelectorProps = {
	media: SelectMedia[];
	selectedMedia: number[];
	onMediaChangeAction: (media: number[]) => void;
};
export function MediaSelector({
	media,
	selectedMedia,
	onMediaChangeAction,
}: MediaSelectorProps) {
	const [showSelector, setShowSelector] = useState(false);

	const handleMediaToggle = (mediaId: number, checked: boolean) => {
		if (checked) {
			onMediaChangeAction([...selectedMedia, mediaId]);
		} else {
			onMediaChangeAction(selectedMedia.filter((id) => id !== mediaId));
		}
	};

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
					<Plus className="h-4 w-4 mr-2" />
					{selectedMedia.length > 0
						? `${selectedMedia.length} media selected`
						: "Select media"}
				</Button>

				{showSelector && (
					<Card>
						<CardContent className="p-4">
							<div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
								{media.map((media) => (
									<div key={media.id} className="flex items-center space-x-2">
										<Checkbox
											id={`media-${media.id}`}
											checked={selectedMedia.includes(media.id)}
											onCheckedChange={(checked) =>
												handleMediaToggle(media.id, checked as boolean)
											}
										/>
										<div className="relative flex-1">
											<Image
												src={media.link}
												alt={"Media alt here"}
												width={60}
												height={100}
												className="w-full h-32 object-cover rounded"
											/>
										</div>
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
