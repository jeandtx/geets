/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/tables";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { createProject } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from 'next-cloudinary';

export default function NewProject() {
	const [label, setLabel] = useState<string>("");
	const [labels, setLabels] = useState<string[]>([]);
	const [theme, setTheme] = useState<string>("");
	const [themes, setThemes] = useState<string[]>([]);
	const [participant, setParticipant] = useState<string>("");
	const [participants, setParticipants] = useState<string[]>([]);
	const { toast } = useToast();
	const { data: session } = useSession();
	const [imageUrl, setImageUrl] = useState<string>("");
	const [imageName, setImageName] = useState<string>("Ajouter une photo");

	const [project, setProject] = useState<Project>({
		_id: "Generated",
		author: "",
		title: "",
		themes: [],
		description: "",
		media: "",
		labels: [],
		participants: [],
	});

	const handleChange = (e: any) => {
		setProject({
			...project,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		if (session && session.user && session.user.email) {
			setParticipants([session.user.email]);
		}
	}, [session]);

	useEffect(() => {
		setProject({
			...project,
			themes: themes,
			labels: labels,
			media: imageUrl,
			participants: participants,
		});
	}, [themes, labels, imageUrl, participants]);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const user = session?.user?.email;
		if (!user) {
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description:
					"Please check the email or password and try again.",
			});
			return;
		} else {
			setProject({
				...project,
				author: user,
				participants: [user, ...participants.filter(p => p !== user)]
			});
		}
		createProject(project)
			.then(() => {
				toast({
					title: "Success!",
					description:
						"Your form has been submitted with " + project.title,
				});
			})
			.catch(() => {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description:
						"Please check the email or password and try again.",
				});
				return;
			});
	};

	return (
		<div>
			<div>
				<h1 className="text-3xl font-bold text-center mt-8">
					New Project
				</h1>
			</div>
			<div className="flex flex-col space-y-4 w-1/2 mx-auto mt-8">
				<Input
					type="text"
					name="title"
					onChange={handleChange}
					placeholder="Title"
					required
				/>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						setThemes((prev) => [...prev, theme]);
						setTheme("");
					}}
				>
					<Input
						type="text"
						name="themes"
						onChange={(e) => {
							setTheme(e.target.value);
						}}
						value={theme}
						placeholder="Themes"
					/>
					<div className="flex flex-wrap gap-2 mt-2">
						{themes.map((theme) => (
							<Badge
								key={theme}
								onClick={() => {
									setThemes((prev) =>
										prev.filter((t) => t !== theme)
									);
								}}
							>
								{theme}
							</Badge>
						))}
					</div>
				</form>
				<Textarea
					name="description"
					onChange={handleChange}
					placeholder="Description"
				/>

				{/* Media Upload Section */}
				<CldUploadWidget 
					uploadPreset="onrkam98" 
					onSuccess={(result) => {
						setImageUrl((result as any).info.secure_url);
						setImageName((result as any).info.original_filename); // Update the image name
					}}
				>
					{({ open }) => {
						return (
							<button 
								className="overflow-hidden inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white"
								style={{ height: "40px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} 
								type="button" 
								onClick={() => open()}
							>
								{imageName}
							</button>
						);
					}}
				</CldUploadWidget>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						setLabels((prev) => [...prev, label]);
						setLabel("");
					}}
				>
					<Input
						type="text"
						name="labels"
						onChange={(e) => {
							setLabel(e.target.value);
						}}
						value={label}
						placeholder="Labels"
					/>
					<div className="flex flex-wrap gap-2 mt-2">
						{labels.map((label) => (
							<Badge
								key={label}
								onClick={() => {
									setLabels((prev) =>
										prev.filter((l) => l !== label)
									);
								}}
							>
								{label}
							</Badge>
						))}
					</div>
				</form>
				
				<form
					onSubmit={(e) => {
						e.preventDefault();
						setParticipants((prev) => [...prev, participant]);
						setParticipant("");
					}}
				>
					<Input
						type="text"
						name="participants"
						onChange={(e) => {
							setParticipant(e.target.value);
						}}
						value={participant}
						placeholder="Participants"
					/>
					<div className="flex flex-wrap gap-2 mt-2">
						{participants.map((participant) => (
							<Badge
								key={participant}
								onClick={() => {
									setParticipants((prev) =>
										prev.filter((p) => p !== participant)
									);
								}}
							>
								{participant}
							</Badge>
						))}
					</div>
				</form>
				
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<Button type="submit">Submit</Button>
				</form>
			</div>
		</div>
	);
}
