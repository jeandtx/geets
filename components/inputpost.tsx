"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import SelectProject from "./select-project";
import { CldUploadWidget } from 'next-cloudinary';

export interface InputPostProps {
	className?: string;
}

export function InputPost({ className }: InputPostProps) {
	const { data: session, status } = useSession();
	const [description, setDescription] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const [textareaHeight, setTextareaHeight] = useState("min-h-[40px]"); // Gère la hauteur de Textarea
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [imageName, setImageName] = useState<string>("Ajouter une photo");

	const { toast } = useToast();

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
		const isProjectSelected = selectedProject !== null;

		if (!isDescriptionValid || !isProjectSelected) {
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description:
					"Please provide a description and select a project.",
			});
			return;
		}

		if (!session?.user?.email) {
			toast({
				variant: "destructive",
				title: "Not authenticated",
				description: "Please log in to submit a post.",
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
				user: session.user.email,
				imageUrl,  // Include the imageUrl in the payload
			}),
		})
			.then(() => {
				toast({
					title: "Post submitted successfully",
					description: "Your post has been successfully submitted.",
				});
				setDescription("");
				setSelectedProject(null);
				setImageUrl("Ajouter une photo");  // Reset the imageUrl state
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
								selectedProject={selectedProject}
								user={session?.user?.email || ""}
							/>
							<CldUploadWidget 
								
								uploadPreset="onrkam98" 
								onSuccess={(result) => {
									setImageUrl((result as any).info.secure_url);
									setImageName((result as any).info.original_filename); // Update the image name
								}}
							>
								{({ open }) => {
									return (
										<button className="overflow-hidden inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white"
										style={{ height: "40px", maxWidth: "200px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} type="button" onClick={() => open()}>
											{imageName}
										</button>
									);
								}}
							</CldUploadWidget>
							<Button type="submit">Envoyer</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
