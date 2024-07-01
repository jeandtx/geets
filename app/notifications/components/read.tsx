"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareDot, MessageSquareOff } from "lucide-react";
import { updateInteraction } from "@/lib/data/interactions";
import { Row } from "@tanstack/react-table";
import { Interaction } from "@/types/tables";
import { useState } from "react";

interface ReadProps {
	row: Row<Interaction>;
}

export default function Read({ row }: Readonly<ReadProps>) {
	const [read, setRead] = useState(row.original.read);

	return (
		<div className="w-[80px] text-sm text-muted-foreground overflow-hidden">
			<Button
				variant={"ghost"}
				onClick={() => {
					updateInteraction({
						...row.original,
						read: !row.original.read,
					});
					row.original.read = !row.original.read;
					setRead(!read);
				}}
			>
				{read ? (
					<Badge
						variant="info"
						className="items-center space-x-1 px-2 py-1 rounded-full text-xs bg-muted-background text-muted-foreground"
					>
						<MessageSquareOff className="h-4 w-4 text-muted-foreground" />
					</Badge>
				) : (
					<Badge
						variant="info"
						className="items-center space-x-1 px-2 py-1 rounded-full text-xs"
					>
						<MessageSquareDot className="h-4 w-4 text-muted-foreground" />
					</Badge>
				)}
			</Button>
		</div>
	);
}
