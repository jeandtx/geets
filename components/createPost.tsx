import React, { useState } from 'react'
import { useToast } from './ui/use-toast'

import { createPost } from '@/lib/data/post'

import { User, Post, Project } from '@/types/tables'
import { CldUploadWidget } from 'next-cloudinary'
import { Image, Send } from 'lucide-react'

import SelectProject from './select-project'
import Img from 'next/image'
import Modal from './modal'

interface CreatePostProps {
    userInfo: User | null
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreatePost({
    userInfo,
    visible,
    setVisible,
}: Readonly<CreatePostProps>) {
    const DEFAULT_USER_IMAGE =
        'https://res.cloudinary.com/dekbkndn8/image/upload/v1715719366/samples/balloons.jpg'

    const { toast } = useToast()

    const [content, setContent] = useState<string>('')
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [imageName, setImageName] = useState<string>('Ajouter une photo')

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
        e
    ) => {
        e.preventDefault()
        const isDescriptionValid = content.trim() !== ''
        const isProjectSelected = selectedProject !== null

        if (!isDescriptionValid || !isProjectSelected) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Un problème est survenu',
                description:
                    'Veuillez fournir une description et sélectionner un projet.',
            })
            return
        }

        if (!userInfo?.email) {
            toast({
                variant: 'destructive',
                title: 'Pas authentifié',
                description: 'Veuillez vous connecter pour soumettre un post.',
            })
            return
        }

        const userMedia = userInfo?.media ?? DEFAULT_USER_IMAGE

        const post: Post = {
            _id: '',
            project: {
                _id: selectedProject._id,
                title: selectedProject.title,
            },
            content: content,
            time: new Date(),
            author: {
                _id: '',
                pseudo: userInfo.pseudo ?? '',
                email: userInfo.email,
                media: userMedia,
            },
            media: imageUrl ?? undefined,
            labels: [],
            score: 1,
        }

        await createPost(post)
            .then(() => {
                toast({
                    variant: 'success',
                    title: 'Succès',
                    description: 'Votre poste a été soumis avec succès.',
                })
                setContent('')
                setSelectedProject(null)
                setImageUrl(null)
                setImageName('Ajouter une photo')
                setVisible(false)
            })
            .catch((error) => {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Un problème est survenu',
                    description: error.message,
                })
            })
        return
    }

    const handleSelectProject = (project: Project | null) => {
        if (!userInfo) {
            toast({
                variant: 'destructive',
                title: 'Pas authentifié',
                description:
                    'Veuillez vous connecter pour sélectionner un projet.',
            })
            return
        }
        setSelectedProject(project)
    }

    return (
        <Modal visible={visible} setVisible={setVisible} className='w-1/2'>
            <div className='flex flex-col space-y-4 p-5'>
                <div className='header flex flex-row items-center space-x-5'>
                    <Img
                        src={userInfo?.media ?? DEFAULT_USER_IMAGE}
                        alt='User profile picture'
                        className='rounded-full'
                        width={48}
                        height={48}
                        style={{ height: '3.5rem', width: '3.5rem' }}
                    />
                    <span
                        className='font-semibold'
                        onClick={() => console.log(userInfo)}
                    >
                        {userInfo?.email ?? 'hardcodedemail@hardcode.test'}
                    </span>
                </div>

                <div className='header flex flex-row items-center space-x-5'>
                    <textarea
                        className='w-full h-80 py-3 bg-transparent border-none outline-none p-0 m-0 resize-none text-lg'
                        placeholder='Que voulez-vous partager ?'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className='footer flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-start'>
                        <SelectProject
                            onSelectProject={handleSelectProject}
                            selectedProject={selectedProject}
                            user={userInfo?.email ?? ''}
                        />

                        <CldUploadWidget
                            uploadPreset='onrkam98'
                            onSuccess={(result) => {
                                setImageUrl((result as any).info.secure_url)
                                setImageName(
                                    (result as any).info.original_filename
                                )
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <button
                                        className='overflow-hidden inline-flex items-center justify-center rounded-md py-3 px-4 space-x-2 duration-200 transition-all hover:bg-slate-100 active:transform active:scale-95 select-none'
                                        onClick={() => open()}
                                    >
                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                        <Image className='h-6 w-6 text-blue-500' />
                                        <div className='sm:block hidden text-gray-600 font-semibold text-sm'>
                                            {imageName}
                                        </div>
                                    </button>
                                )
                            }}
                        </CldUploadWidget>
                    </div>

                    <button
                        className='overflow-hidden inline-flex items-center bg-transparent justify-center rounded-md py-3 px-4 space-x-2 duration-200 transition-all hover:bg-slate-100 active:transform active:scale-95 select-none'
                        onClick={handleSubmit}
                    >
                        <Send className='h-6 w-6 text-green-500' />
                        <div className='sm:block hidden text-gray-600 font-semibold text-sm'>
                            Envoyer
                        </div>
                    </button>
                </div>
            </div>
        </Modal>
    )
}
