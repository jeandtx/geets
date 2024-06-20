"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Project, Participant } from "@/types/tables";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { createProject } from "@/lib/data/project";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import { useUserInfo } from "@/app/context/UserInfoContext";
import LoadingSpinner from "@/components/ui/spinner";
import { useLocalStorage, useIsClient } from "@uidotdev/usehooks";

export default function NewProject() {
    const isClient = useIsClient();

    const [title, setTitle] = useState<string>("");
    const [label, setLabel] = useState<string>("");
    const [labels, setLabels] = useState<string[]>([]);
    const [theme, setTheme] = useState<string>("");
    const [themes, setThemes] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [participantName, setParticipantName] = useState<string>("");
    const [participantRole, setParticipantRole] = useState<string>("");
    const [participants, setParticipants] = useState<Participant[]>([]);
    const { toast } = useToast();
    const session = useSession();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imageName, setImageName] = useState<string>("Ajouter une photo");
    const { userInfo, status } = useUserInfo();

    const [project, setProject] = useState<Project>({
        _id: "Generated",
        title: "",
        themes: [],
        description: "",
        media: "",
        labels: [],
        participants: [],
    });

    useEffect(() => {
        if (userInfo) {
            setParticipants([{ name: userInfo.email, role: "author" }]);
            setProject((prev) => ({
                ...prev,
                participants: [{ name: userInfo.email, role: "author" }],
            }));
        }
    }, [session, userInfo]);

    useEffect(() => {
        setProject((prev) => ({
            ...prev,
            themes: themes,
            labels: labels,
            media: imageUrl,
            participants: participants,
        }));
    }, [themes, labels, imageUrl, participants]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));

        if (name === "title") setTitle(value);
        if (name === "description") setDescription(value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (userInfo?.email === "") {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please check the email or password and try again.",
            });
            return;
        } else {
            setProject((prev) => ({
                ...prev,
                participants: participants.map((p) => ({
                    name: p.name,
                    role: p.role,
                })),
            }));
        }
        createProject(project)
            .then(() => {
                toast({
                    title: "Success!",
                    description: "Your form has been submitted with " + project.title,
                    variant: "success",
                });
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Please check the email or password and try again.",
                });
            });
    };

    const handleAddParticipant = () => {
        if (participantName && participantRole) {
            setParticipants((prev) => [
                ...prev,
                { name: participantName, role: participantRole },
            ]);
            setParticipantName("");
            setParticipantRole("");
        }
    };

    // Use localStorage only if it's on the client side
    useEffect(() => {
        if (isClient) {
            const savedTitle = localStorage.getItem("title");
            const savedLabels = localStorage.getItem("labels");
            const savedThemes = localStorage.getItem("themes");
            const savedDescription = localStorage.getItem("description");
            const savedParticipants = localStorage.getItem("participants");
            const savedImageUrl = localStorage.getItem("imageUrl");

            if (savedTitle) setTitle(JSON.parse(savedTitle));
            if (savedLabels) setLabels(JSON.parse(savedLabels));
            if (savedThemes) setThemes(JSON.parse(savedThemes));
            if (savedDescription) setDescription(JSON.parse(savedDescription));
            if (savedParticipants) setParticipants(JSON.parse(savedParticipants));
            if (savedImageUrl) setImageUrl(JSON.parse(savedImageUrl));
        }
    }, [isClient]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem("title", JSON.stringify(title));
            localStorage.setItem("labels", JSON.stringify(labels));
            localStorage.setItem("themes", JSON.stringify(themes));
            localStorage.setItem("description", JSON.stringify(description));
            localStorage.setItem("participants", JSON.stringify(participants));
            localStorage.setItem("imageUrl", JSON.stringify(imageUrl));
        }
    }, [title, labels, themes, description, participants, imageUrl, isClient]);

    if (!isClient) {
        return null;
    }

    return (
        <>
            {userInfo === null ? (
                <div className="flex flex-col w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="flex flex-col w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <div>
                        <h1 className="text-3xl font-bold text-center mt-8">
                            New Project for {userInfo?.email}
                        </h1>
                    </div>
                    <div className="flex flex-col space-y-4 w-10/12 mx-auto mt-8 ">
                        <Input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            value={title}
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
                                        onClick={() => {
                                            setThemes((prev) => prev.filter((t) => t !== theme));
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
                            value={description}
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
                                        style={{
                                            height: "40px",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                        }}
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
                                onChange={(e) => setLabel(e.target.value)}
                                value={label}
                                placeholder="Labels"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {labels.map((label) => (
                                    <Badge
                                        key={label}
                                        onClick={() => {
                                            setLabels((prev) => prev.filter((l) => l !== label));
                                        }}
                                    >
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        </form>

                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                name="participantName"
                                onChange={(e) => setParticipantName(e.target.value)}
                                value={participantName}
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
                                .filter((p) => p.role !== "author")
                                .map((participant) => (
                                    <Badge
                                        key={participant.name}
                                        onClick={() => {
                                            setParticipants((prev) => prev.filter((p) => p.name !== participant.name));
                                        }}
                                    >
                                        {participant.name} ({participant.role})
                                    </Badge>
                                ))}
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
