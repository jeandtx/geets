"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { BookHeart, FlaskConical, PersonStanding } from "lucide-react";

export function NavigationMenuDemo({
	className,
}: Readonly<{ className?: string }>) {
	const [session, setSession] = React.useState<any>(null);

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
		<NavigationMenu className={className}>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Navigate</NavigationMenuTrigger>
					<NavigationMenuContent className="w-[300px]">
						<ul className="gap-3 p-6 md:w-1/3 lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<ListItem href="/">
								<Button
									variant="ghost"
									className="w-full justify-start"
								>
									<BookHeart className="mr-2 h-4 w-4" />
									For You
								</Button>
							</ListItem>
							<ListItem href="/testing">
								<Button
									variant="ghost"
									className="w-full justify-start"
								>
									<FlaskConical className="mr-2 h-4 w-4" />
									Testing Page
								</Button>
							</ListItem>
							<ListItem href={`/${session?.user?.email}`}>
								<Button
									variant="ghost"
									className="w-full justify-start"
								>
									<PersonStanding className="mr-2 h-4 w-4" />
									Profil
								</Button>
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="font-medium leading-none">{children}</div>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
