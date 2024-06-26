'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useToast } from './ui/use-toast'
import { CldUploadWidget } from 'next-cloudinary'
import { Project } from '../types/tables'
import { Image } from 'lucide-react'
import { useUserInfo } from '@/app/context/UserInfoContext'

import CreatePost from './createPost'
import SelectProject from './select-project'
import Img from 'next/image'

export interface InputPostProps {
    className?: string
}

export function InputPost({ className }: Readonly<InputPostProps>) {
    const { data: session } = useSession()
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [imageName, setImageName] = useState<string>('Ajouter une photo')
    const { toast } = useToast()
    const { userInfo } = useUserInfo()

    const [showModal, setShowModal] = useState(false)

    const DEFAULT_USER_IMAGE =
        'https://res.cloudinary.com/dekbkndn8/image/upload/v1715719366/samples/balloons.jpg'

    const handleSelectProject = (project: Project | null) => {
        if (!session) {
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

    function handleOpenModal() {
        if (!session) {
            toast({
                variant: 'destructive',
                title: 'Pas authentifié',
                description: 'Veuillez vous connecter pour créer un poste.',
            })
            return
        }
        setShowModal(true)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowModal(false)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className={className}>
            <div className='flex flex-col gap-5 p-5 rounded-xl custom-border bg-white'>
                <div className='flex gap-2'>
                    <Img
                        className='rounded-full'
                        src={userInfo?.media || DEFAULT_USER_IMAGE}
                        alt='Placeholder image'
                        width={48}
                        height={48}
                        style={{ height: '3.5rem', width: '3.5rem' }}
                    />
                    <button
                        onClick={handleOpenModal}
                        className='bg-stone-50 w-full px-5 py-4 rounded-full text-left text-gray-600 font-semibold text-sm border duration-300 animation-all hover:bg-stone-100'
                    >
                        Créer un post
                    </button>
                    <CreatePost
                        userInfo={userInfo}
                        visible={showModal}
                        setVisible={setShowModal}
                    />
                </div>

                <div className='flex flex-row items-start spacy-x-5'>
                    <SelectProject
                        onSelectProject={handleSelectProject}
                        selectedProject={selectedProject}
                        user={session?.user?.email ?? ''}
                    />
                    <CldUploadWidget
                        uploadPreset='onrkam98'
                        onSuccess={(result) => {
                            setImageName((result as any).info.original_filename)
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
            </div>
        </div>
    )
}
