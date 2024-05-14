import clientPromise from "@/lib/mongodb";
import { Metadata } from "next";
import { auth } from "@/app/auth";

export const metadata: Metadata = {
	title: "All Projects",
};

async function getUser(email: string) {
	const client = await clientPromise;
	const db = client.db("geets");
	const user = await db.collection("users").findOne({ email });
	return user;
}
async function getProjects() {
	try {
		const client = await clientPromise;
		const db = client.db("geets");
		const projects = await db.collection("projects").find({}).toArray();
		return projects;
	} catch (err) {
		console.error("Error fetching projects:", err);
		return [];
	}
}

export default async function ProjectsPage() {
	const projects = await getProjects();

	("use client");

	const projectList = projects
		// .filter((project) => project.title && project.description)
		.map((project) => (
			<div
				key={project.title}
				className="w-[300px] bg-black-400 rounded-lg shadow-md m-2 p-2 text-center"
			>
				<div>
					<div className="text-green-500 text-xl font-extrabold">
						{project.title}
					</div>
					<div>Owner: {project.owner}</div>
					<div>Description: {project.description}</div>
					<div>Participants: {project.participants}</div>
					<div>
						Themes:{" "}
						{project.themes
							? project.themes.join(", ")
							: "No themes"}
					</div>
				</div>
			</div>
		));

	return (
		<div className="py-8">
			<div className="title text-green-400 text-center text-3xl font-bold mb-16">
				All projects
			</div>
			<div className="flex flex-wrap justify-center m-0 p-0 list-none">
				{projectList}
			</div>
		</div>
	);
}
