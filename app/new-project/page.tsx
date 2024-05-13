/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/tables";
import { Badge } from "@/components/ui/badge";

export default function NewProject() {
	const [label, setLabel] = useState<string>("");
	const [labels, setLabels] = useState<string[]>([]);
	const [theme, setTheme] = useState<string>("");
	const [themes, setThemes] = useState<string[]>([]);

	const [project, setProject] = useState<Project>({
		_id: "Generated",
		author: "Generated",
		title: "",
		themes: themes,
		description: "",
		media: "",
		labels: labels,
		participants: [],
	});

	const handleChange = (e: any) => {
		setProject({
			...project,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		setProject({
			...project,
			themes: themes,
			labels: labels,
		});
	}, [themes, labels]);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(project, labels, themes);
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
				<Input
					type="text"
					name="media"
					onChange={handleChange}
					placeholder="Media"
				/>

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
				<Input
					type="text"
					name="participants"
					onChange={handleChange}
					placeholder="Participants"
				/>
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<Button type="submit">Submit</Button>
				</form>
			</div>
		</div>
	);
}
