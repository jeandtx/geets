import { cn } from "@/lib/utils";
import { NavigationMenuDemo } from "./navigation-menu";
import { Projects } from "./projects";
import { Sidebar } from "./sidebar";
import React from "react";
import { auth } from "@/app/auth";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function Header({ className }: HeaderProps) {
	const session = await auth();
	const email = session?.user?.email ?? "";

	return (
		<>
			<NavigationMenuDemo className="top-4 left-4 z-50 md:hidden block" />
			<div className={cn("pb-12  md:block hidden", className)}>
				<div className="flex flex-col h-full space-y-4 py-4 items-end">
					<Sidebar email={email} />
					<Projects email={email} />
				</div>
			</div>
		</>
	);
}
