"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Post, Project, Participant } from "@/types/tables";
import Img from "next/image";
import { updateParticipants } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/ui/profilcard";

interface ProjectDetailsProps {
	project: Project;
	posts: Post[];
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, posts }) => {
	const [participants, setParticipants] = useState<Participant[]>(
		project.participants || []
	);
	const { data: session } = useSession();
	const { toast } = useToast();

	const handleAddParticipant = async (newParticipantEmail: string) => {
		if (participants.some(p => p.name === newParticipantEmail)) {
			toast({
				title: "Already a participant",
				description: `You are already a participant in this project.`,
				variant: "destructive",
			});
			return;
		}

		const newParticipant: Participant = { name: newParticipantEmail, role: "participant" };
		const result = await updateParticipants(
			project._id.toString(),
			newParticipant
		);
		if (result) {
			setParticipants([...participants, newParticipant]);
			toast({
				title: "Joined successfully",
				description: `You have successfully joined the project.`,
				variant: "default",
			});
		} else {
			toast({
				variant: "destructive",
				title: "Failed to update participants",
				description: "Something went wrong. Please try again.",
			});
			console.error("Failed to update participants.");
		}
		console.log("project media is", project.media);
	};

	return (
		<div className="">
			<div>
				<div className="p-5">
					<div className="flex flex-col">
						<div className="flex flex-row gap-2 justify-between items-center">
							<div className="flex flex-row gap-2 items-center">
								<Img
									src={
										project.media ??
										"https://res.cloudinary.com/dekbkndn8/image/upload/v1715719366/samples/balloons.jpg"
									}
									alt={project.title}
									width={64}
									height={64}
									className="w-16 h-16 object-cover rounded-lg"
								/>
								<div className="flex flex-col">
									<div className="text-3xl font-medium text-black">
										{project.title}
									</div>
									{participants.find(p => p.role === 'author') && (
										<div className="text-s text-gray-500">
											{participants.find(p => p.role === 'author')?.name}
										</div>
									)}
								</div>
							</div>
							{session?.user?.email && (
								<div className="ml-auto">
									<Button
										onClick={() =>
											handleAddParticipant(
												session?.user?.email ?? ""
											)
										}
										className="text-lg font-normal text-white p-2 rounded"
									>
										Rejoindre le projet !
									</Button>
								</div>
							)}
						</div>
						<div className="flex flex-col pt-5">
							<div className="text-xl font-medium text-black">
								Description
							</div>
							<div className="text-s text-zinc-600">
								{project.description}
							</div>
						</div>
						<div className="flex flex-col pt-5">
							<div className="text-xl font-medium text-black">
								Participants
							</div>
							<div className="flex flex-wrap gap-4">
								{participants.map(participant => (
									<ProfileCard
										key={participant.name}
										email={participant.name}
										role={participant.role}
									/>
								))}
							</div>
						</div>
						<div className="flex flex-col pt-5">
							<div className="text-xl font-medium text-black">
								Themes
							</div>
							<div className="text-s text-zinc-600">
								{project.themes?.join(", ")}
							</div>
						</div>
						<div className="flex flex-col pt-5">
							<div className="text-xl font-medium text-black">
								Posts
							</div>
							<div className="flex flex-wrap m-0 p-0 list-none">
								{posts.length > 0 ? (
									posts.map((post) => (
										<div
											key={post._id}
											className="w-[300px] bg-black-400 rounded-lg shadow-md m-2 p-2 text-center"
										>
											<div>Content: {post.content}</div>
											<div>
												Time:{" "}
												{post.time.toLocaleString()}
											</div>
											<div>
												Author: {post.author?.email}
											</div>
											{post.media && (
												<div>
													Media:{" "}
													<Img
														src={post.media}
														alt="post media"
														width={200}
														height={200}
													/>
												</div>
											)}
										</div>
									))
								) : (
									<div>No posts found for this project.</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetails;
