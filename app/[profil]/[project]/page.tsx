// page.tsx
import { getUser, getProject, getPostsByProjectId } from "@/lib/actions";
import { Post, Project } from "@/types/tables";
import ProjectDetails from "@/components/ProjectDetails";

export default async function ProjectPage({
    params,
}: Readonly<{
    params: { profil: string; project: string };
}>) {
    const { profil } = params;
    const decodeEmail = decodeURIComponent(profil);

    const user = await getUser(decodeEmail);

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
