"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
	SquareKanban,
	FlaskConical,
	BookHeart,
	PersonStanding,
	EarthLock,
	SunMoon,
	UserRoundCog,
	Languages,
	BellMinus,
	SquareMousePointer,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { NavigationMenuDemo } from "./navigation-menu";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const projects = [
	"Matchical",
	"Musimatch",
	"MatchMelody",
	"Rhythmatch",
	"Harmonimatch",
	"MatchTune",
	"Melodimatch",
	"Symphomatch",
	"Beatmatch",
	"MatchNote",
];

export function Sidebar({ className }: SidebarProps) {
	const [session, setSession] = useState<any>(null);

	React.useEffect(() => {
		const fetchSession = async () => {
			const res = await fetch("/api/auth/session");
			if (res.body !== null) {
				const reader = res.body.getReader();
				const result = await reader.read(); // yields { done: true, value: Uint8Array }
				const decoder = new TextDecoder("utf-8");
				const text = decoder.decode(result.value);
				const session = JSON.parse(text);
				setSession(session);
			}
		};
		fetchSession();
	}, []);

	return (
		<>
			<NavigationMenuDemo className="fixed top-4 left-4 z-50 md:hidden block" />
			<div className={cn("pb-12  md:block hidden", className)}>
				<div className="space-y-4 py-4 ">
					<div className="px-3 py-2">
						<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
							Navigate
						</h2>
						<div className="space-y-1">
							<Link href={"/"}>
								<Button
									variant="ghost"
									className="w-full justify-start"
								>
									<BookHeart className="mr-2 h-4 w-4" />
									For You
								</Button>
							</Link>
							<Link href={"/testing"}>
								<Button
									variant="ghost"
									className="w-full justify-start"
								>
									<FlaskConical className="mr-2 h-4 w-4" />
									Testing Page
								</Button>
							</Link>
							<Link href={`/${session?.user?.email}`}>
								<Button
									variant="ghost"
									className="w-full justify-start"
								>
									<PersonStanding className="mr-2 h-4 w-4" />
									Profil
								</Button>
							</Link>
							<Link href={`/posts`}>
								<Button
									variant="ghost"
									className="w-full justify-start"
								>
									<SquareMousePointer className="mr-2 h-4 w-4" />
									My Posts
								</Button>
							</Link>
							<Link href={`/projects`}>
								<Button
									variant="ghost"
									className="w-full justify-start"
								>
									<SquareKanban className="mr-2 h-4 w-4" />
									My Projects
								</Button>
							</Link>
						</div>
					</div>
					<div className="px-3 py-2">
						<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
							Settings
						</h2>
						<div className="space-y-1">
							<Button
								variant="ghost"
								className="w-full justify-start"
							>
								<EarthLock className="mr-2 h-4 w-4" />
								Policy
							</Button>
							<Button
								variant="ghost"
								className="w-full justify-start"
							>
								<SunMoon className="mr-2 h-4 w-4" />
								Themes
							</Button>
							<Button
								variant="ghost"
								className="w-full justify-start"
							>
								<UserRoundCog className="mr-2 h-4 w-4" />
								Account
							</Button>
							<Button
								variant="ghost"
								className="w-full justify-start"
							>
								<BellMinus className="mr-2 h-4 w-4" />
								Notification
							</Button>
							<Button
								variant="ghost"
								className="w-full justify-start"
							>
								<Languages className="mr-2 h-4 w-4" />
								Language
							</Button>
						</div>
					</div>

					<div className="py-2">
						<h2 className="relative px-7 text-lg font-semibold tracking-tight">
							Your Projects
						</h2>
						<ScrollArea className="h-[300px] px-1">
							<div className="space-y-1 p-2">
								{projects?.map((playlist, i) => (
									<Button
										key={`${playlist}-${i}`}
										variant="ghost"
										className="w-full justify-start font-normal"
									>
										<SquareKanban className="mr-2 h-4 w-4" />
										{playlist}
									</Button>
								))}
							</div>
						</ScrollArea>
					</div>
				</div>
			</div>
		</>
	);
}
