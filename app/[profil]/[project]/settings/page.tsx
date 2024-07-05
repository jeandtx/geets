'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Project, Participant } from '@/types/tables'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { getProject, updateProject, deleteProject } from '@/lib/data/project'
import { CldUploadWidget } from 'next-cloudinary'
import LoadingSpinner from '@/components/ui/spinner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Select from 'react-select'
import { Trash } from 'lucide-react'
import UserSearchComponent from '@/components/userSearchBar' 
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger } from '@/components/ui/alert-dialog'
import Link from 'next/link'

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

    const themeOptions = [
        { value: 'sport', label: 'Sport' },
        { value: 'social', label: 'Social' },
        { value: 'finance', label: 'Finance' },
        { value: 'musique', label: 'Musique' },
        { value: 'application', label: 'Application' },
        { value: 'productivite', label: 'Productivité' },
        { value: 'divertissement', label: 'Divertissement' },
        { value: 'jeu', label: 'Jeu' },
        { value: 'education', label: 'Éducation' },
        { value: 'sante', label: 'Santé' },
        { value: 'art', label: 'Art' },
        { value: 'design', label: 'Design' },
        { value: 'technologie', label: 'Technologie' },
        { value: 'environnement', label: 'Environnement' },
        { value: 'photographie', label: 'Photographie' },
        { value: 'science', label: 'Science' },
    ];

    const labelOptions = [
        { value: 'developpement', label: 'Développement' },
        { value: 'design', label: 'Design' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'communication', label: 'Communication' },
        { value: 'finance', label: 'Finance' },
        { value: 'management', label: 'Management' },
        { value: 'juridique', label: 'Juridique' },
        { value: 'photographie', label: 'Photographie' },
        { value: 'science', label: 'Science' },
        { value: 'autre', label: 'Autre' },
    ]

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
                title: 'Succès!',
                description:
                        'Le projet ' +
                        project.title +
                        ' a été modifié',
                variant: 'success',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Uh oh! Une erreur s'est produite.",
                description: "Ton projet n'a pas pu être modifié.",
            });
        }
    };

    const handleSelectUser = (user: { name: string; email: string }) => {
        setParticipants((prev) => [
            ...prev,
            { name: user.name, role: 'collaborator' },
        ]);
    };

    const handleDelete = async () => {
        if (project) {
            try {
                await deleteProject(project._id);
                toast({
                    title: 'Succès!',
                    description:
                        'Le projet ' +
                        project.title +
                        ' a été supprimé.',
                    variant: "success",
                });
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: "Uh oh! Une erreur s'est produite.",
                    description: "Ton projet n'a pas pu être supprimé.",
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
                            Modifier {initialTitle || "Project"}
                        </h1>
                    </div>
                    <div className="flex flex-col space-y-4 w-10/12 mx-auto mt-8 ">
                        <Input
                            type="text"
                            name="title"
                            value={project?.title || ""}
                            onChange={handleChange}
                            placeholder="Titre"
                            required
                        />
                        <Textarea
                            name="description"
                            value={project?.description || ""}
                            onChange={handleChange}
                            placeholder="Description"
                        />

                        <div className='inline-flex justify-between'>
                            <Select
                                isMulti 
                                name='themes'
                                className='w-11/12 rounded-md border border-input bg-background px-0 py-0 text-sm'
                                options={themeOptions}
                                placeholder="Thèmes"
                                onChange={(selectedOptions) => setThemes(selectedOptions.map(option => option.value))}
                                value={themeOptions.filter(option => themes.includes(option.value))}
                                // overwrite the style of the select component by removing the default border 
                                styles={{
                                    control: (provided) => ({
                                    ...provided,
                                    border: 'none',
                                    boxShadow: 'none', 
                                    padding: '0'
                                    }), 
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: 'rgb(108, 114, 127)'
                                    })
                                }}
                            />

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <button className='border rounded-full border-gray-200 inline-flex items-center justify-center px-2 py-1 w-7 hover:bg-slate-50'>
                                        ❔
                                    </button>       
                                    </TooltipTrigger>
                                    <TooltipContent>
                                            <div>
                                                Renseigne les thèmes de ton projet !
                                            </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className='mt-4'>
                            <UserSearchComponent onSelectUser={handleSelectUser} />
                        </div>

                        <div className='flex flex-wrap gap-4 mt-2'>
                            {participants
                                .filter((p) => p.role !== 'author')
                                .map((participant) => (
                                    <Badge
                                        key={participant.name}
                                        onClick={() => {
                                            setParticipants((prev) =>
                                                prev.filter(
                                                    (p) =>
                                                        p.name !==
                                                        participant.name
                                                )
                                            )
                                        }}
                                    >
                                        {participant.name} ({participant.role})
                                        
                                        <Trash className='ml-2 h-4 w-4 text-red-500'/>
                                    </Badge>
                                ))}
                        </div>

                        <div className='inline-flex justify-between'>
                            <Select
                                isMulti 
                                name='competences'
                                className='w-11/12 rounded-md border border-input bg-background px-0 py-0 text-sm'
                                options={labelOptions}
                                placeholder="Compétences requises"
                                onChange={(selectedOptions) => setLabels(selectedOptions.map(option => option.value))}
                                value={labelOptions.filter(option => labels.includes(option.value))}
                                // overwrite the style of the select component by removing the default border 
                                styles={{
                                    control: (provided) => ({
                                    ...provided,
                                    border: 'none',
                                    boxShadow: 'none', 
                                    padding: '0'
                                    }), 
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: 'rgb(108, 114, 127)'
                                    })
                                }}
                            />

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <button className='border rounded-full border-gray-200 inline-flex items-center justify-center px-2 py-1 w-7 hover:bg-slate-50'>
                                        ❔
                                    </button>       
                                    </TooltipTrigger>
                                    <TooltipContent>
                                            <div>
                                                Renseigne les compétences spécifiques que tu recherches pour donner vie à ton projet ! 
                                            </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        
                        <div className='flex items-center justify-center'>
                            <CldUploadWidget
                                uploadPreset='onrkam98'
                                onSuccess={(result) => {
                                    setImageUrl((result as any).info.secure_url)
                                    setImageName((result as any).info.original_filename) 
                                }}
                            >
                                {({ open }) => {
                                    return (
                                        <button
                                            className='w-1/3 overflow-hidden inline-flex items-center justify-center border border-input bg-background rounded-md px-6 py-3 text-sm font-medium hover:bg-slate-50'
                                            style={{
                                                height: '40px',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                            }}
                                            type='button'
                                            onClick={() => open()}
                                        >
                                            <div className='p-1'>📥</div>{imageName}
                                        </button>
                                    )
                                }}
                            </CldUploadWidget>
                        </div>

                        <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                            <Button type="submit">Modifier mon projet</Button>
                        </form>
                        
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Supprimer le projet</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Es-tu sûr(e) ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cette action ne peut pas être annulée. Cette option va supprimer définitivement le projet et toutes les données associées.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <Link href={`/new-project`}>
                                        <AlertDialogAction onClick={async () => {
                                                await handleDelete();
                                            }}
                                        >
                                            Supprimer
                                        </AlertDialogAction>
                                    </Link>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            )}
        </>
    );
}
