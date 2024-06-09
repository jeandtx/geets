import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
	SquareKanban,
	BookHeart,
	PersonStanding,
	SquareMousePointer,
} from "lucide-react";
import Link from "next/link";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	email: string;
}

export async function Sidebar({ className, email }: Readonly<SidebarProps>) {
	return (
		<div className={cn(" sm:block hidden", className)}>
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
					<Link href={`/${email}`}>
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
		</div>
	);
}
