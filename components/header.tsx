import { cn } from "@/lib/utils";
import { NavigationMenuDemo } from "./navigation-menu";
import { Projects } from "./projects";
import { Sidebar } from "./sidebar";
import React from "react";
import { auth } from "@/app/auth";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function Header({ className }: HeaderProps) {
	const session = await auth();
	const email = session?.user?.email ?? "login";

	return (
		<>
			{/* <NavigationMenuDemo className="top-5 left-5 z-50 md:hidden block" /> */}
			<div className={cn("pb-12 hidden sm:block ", className)}>
				<div className=" flex flex-col h-full space-y-5 items-end">
					<Sidebar email={email} />
					<Projects email={email} />
				</div>
			</div>
		</>
	);
}
