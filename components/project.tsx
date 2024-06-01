"use client";
import type { Project } from "@/types/tables";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { deleteProject } from "@/lib/data/project";

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	project: Project;
}

export function ProjectCard({
	className,
	project,
}: Readonly<ProjectCardProps>) {
	const { toast } = useToast();
	const handleDelete = async (projectId: string) => {
		deleteProject(projectId);
		toast({
			title: "Success!",
			description: "Your project has been deleted.",
		});
	};
	const author = project.participants?.find((p) => p.role === "author");
	return (
		<div
			className={cn(
				"flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white",
				className
			)}
		>
			<div className="wrapper py-7 w-full">
				<div className="header px-10 mb-4  flex flex-row justify-between">
					<div>
						<Link href={`/${author}/${project._id}`}>
							<p className="text-lg text-gray-900 font-bold">
								{project.title}
							</p>
						</Link>
						<p className="text-sm text-gray-600">
							{project.description}
						</p>
					</div>
					<Button
						variant={"destructive"}
						onClick={() => {
							handleDelete(project._id);
						}}
					>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
}
