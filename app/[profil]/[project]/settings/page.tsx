"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Project, Participant } from "@/types/tables";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getProject, updateProject, deleteProject } from "@/lib/data/project";
import { CldUploadWidget } from "next-cloudinary";
import LoadingSpinner from '@/components/ui/spinner';

export default function SettingsPage({
    params,
}: Readonly<{
    params: { profil: string; project: string };
}>) {
    const projectId = params.project;
    const [label, setLabel] = useState<string>("");
    const [labels, setLabels] = useState<string[]>([]);
    const [theme, setTheme] = useState<string>("");
    const [themes, setThemes] = useState<string[]>([]);
    const [participantMail, setparticipantMail] = useState<string>("");
    const [participantRole, setParticipantRole] = useState<string>("");
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imageName, setImageName] = useState<string>("Ajouter une photo");
    const { toast } = useToast();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [initialTitle, setInitialTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedProject = await getProject(projectId);
            setProject(fetchedProject);
            setInitialTitle(fetchedProject.title);
            setThemes(fetchedProject.themes || []);
            setLabels(fetchedProject.labels || []);
            setImageUrl(fetchedProject.media || "");
            setParticipants(fetchedProject.participants || []);
            setIsLoading(false);
        };
        fetchData();
    }, [projectId]);

    const handleChange = (e: any) => {
        if (project) {
            setProject({
                ...project,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        if (!project) return;

        const updatedProject: Project = {
            ...project,
            themes: themes,
            labels: labels,
            media: imageUrl,
            participants: participants,
        };

        try {
            await updateProject(updatedProject);
            toast({
                title: "Success!",
                description: "Your project has been updated.",
                variant: "success",
            });
        } catch (error) {
            console.error('Error updating project:', error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was an error updating your project.",
            });
        }
    };

    const handleDelete = async () => {
        if (project) {
            try {
                await deleteProject(project._id);
                toast({
                    title: "Success!",
                    description: "Your project has been deleted.",
                    variant: "success",
                });
            } catch (error) {
                console.error('Error deleting project:', error);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was an error deleting your project.",
                });
            }
        }
    };

    const handleAddParticipant = () => {
        if (participantMail && participantRole) {
            setParticipants((prev) => [
                ...prev,
                { name: participantMail, role: participantRole },
            ]);
            setparticipantMail("");
            setParticipantRole("");
        }
    };

    const handleDeleteParticipant = (name: string) => {
        setParticipants((prev) => prev.filter((participant) => participant.name !== name));
    };

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="flex flex-col w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <div>
                        <h1 className="text-3xl font-bold text-center mt-8">
                            Update {initialTitle || "Project"}
                        </h1>
                    </div>
                    <div className="flex flex-col space-y-4 w-10/12 mx-auto mt-8 ">
                        <Input
                            type="text"
                            name="title"
                            value={project?.title || ""}
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
                                onChange={(e) => setTheme(e.target.value)}
                                value={theme}
                                placeholder="Themes"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {themes.map((theme) => (
                                    <Badge
                                        key={theme}
                                        onClick={() => setThemes((prev) => prev.filter((t) => t !== theme))}
                                    >
                                        {theme}
                                    </Badge>
                                ))}
                            </div>
                        </form>
                        <Textarea
                            name="description"
                            value={project?.description || ""}
                            onChange={handleChange}
                            placeholder="Description"
                        />

                        <CldUploadWidget
                            uploadPreset="onrkam98"
                            onSuccess={(result) => {
                                setImageUrl((result as any).info.secure_url);
                                setImageName((result as any).info.original_filename);
                            }}
                        >
                            {({ open }) => (
                                <button
                                    className="overflow-hidden inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white"
                                    style={{ height: "40px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
                                    type="button"
                                    onClick={() => open()}
                                >
                                    {imageName}
                                </button>
                            )}
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
                                onChange={(e) => setLabel(e.target.value)}
                                value={label}
                                placeholder="Labels"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {labels.map((label) => (
                                    <Badge
                                        key={label}
                                        onClick={() => setLabels((prev) => prev.filter((l) => l !== label))}
                                    >
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        </form>

                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                name="participantMail"
                                onChange={(e) => setparticipantMail(e.target.value)}
                                value={participantMail}
                                placeholder="Participant Mail"
                            />
                            <Input
                                type="text"
                                name="participantRole"
                                onChange={(e) => setParticipantRole(e.target.value)}
                                value={participantRole}
                                placeholder="Participant Role"
                            />
                            <Button onClick={handleAddParticipant}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {participants
                                .map((participant) => (
                                    <Badge
                                        key={participant.name}
                                        onClick={() => handleDeleteParticipant(participant.name)}
                                    >
                                        {participant.name} ({participant.role})
                                    </Badge>
                                ))}
                        </div>

                        <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                            <Button type="submit">Update Project</Button>
                        </form>
                        <Button variant={"destructive"} onClick={handleDelete}>
                            Delete Project
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
