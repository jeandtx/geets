import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useToast } from './ui/use-toast'

import { createPost } from '@/lib/data/post'

import { User, Post, Project } from '@/types/tables'
import { CldUploadWidget } from 'next-cloudinary'
import { Image, Send } from 'lucide-react'

import SelectProject from './select-project'
import Img from 'next/image'

interface createPostProps {
    userInfo: User | null
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreatePost({ userInfo, setVisible }: createPostProps) {
    const DEFAULT_USER_IMAGE = 'https://res.cloudinary.com/dekbkndn8/image/upload/v1715719366/samples/balloons.jpg'

    const { data: session } = useSession()
    const { toast } = useToast()

    const [content, setContent] = useState<string>('')
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [imageName, setImageName] = useState<string>('Ajouter une photo')

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const isDescriptionValid = content.trim() !== ''
        const isProjectSelected = selectedProject !== null

        if (!isDescriptionValid || !isProjectSelected) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'Please provide a description and select a project.'
            })
            return
        }

        if (!session?.user?.email) {
            toast({
                variant: 'destructive',
                title: 'Not authenticated',
                description: 'Please log in to submit a post.'
            })
            return
        }

        const userMedia = userInfo?.media || DEFAULT_USER_IMAGE

        const post: Post = {
            _id: '',
            project: {
                _id: selectedProject._id,
                title: selectedProject.title
            },
            content: content,
            time: new Date(),
            author: {
                _id: '',
                pseudo: session.user.name ?? '',
                email: session.user.email,
                media: userMedia
            },
            media: imageUrl ?? undefined,
            labels: []
        }

        await createPost(post)
            .then(() => {
                toast({
                    variant: 'success',
                    title: 'Post submitted successfully',
                    description: 'Your post has been successfully submitted.'
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
                    title: 'Uh oh! Something went wrong.',
                    description: error.message
                })
            })
    }

    const handleSelectProject = (project: Project | null) => {
        if (!session) {
            toast({
                variant: 'destructive',
                title: 'Not authenticated',
                description: 'Please log in to select a project.'
            })
            return
        }
        setSelectedProject(project)
    }

    return (
        <div className='flex flex-col space-y-4 p-5'>
            <div className='header flex flex-row items-center space-x-5'>
                <Img src={userInfo?.media || DEFAULT_USER_IMAGE} alt='User profile picture' className='rounded-full' width={48} height={48} style={{ height: '3.5rem', width: '3.5rem' }} />
                <span className='font-semibold' onClick={() => console.log(userInfo)}>
                    {userInfo?.email || 'hardcodedemail@hardcode.test'}
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
                    <SelectProject onSelectProject={handleSelectProject} selectedProject={selectedProject} user={session?.user?.email ?? ''} />

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
                                    className='overflow-hidden inline-flex items-center justify-center rounded-md py-3 px-4 space-x-2 duration-200 transition-all hover:bg-slate-100 active:transform active:scale-95 select-none'
                                    onClick={() => open()}
                                >
                                    <Image className='h-6 w-6 text-blue-500' />
                                    <div className='sm:block hidden text-gray-600 font-semibold text-sm'>{imageName}</div>
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
                    <div className='sm:block hidden text-gray-600 font-semibold text-sm'>Envoyer</div>
                </button>
            </div>
        </div>
    )
}
