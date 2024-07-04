'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Post, Project, Participant, Interaction } from '@/types/tables'
import Img from 'next/image'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import ProfileCard from '@/components/profilcard'
import { createInteraction } from '@/lib/data/interactions'
import PostCard from './postcard'

interface ProjectDetailsProps {
    project: Project
    posts: Post[]
}

export default function ProjectDetails({
    project,
    posts,
}: Readonly<ProjectDetailsProps>) {
    const [participants, setParticipants] = useState<Participant[]>(
        project.participants || []
    )

    const { data: session } = useSession()
    const { toast } = useToast()

    const handleAddParticipant = async (newParticipantEmail: string) => {
        if (participants.some((p) => p.name === newParticipantEmail)) {
            toast({
                title: 'Déjà un participant',
                description: `Vous êtes déjà un participant de ce projet.`,
                variant: 'destructive',
            })
            return
        }
        const newParticipant: Participant = {
            name: newParticipantEmail,
            role: 'participant',
        }

        const result = await createInteraction({
            time: new Date().toString(),
            userId: newParticipant.name,
            userAvatar:
                'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/279.jpg',
            type: 'join',
            join: {
                projectId: project._id,
                projectName: project.title,
                projectAvatar: project.media,
                projectOwner:
                    participants.find((p) => p.role === 'author')?.name ?? '',
            },
            to: participants.find((p) => p.role === 'author')?.name ?? '',
            read: false,
        } as Interaction)
        if (result) {
            setParticipants([
                ...participants,
                {
                    name: newParticipantEmail,
                    role: 'Pending',
                },
            ])
            toast({
                title: 'Demande envoyée',
                description: `Vous avez demandé à rejoindre le projet avec succès.`,
                variant: 'success',
            })
        } else {
            toast({
                variant: 'destructive',
                title: 'Échec de la mise à jour des participants',
                description: "Une erreur s'est produite. Veuillez réessayer.",
            })
        }
    }

    return (
        <div className=''>
            <div>
                <div className='p-5'>
                    <div className='flex flex-col'>

                        <div className='flex flex-row gap-2 justify-between items-center'>
                            <div className='flex flex-row gap-2 items-center'>
                                <Img
                                    src={
                                        project.media ??
                                        'https://res.cloudinary.com/dekbkndn8/image/upload/v1715719366/samples/balloons.jpg'
                                    }
                                    alt={project.title + 'Image'}
                                    width={64}
                                    height={64}
                                    className='w-16 h-16 object-cover rounded-lg'
                                />
                                <div className='flex flex-col'>
                                    <div className='text-3xl font-medium text-black'>
                                        {project.title}
                                    </div>
                                    {participants.find(
                                        (p) => p.role === 'author'
                                    ) && (
                                        <div className='text-s text-gray-500'>
                                            {
                                                participants.find(
                                                    (p) => p.role === 'author'
                                                )?.name
                                            }
                                        </div>
                                    )}
                                    
                                </div>
                                
                            </div>
                            {session?.user?.email && (
                                <div className='ml-auto sm:flex hidden'>
                                    <Button
                                        onClick={() =>
                                            handleAddParticipant(
                                                session?.user?.email ?? ''
                                            )
                                        }
                                        className='text-lg font-normal text-white p-2 rounded'
                                    >
                                        Rejoindre le projet !
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className='sm:hidden py-5'>
                                    <Button
                                        onClick={() =>
                                            handleAddParticipant(
                                                session?.user?.email ?? ''
                                            )
                                        }
                                        className='text-lg font-normal text-white p-2 rounded'
                                    >
                                        Rejoindre le projet !
                                    </Button>
                                </div>
                        <div className='flex flex-col pt-5'>
                            <div className='text-xl font-medium text-black'>
                                Description
                            </div>
                            <div className='text-s text-zinc-600 flex flex-wrap overflow-hidden'>
                                {project.description}
                            </div>
                        </div>
                        <div className='flex flex-col pt-5'>
                            <div className='text-xl font-medium text-black'>
                                Participants
                            </div>
                            <div className='flex flex-wrap gap-4'>
                                {participants.map((participant) => (
                                    <ProfileCard
                                        key={participant.name}
                                        email={participant.name}
                                        role={participant.role}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col pt-5'>
                            <div className='text-xl font-medium text-black'>
                                Themes
                            </div>
                            <div className='text-s text-zinc-600'>
                                {project.themes?.join(', ')}
                            </div>
                        </div>
                        <div className='flex flex-col pt-5 '>
                            <div className='text-xl font-medium text-black'>
                                Posts
                            </div>
                            <div className='flex flex-wrap m-0 p-0 list-none'>
                                {posts.length > 0 ? (
                                    posts.map((post) => (
                                        <div className='sm:w-2/3 py-2' key={post._id}>
                                            <PostCard post={post} />
                                        </div>
                                    ))
                                ) : (
                                    <div>No posts found for this project.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
