"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

export function InputPost() {
	const [title, setTitle] = useState("");
	const [hook, setHook] = useState("");
	const [themes, setThemes] = useState<
		Array<{ value: string; label: string }>
	>([]);
	const { toast } = useToast();

	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				formRef.current &&
				!formRef.current.contains(event.target as Node)
			) {
				setIsExpanded(false);
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
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isTitleValid = title.length > 3;
		const isHookValid = hook.trim() !== "";
		const isThemeValid = themes.length !== 0;

		if (!isTitleValid || !isHookValid || !isThemeValid) {
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description:
					"Please check the email or password and try again.",
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
				title,
				hook,
				themes,
				description,
				imageUrl,
			}),
		})
			.catch((error) => {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description: error.message,
				});
				console.log("Showing destructive toast");
			})
			.finally(() => {
				toast({
					title: "Post submitted successfully",
					description: "Your post has been successfully submitted.",
				});
				console.log("Submission successful");
				setTitle("");
				setHook("");
				setThemes([]);
				setDescription("");
				setImageUrl("");
				setIsExpanded(false);
			});
	};
	const expandedStyle = {
		maxHeight: isExpanded ? "1000px" : "0", // Adjust max height based on your content size
		overflow: "hidden",
		transition: "max-height 0.5s ease-in-out",
	};

	return (
		<div>
			<div className="p-5 rounded-3xl bg-postbg">
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className="flex flex-col"
				>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Input
							onFocus={handleTitleFocus}
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							type="text"
							id="title"
							placeholder="Share something !"
							className="text-black text-inter placeholder-gray-400 font-normal rounded-full flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					<div style={expandedStyle} className="flex flex-col gap-5">
						<div>
							<Textarea
								onChange={(e) => setHook(e.target.value)}
								value={hook}
								id="hook"
								placeholder="Enter a catchy hook"
								style={{ height: "60px", borderRadius: "15px" }}
								className="mt-4 flex w-full placeholder-gray-400 font-normal rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:border-gray-300 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
							/>
						</div>

						<div>
							<Input
								type="text"
								onChange={(e) => setImageUrl(e.target.value)}
								value={imageUrl}
								placeholder="Image URL"
								className="text-black text-inter placeholder-gray-400 font-normal rounded-full flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
							/>
						</div>

						<div>
							<Textarea
								onChange={(e) => setDescription(e.target.value)}
								value={description}
								id="description"
								placeholder="Detailed description (optional)"
								style={{
									height: "120px",
									borderRadius: "15px",
								}}
								className="flex w-full rounded-md placeholder-gray-400 font-normal border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:border-gray-300 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
							/>
						</div>

						<Button type="submit">Submit</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
