"use client";
import { useState, useEffect } from "react";
import { getProject } from "@/lib/data/project";
import { getPosts } from "@/lib/data/post";
import { Post, Project } from "@/types/tables";
import ProjectDetails from "@/components/project-details";

export default function ProjectPage({
	params,
}: Readonly<{
	params: { profil: string; project: string };
}>) {
	const projectId = params.project;
	const [project, setProject] = useState<Project | null>(null);
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const fetchedProject = await getProject(projectId);
			const fetchedPosts = await getPosts(1, {
				"project._id": projectId,
			});
			setProject(fetchedProject);
			setPosts(fetchedPosts);
			setIsLoading(false);
		};
		fetchData();
	}, [projectId]);

	if (isLoading) {
		return <div>Chargement....</div>;
	}

	return (
		<div className="">
			{project ? (
				<ProjectDetails project={project} posts={posts} />
			) : (
				<div>Aucun projet trouvé 😔</div>
			)}
		</div>
	);
}
