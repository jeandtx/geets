"use client";
import { useState, useEffect } from 'react';
import { getProject } from "@/lib/data/project";
import { getPosts } from "@/lib/data/post";
import { Post, Project } from "@/types/tables";
import ProjectDetails from "@/components/project-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import PostCard from '@/components/postcard';

export default function ProjectPage({
    params,
}: Readonly<{
    params: { profil: string; project: string };
}>) {
    const projectId = params.project;
    const profileId = params.profil;
    const [project, setProject] = useState<Project | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedProject = await getProject(projectId);
            const fetchedPosts = await getPosts(1, { "project._id": projectId });
            setProject(fetchedProject);
            setPosts(fetchedPosts);
            setIsLoading(false);
        };
        fetchData();
    }, [projectId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            {project ? (
                <>
                	<ProjectDetails project={project} posts={posts} />
                    
                    {session?.user?.email === decodeURIComponent(profileId) && (
                        <Link href={`/${profileId}/${projectId}/settings`}>
                            <Button variant="link">
                                Settings
                            </Button>
                        </Link>
                    )}
                </>
            ) : (
                <div>No Project found 😔</div>
            )}
        </div>
    );
}
