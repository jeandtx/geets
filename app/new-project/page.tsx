'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Project, Participant } from '@/types/tables'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { createProject } from '@/lib/data/project'
import { CldUploadWidget } from 'next-cloudinary'
import { useUserInfo } from '@/app/context/UserInfoContext'
import LoadingSpinner from '@/components/ui/spinner'
import { useIsClient } from '@uidotdev/usehooks'
import { useSession } from 'next-auth/react'
import Select from 'react-select'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Trash } from 'lucide-react'
import UserSearchComponent from '@/components/userSearchBar' 

export default function NewProject() {

    const isClient = useIsClient()

    const [title, setTitle] = useState<string>('')
    const [label, setLabel] = useState<string>('')
    const [labels, setLabels] = useState<string[]>([])
    const [theme, setTheme] = useState<string>('')
    const [themes, setThemes] = useState<string[]>([])
    const [description, setDescription] = useState<string>('')
    const [participantName, setParticipantName] = useState<string>('')
    const [participantRole, setParticipantRole] = useState<string>('')
    const [participants, setParticipants] = useState<Participant[]>([])
    const { toast } = useToast()
    const session = useSession()
    const [imageUrl, setImageUrl] = useState<string>('')
    const [imageName, setImageName] = useState<string>('Ajouter une photo')
    const { userInfo } = useUserInfo()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

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

    const [project, setProject] = useState<Project>({
        _id: 'Generated',
        title: '',
        themes: [],
        description: '',
        media: '',
        labels: [],
        participants: [],
    })

    const clearLocalStorage = () => {
        localStorage.removeItem('title');
        localStorage.removeItem('labels');
        localStorage.removeItem('themes');
        localStorage.removeItem('description');
        localStorage.removeItem('participants');
        localStorage.removeItem('imageUrl');
        // Réinitialiser également l'état local si nécessaire
        setTitle('');
        setLabels([]);
        setThemes([]);
        setDescription('');
        setParticipants([]);
        setImageUrl('');
        setImageName('Ajouter une photo');
    };

    useEffect(() => {
        if (userInfo) {
            setParticipants([{ name: userInfo.email, role: 'author' }])
            setProject((prev) => ({
                ...prev,
                participants: [{ name: userInfo.email, role: 'author' }],
            }))
        }
    }, [session, userInfo])

    useEffect(() => {
        setProject((prev) => ({
            ...prev,
            themes: themes,
            labels: labels,
            media: imageUrl,
            participants: participants,
        }))
    }, [themes, labels, imageUrl, participants])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setProject((prev) => ({ ...prev, [name]: value }))

        if (name === 'title') setTitle(value)
        if (name === 'description') setDescription(value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (userInfo?.email === '') {
            toast({
                variant: 'destructive',
                title: "Uh oh! Une erreur s'est produite",
                description:
                    "Vérifiez l'email ou le mot de passe et réessayez.",
            })
            return
        } else {
            setProject((prev) => ({
                ...prev,
                participants: participants.map((p) => ({
                    name: p.name,
                    role: p.role,
                })),
            }))
        }
        setIsSubmitting(true)
        createProject(project)
            .then(() => {
                toast({
                    title: 'Succès',
                    description:
                        'Le projet ' +
                        project.title +
                        ' a été créé avec succès',
                    variant: 'success',
                    duration: 5000,
                });
                clearLocalStorage(); // Appel de la fonction pour vider le localStorage
                setTimeout(() => {
                    window.location.reload();
                }, 600);
            })
            .catch(() => {
                toast({
                    variant: 'destructive',
                    title: "Uh oh! Une erreur s'est produite",
                    description:
                        "Vérifiez l'email ou le mot de passe et réessayez.",
                })
                setIsSubmitting(false)
            })
    }

    const handleAddParticipant = () => {
        if (participantName && participantRole) {
            setParticipants((prev) => [
                ...prev,
                { name: participantName, role: participantRole },
            ])
            setParticipantName('')
            setParticipantRole('')
        }
    }

    const handleSelectUser = (user: { name: string; email: string }) => {
        setParticipants((prev) => [
            ...prev,
            { name: user.name, role: 'collaborator' },
        ]);
    };

    // Use localStorage only if it's on the client side
    useEffect(() => {
        if (isClient) {
            const savedTitle = localStorage.getItem('title')
            const savedLabels = localStorage.getItem('labels')
            const savedThemes = localStorage.getItem('themes')
            const savedDescription = localStorage.getItem('description')
            const savedParticipants = localStorage.getItem('participants')
            const savedImageUrl = localStorage.getItem('imageUrl')

            if (savedTitle) setTitle(JSON.parse(savedTitle))
            if (savedLabels) setLabels(JSON.parse(savedLabels))
            if (savedThemes) setThemes(JSON.parse(savedThemes))
            if (savedDescription) setDescription(JSON.parse(savedDescription))
            if (savedParticipants)
                setParticipants(JSON.parse(savedParticipants))
            if (savedImageUrl) setImageUrl(JSON.parse(savedImageUrl))
        }
    }, [isClient])

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('title', JSON.stringify(title))
            localStorage.setItem('labels', JSON.stringify(labels))
            localStorage.setItem('themes', JSON.stringify(themes))
            localStorage.setItem('description', JSON.stringify(description))
            localStorage.setItem('participants', JSON.stringify(participants))
            localStorage.setItem('imageUrl', JSON.stringify(imageUrl))
        }
    }, [title, labels, themes, description, participants, imageUrl, isClient])

    if (!isClient) {
        return null
    }

    return (
        <>
            {userInfo === null ? (
                <div className='flex flex-col w-full mx-auto bg-white p-8 rounded-lg shadow-lg'>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className='flex flex-col w-full mx-auto bg-white p-8 rounded-lg shadow-lg'>
                    <div>
                        <h1 className='text-3xl font-bold text-center mt-8'>
                            Mon nouveau Projet ! 🚀
                        </h1>
                    </div>
                    <div className='flex flex-col space-y-4 w-10/12 mx-auto mt-8 '>
                        <Input
                            type='text'
                            name='title'
                            onChange={handleChange}
                            value={title}
                            placeholder='Titre'
                            required
                        />
                        <Textarea
                            name='description'
                            onChange={handleChange}
                            value={description}
                            placeholder='Description'
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

                        

                        {/* Barre de recherche pour ajouter des participants */}
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

                        {/* Media Upload Section */}
                        <div className='flex items-center justify-center'>
                            <CldUploadWidget
                                uploadPreset='onrkam98'
                                onSuccess={(result) => {
                                    setImageUrl((result as any).info.secure_url)
                                    setImageName(
                                        (result as any).info.original_filename
                                    ) // Update the image name
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

                        <form
                            onSubmit={handleSubmit}
                            className='flex flex-col gap-2'
                        >
                            <Button type='submit' disabled={isSubmitting}> 
                                {isSubmitting ? 'En cours...' : 'Publier mon projet'}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
