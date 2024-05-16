"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import SelectProject from "./select-project";
import { CldUploadWidget } from 'next-cloudinary';
import { Post } from '../types/tables'
import {
	Image,
	Send
} from "lucide-react";
export interface InputPostProps {
	className?: string;
}

export function InputPost({ className }: InputPostProps) {
	const { data: session, status } = useSession();
	const [description, setDescription] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const [textareaHeight, setTextareaHeight] = useState("min-h-[40px]");
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [imageName, setImageName] = useState<string>("Ajouter une photo");

	const { toast } = useToast();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
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
				description: "Please provide a description and select a project.",
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

		const post: Post = {
			_id: "",
			project: selectedProject!,
			title: description,
			content: description,
			time: new Date(),
			author: session.user.email,
			media: imageUrl || undefined,
			labels: []
		};

		await fetch("api/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(post),
		})
		.then(() => {
			toast({
				title: "Post submitted successfully",
				description: "Your post has been successfully submitted.",
			});
			setDescription("");
			setSelectedProject(null);
			setImageUrl("Ajouter une photo");
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
				<form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
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
								borderRadius: "0.375rem",
							}}
							id="title"
							placeholder="Raconte nous ton projet !"
							className="text-black text-inter placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					<div className="flex justify-between items-center w-full px-8">
    <div className="flex gap-10">
        <SelectProject
            onSelectProject={setSelectedProject}
            selectedProject={selectedProject}
            user={session?.user?.email || ""}
        />
        <CldUploadWidget 
            uploadPreset="onrkam98" 
            onSuccess={(result) => {
                setImageUrl((result as any).info.secure_url);
                setImageName((result as any).info.original_filename);
            }}
        >
            {({ open }) => {
                return (
                <button className="overflow-hidden inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-gray-500"
    					style={{ height: "40px", maxWidth: "200px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} 
    					type="button" 
    					onClick={() => open()}>
						<div className="flex items-center justify-center">
							<Image className="h-6 w-6 text-blue-500 mr-2" />
							<span>{imageName}</span>
						</div>
				</button>
                );
            }}
        </CldUploadWidget>
    </div>
    <div className="flex">
        <Button className="overflow-hidden inline-flex items-center bg-transparent hover:none hover:bg-transparent justify-center rounded-md px-6 py-3 text-base font-medium text-gray-500" type="submit"><Send className="h-6 w-6 text-green-500 mr-2" />Envoyer</Button>
    </div>
</div>

				</form>
			</div>
		</>
	);
}
