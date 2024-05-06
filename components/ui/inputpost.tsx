"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Input } from "./input";
import { Textarea } from "./textarea";
import makeAnimated from "react-select/animated";
import { useToast } from "./use-toast";
import Modal from "./modal";

export interface InputPostProps {
    projects: Array<{ _id: string; name: string; description: string; [key: string]: any }>;
	userEmail: string; // Ajout de l'e-mail de l'utilisateur comme prop

}



export function InputPost({ projects, userEmail}: InputPostProps) {
	
	
	const { toast } = useToast();

	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
    const [textareaHeight, setTextareaHeight] = useState("min-h-[40px]");  // Gère la hauteur de Textarea
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
        // const isProjectSelected = selectedProject !== null;
		if (!isDescriptionValid) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please provide a description and select a project.",
            });
            console.log("Validation failed, not submitting.");
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
				userEmail
            }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    const { msg } = await response.json();
                    throw new Error(msg);
                }
                return response.json();
            })
            .then((data) => {
                toast({
                    title: "Post submitted successfully",
                    description: "Your post has been successfully submitted.",
                });
                console.log("Submission successful");
                setDescription("");
                setSelectedProject(null);
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                });
                console.log("Showing destructive toast");
            });
    
	};
	const expandedStyle = {
		maxHeight: isExpanded ? "1000px" : "0", // Adjust max height based on your content size
		overflow: "hidden",
		transition: "max-height 0.3s ease-in-out",
	};

	

	return (
		<div>
			<div className="">
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
								transition: "min-height 0.3s ease-in-out"
							}}
							id="title"
							placeholder="Raconte nous ton projet !"
							className="text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					<div /*style={expandedStyle}*/ className="flex justify-end">
						<div className="flex gap-3">
							<Modal onSelectProject={setSelectedProject} projects={projects} />
							
							<Button type="submit">Envoyer</Button>
						</div>
					</div>

				</form>
			</div>
		</div>
	);
}
