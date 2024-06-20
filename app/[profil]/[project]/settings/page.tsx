"use client";
import type { Project } from "@/types/tables";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteProject } from "@/lib/data/project";
import { useState, useEffect } from 'react';
import { getProject } from "@/lib/data/project";

export default function SettingsPage({
    params,
}: Readonly<{
    params: { profil: string; project: string };
}>) {
    const projectId = params.project;
    const [project, setProject] = useState<Project | null>(null);
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedProject = await getProject(projectId);
            setProject(fetchedProject);
            setIsLoading(false);
        };
        fetchData();
    }, [projectId]);


    const handleDelete = async (projectId: string) => {
        deleteProject(projectId);
        toast({
            title: "Success!",
            description: "Your project has been deleted.",
            variant: "success",
        });
    };

    return (
        <div>
            <h1>Settings</h1>
            <Button
                variant={"destructive"}
                onClick={() => {
                    if (project) {
                        handleDelete(project._id);
                    }
                }}
            >
                Delete Project
            </Button>
        </div>
    );
}