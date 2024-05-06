"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { useToast } from "./ui/use-toast";
import Modal from "./ui/modal";


export function InputPost() {
	const animatedComponents = makeAnimated();
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
    const [textareaHeight, setTextareaHeight] = useState("min-h-[40px]");  // Gère la hauteur de Textarea
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const themeOptions = [
		{ value: "fitness", label: "💪 Fitness" },
		{ value: "basket", label: "🏀 Basket" },
		{ value: "music", label: "🎶 Music" },
		{ value: "gaming", label: "👾 Gaming" },
		{ value: "travel", label: "✈️ Travel" },
		{ value: "art", label: "🎨 Art" },
		{ value: "coding", label: "💻 Coding" },
		{ value: "cooking", label: "🍳 Cooking" },
		{ value: "photography", label: "📸 Photography" },
		{ value: "writing", label: "📝 Writing" },
		{ value: "movies", label: "🎬 Movies" },
		{ value: "books", label: "📚 Books" },
		{ value: "sports", label: "🏈 Sports" },
		{ value: "politics", label: "🏛 Politics" },
		{ value: "science", label: "🔬 Science" },
		{ value: "history", label: "🏰 History" },
		{ value: "news", label: "📰 News" },
		{ value: "other", label: "🏦 Finance" },
	];

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
				setTextareaHeight("min-h-[40px]");

			});
	};
	const expandedStyle = {
		maxHeight: isExpanded ? "1000px" : "0", // Adjust max height based on your content size
		overflow: "hidden",
		transition: "max-height 0.3s ease-in-out",
	};

	const handleThemeChange = (newValue: any) => {
		if (Array.isArray(newValue)) {
			setThemes(newValue);
		} else {
			setThemes([]);
		}
	};

	return (
		<div>
			<div className="p-5 rounded-3xl bg-postbg">
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
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							height={textareaHeight}
							style={{
								minHeight: textareaHeight,
								transition: "min-height 0.3s ease-in-out"
							}}
							id="title"
							placeholder="Share something !"
							className="text-black text-inter  placeholder-gray-400 font-normal flex h-5 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-none focus:border-gray-300 hover:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					<div /*style={expandedStyle}*/ className="flex justify-end">
						<div className="flex gap-3">
							<Modal onSelectProject={setSelectedProject} />
							{selectedProject && <span>Projet sélectionné : {selectedProject}</span>}
							<Button type="submit">Envoyer</Button>
						</div>
					</div>

				</form>
			</div>
		</div>
	);
}
