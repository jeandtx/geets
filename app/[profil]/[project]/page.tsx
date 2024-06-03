// page.tsx
import { getProject } from "@/lib/data/project";
import { getPosts } from "@/lib/data/post";
import { Post, Project } from "@/types/tables";
import ProjectDetails from "@/components/project-details";

export default async function ProjectPage({
	params,
}: Readonly<{
	params: { profil: string; project: string };
}>) {
	const projectId = params.project;
	const project: Project | null = await getProject(projectId);
	const posts: Post[] = await getPosts(-1, {
		"project._id": projectId,
	});

	return (
		<div className="">
			{project ? (
				<ProjectDetails project={project} posts={posts} />
			) : (
				<div>No Project found 😔</div>
			)}
		</div>
	);
}
