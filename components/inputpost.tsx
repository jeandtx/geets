"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import SelectProject from "./select-project";
import { CldUploadWidget } from "next-cloudinary";
import { Post, Project } from "../types/tables";
import { Image, Send } from "lucide-react";
import { useUserInfo } from "@/app/context/UserInfoContext"; // Assurez-vous de modifier le chemin d'importation
import { createPost } from "@/lib/data/post";

export interface InputPostProps {
	className?: string;
}

export function InputPost({ className }: Readonly<InputPostProps>) {
	const { data: session } = useSession();
	const [description, setDescription] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const [textareaHeight, setTextareaHeight] = useState("min-h-[40px]");
	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null
	);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [imageName, setImageName] = useState<string>("Ajouter une photo");
	const { toast } = useToast();
	const { userInfo, status } = useUserInfo();

	const DEFAULT_USER_IMAGE =
		"https://res.cloudinary.com/dekbkndn8/image/upload/v1715719366/samples/balloons.jpg";

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

		const userMedia = userInfo?.media || DEFAULT_USER_IMAGE;

		const post: Post = {
			_id: "",
			project: {
				_id: selectedProject._id,
				title: selectedProject.title,
			},
			content: description,
			time: new Date(),
			author: {
				_id: "",
				pseudo: session.user.name ?? "",
				email: session.user.email,
				media: userMedia,
			},
			media: imageUrl ?? undefined,
			labels: [],
		};

		await createPost(post)
			.then(() => {
				toast({
					title: "Post submitted successfully",
					description: "Your post has been successfully submitted.",
				});
				setDescription("");
				setSelectedProject(null);
				setImageUrl(null);
				setImageName("Ajouter une photo");
				setIsExpanded(false);
				setTextareaHeight("min-h-[40px]");
			})
			.catch((error) => {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description: error.message,
				});
			});
	};

	const handleSelectProject = (project: Project | null) => {
		if (!session) {
			toast({
				variant: "destructive",
				title: "Not authenticated",
				description: "Please log in to select a project.",
			});
			return;
		}
		setSelectedProject(project);
	};

	return (
		<div className={className}>
			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className="flex flex-col gap-5 p-6 rounded-xl border border-slate-200 bg-white"
			>
				<div className="flex gap-2">
					<Avatar>
						<AvatarImage
							src={userInfo?.media || DEFAULT_USER_IMAGE}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<Textarea
						onFocus={handleTitleFocus}
						onBlur={() => {
							setIsExpanded(false);
							setTextareaHeight("min-h-[40px]");
						}}
						onChange={(e) => setDescription(e.target.value)}
						value={description}
						height={textareaHeight}
						style={{
							minHeight: textareaHeight,
							transition: "min-height 0.3s ease-in-out",
							WebkitBorderRadius: "5px",
							MozBorderRadius: "5px",
							borderRadius: "15px",
							resize: "none",
							overflow: "hidden",
						}}
						id="title"
						placeholder="Parle nous ton projet !"
						className="resize-none text-base font-medium text-gray-500 placeholder-gray-400  flex h-5 w-full border border-input bg-background px-3 py-2  focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
				</div>

				<div className="flex justify-between items-center w-full">
					<SelectProject
						onSelectProject={handleSelectProject}
						selectedProject={selectedProject}
						user={session?.user?.email ?? ""}
					/>
					<CldUploadWidget
						uploadPreset="onrkam98"
						onSuccess={(result) => {
							setImageUrl((result as any).info.secure_url);
							setImageName(
								(result as any).info.original_filename
							);
						}}
					>
						{({ open }) => {
							return (
								<button
									className="overflow-hidden inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-gray-500"
									style={{
										height: "40px",
										maxWidth: "200px",
										whiteSpace: "nowrap",
										textOverflow: "ellipsis",
										overflow: "hidden",
									}}
									type="button"
									onClick={() => open()}
								>
									<div className="flex items-center justify">
										<Image className="h-6 w-6 text-blue-500 mr-2" />
										{imageName}
									</div>
								</button>
							);
						}}
					</CldUploadWidget>
					<Button
						className="overflow-hidden inline-flex items-center bg-transparent hover:none hover:bg-transparent justify-center rounded-md px-6 py-3 text-base font-medium text-gray-500"
						type="submit"
					>
						<Send className="h-6 w-6 text-green-500 mr-2" />
						Envoyer
					</Button>
				</div>
			</form>
		</div>
	);
}
