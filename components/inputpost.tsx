"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import SelectProject from "./select-project";

export interface InputPostProps {
	className?: string;
}

interface Session {
	user: {
		email: string;
		name: string;
	};
	expires: Date;
}

export function InputPost({ className }: InputPostProps) {
	const [session, setSession] = useState<Session>();
	const [user, setUser] = useState<string>("");

	React.useEffect(() => {
		const fetchSession = async () => {
			const res = await fetch("/api/auth/session");
			if (res.body !== null) {
				const reader = res.body.getReader();
				const result = await reader.read();
				const decoder = new TextDecoder("utf-8");
				const text = decoder.decode(result.value);
				const session = JSON.parse(text);
				setSession(session);
			}
		};
		if (!session) {
			fetchSession();
		}
		if (!session) return;
		if (!user) {
			setUser(session.user.email);
		}
	}, [session, user]);

	const { toast } = useToast();

	const [description, setDescription] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const [textareaHeight, setTextareaHeight] = useState("min-h-[40px]"); // Gère la hauteur de Textarea
	const [selectedProject, setSelectedProject] = useState<string | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				formRef.current &&
				!formRef.current.contains(event.target as Node)
			) {
				setIsExpanded(false);
				setTextareaHeight("min-h-[40px]");
			}
		};

		if (isExpanded) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isExpanded]);

	const handleTitleFocus = () => {
		setIsExpanded(true);
		setTextareaHeight("min-h-[80px]");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isDescriptionValid = description.trim() !== "";
		if (!isDescriptionValid) {
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description:
					"Please provide a description and select a project.",
			});
			return;
		}

		await fetch("api/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				description,
				selectedProject,
				user,
			}),
		})
			.then(() => {
				toast({
					title: "Post submitted successfully",
					description: "Your post has been successfully submitted.",
				});
				setDescription("");
				setSelectedProject(null);
			})
			.catch((error) => {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description: error.message,
				});
			});
	};

	return (
		<>
			<div className={className}>
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className="flex flex-col gap-5"
				>
					<div className="flex gap-2">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Textarea
							onFocus={handleTitleFocus}
							onBlur={() => setIsExpanded(false)}
							onChange={(e) => setDescription(e.target.value)}
							value={description}
							height={textareaHeight}
							style={{
								minHeight: textareaHeight,
								transition: "min-height 0.3s ease-in-out",
							}}
							id="title"
							placeholder="Raconte nous ton projet !"
							className="text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					<div className="flex justify-end">
						<div className="flex gap-3">
							<SelectProject
								onSelectProject={setSelectedProject}
								user={user}
							/>

							<Button type="submit">Envoyer</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
