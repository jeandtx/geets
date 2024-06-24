"use client";
import { Row } from "@tanstack/react-table";
import { Interaction, Project } from "@/types/tables";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { updateInteraction } from "@/lib/data/interactions";
import { getProject, updateProject } from "@/lib/data/project";

interface HandleInvitationProps {
	row: Row<Interaction>;
}

export default function HandleInvitation({
	row,
}: Readonly<HandleInvitationProps>) {
	const [answered, setAnswered] = useState(row.original.read);
	const [status, setStatus] = useState(row.original.join?.status);
	const handleRefuseInvitation = (interaction: Interaction) => async () => {
		setAnswered(true);
		setStatus("rejected");
		await updateInteraction({
			...interaction,
			join: {
				...interaction.join,
				status: "rejected",
			},
			read: true,
		} as Interaction);
	};

	const handleAcceptInvitation = (interaction: Interaction) => async () => {
		setAnswered(true);
		setStatus("accepted");
		console.log(interaction);
		await updateInteraction({
			...interaction,
			join: {
				...interaction.join,
				status: "accepted",
			},
			read: true,
		} as Interaction);
		const project = await getProject(interaction.join?.projectId ?? "none");
		await updateProject({
			_id: project._id,
			participants: [
				...(project.participants ?? []),
				{
					name: interaction.userId,
					role: "participant",
				},
			],
		} as Project);
	};

	return (
		<div className="flex justify-between items-center text-sm text-gray-600">
			<div>
				<b>{row.original.userId}</b> has requested to join your project{" "}
				<b>{row.original.join?.projectName}</b>
			</div>
			<div className="flex items-center space-x-2">
				{answered ? (
					<Badge
						variant={
							status === "accepted" ? "success" : "destructive"
						}
					>
						{status === "accepted" ? "Accepted" : "Declined"}
					</Badge>
				) : (
					<div className="flex flex-col">
						<Button
							variant="outline"
							onClick={handleAcceptInvitation(row.original)}
						>
							Accept
						</Button>
						<Button
							variant="destructive"
							onClick={handleRefuseInvitation(row.original)}
						>
							Decline
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
