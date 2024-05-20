"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { SquareKanban } from "lucide-react";
import Link from "next/link";
import { getProjects } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Project } from "@/types/tables";

interface ProjectsProps extends React.HTMLAttributes<HTMLDivElement> {
	email: string;
}

export function Projects({ className, email }: ProjectsProps) {
	const [projects, setProjects] = useState<Project[] | null>(null);

	useEffect(() => {
		const fetchProjects = async () => {
			if (email !== "" && projects === null) {
				const projects = await getProjects(email);
				const data: Project[] = JSON.parse(JSON.stringify(projects));
				setProjects(data);
			}
		};
		fetchProjects();
	}, [projects, email]);

	return (
		<>
			<div className={cn("md:block hidden", className)}>
				<div className="px-3 py-2 rounded-xl border border-slate-200 bg-white min-w-[200px]">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						Your Projects
					</h2>
					<ScrollArea className="h-[300px] px-1">
						<div className="flex flex-col space-y-1">
							{projects?.map((project) => (
								<Link
									key={`${project._id}`}
									href={`/${email}/${project._id}`}
								>
									<Button
										variant="ghost"
										className="w-full justify-start font-normal"
									>
										<SquareKanban className="mr-2 h-4 w-4" />
										{project.title}
									</Button>
								</Link>
							))}
						</div>
					</ScrollArea>
				</div>
			</div>
		</>
	);
}
