// page.tsx
import { getProject, getPostsByProjectId } from "@/lib/actions";
import { Post, Project } from "@/types/tables";
import ProjectDetails from "@/components/project-details";

export default async function ProjectPage({
	params,
}: Readonly<{
	params: { profil: string; project: string };
}>) {
	const projectId = params.project;
	const project: Project | null = await getProject(projectId);
	const posts: Post[] = await getPostsByProjectId(projectId);

	return (
		<div className="">
			{project ? (
				<ProjectDetails project={project} posts={posts} />
			) : (
				<div>Project not found :(</div>
			)}
		</div>
	);
}
