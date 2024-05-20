"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
	SquareKanban,
	FlaskConical,
	BookHeart,
	PersonStanding,
	SquareMousePointer,
} from "lucide-react";
import Link from "next/link";
import { NavigationMenuDemo } from "./navigation-menu";
import { useSession } from "next-auth/react";
import { getProjects } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Project } from "@/types/tables";
import { Projects } from "./projects";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
	const session = useSession();
	const [projects, setProjects] = useState<Project[] | null>(null);
	const [email, setEmail] = useState<string>("");

	useEffect(() => {
		const fetchProjects = async () => {
			if (email !== "" && projects === null) {
				const projects = await getProjects(email);
				const data: Project[] = JSON.parse(JSON.stringify(projects));
				setProjects(data);
			}
		};
		if (session.data?.user?.email) {
			setEmail(session.data?.user?.email);
		}
		fetchProjects();
	}, [session, email, projects]);

	return (
		<>
			<NavigationMenuDemo className="top-4 left-4 z-50 md:hidden block" />
			<div className={cn("pb-12  md:block hidden", className)}>
				<div className="flex flex-col h-full space-y-4 py-4 items-end">
					<div className="px-3 py-2 rounded-xl border border-slate-200 bg-white min-w-[200px]">
						<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
							Navigate
						</h2>
						<div className="flex flex-col space-y-1">
							<Link href={"/"}>
								<Button
									variant="ghost"
									className="justify-start w-full"
								>
									<BookHeart className="mr-2 h-4 w-4" />
									For You
								</Button>
							</Link>
							<Link href={"/testing"}>
								<Button
									variant="ghost"
									className="justify-start w-full"
								>
									<FlaskConical className="mr-2 h-4 w-4" />
									Testing Page
								</Button>
							</Link>
							<Link href={`/${session.data?.user?.email}`}>
								<Button
									variant="ghost"
									className="justify-start w-full"
								>
									<PersonStanding className="mr-2 h-4 w-4" />
									Profil
								</Button>
							</Link>
							<Link href={`/new-project`}>
								<Button
									variant="ghost"
									className="justify-start w-full"
								>
									<SquareMousePointer className="mr-2 h-4 w-4" />
									Write Project
								</Button>
							</Link>
							<Link href={`/${email}/projects`}>
								<Button
									variant="ghost"
									className="justify-start w-full"
								>
									<SquareKanban className="mr-2 h-4 w-4" />
									My Projects
								</Button>
							</Link>
						</div>
					</div>
					<Projects email={email} />
				</div>
			</div>
		</>
	);
}
