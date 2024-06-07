import React, { useEffect, useRef, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Lightbulb } from 'lucide-react'
import { Project } from '@/types/tables'
import { getProjects } from '@/lib/data/project'

interface SelectProjectProps {
    onSelectProject: (project: Project) => void
    selectedProject: Project | null
    user: string
}

export default function SelectProject({ onSelectProject, selectedProject, user }: Readonly<SelectProjectProps>) {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const trigger = useRef<HTMLButtonElement>(null)
    const modal = useRef<HTMLDivElement>(null)
    const [projects, setProjects] = useState<Project[]>([])
    // const [projects, setProjects] = useState<Project[] | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await getProjects({
                participants: {
                    $elemMatch: {
                        name: user
                    }
                }
            })
            const data: Project[] = JSON.parse(JSON.stringify(projects))
            setProjects(data)
        }

        fetchProjects()
    }, [user])

    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!modal.current) return
            if (!modalOpen || modal.current.contains(target as Node) || trigger?.current?.contains(target as Node)) return
            setModalOpen(false)
        }

        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    }, [modalOpen])

    useEffect(() => {
        const keyHandler = ({ key }: KeyboardEvent) => {
            if (!modalOpen || key !== 'Escape') return
            setModalOpen(false)
        }

        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    }, [modalOpen])

    const handleSelectItem = (itemName: Project) => {
        onSelectProject(itemName)
        setModalOpen(false)
    }

    const handleAddProject = () => {
        if (!user) {
            redirect('/login')
        } else {
            setModalOpen(false)
        }
    }

    return (
        <>
            <button
                ref={trigger}
                onClick={() => setModalOpen(true)}
                className='overflow-hidden inline-flex items-center justify-center rounded-md py-3 px-4 space-x-2 duration-200 transition-all hover:bg-slate-100 active:transform active:scale-95 select-none'
            >
                <Lightbulb className='h-6 w-6 text-yellow-500' />
                <div className='sm:block hidden text-gray-600 font-semibold text-sm'>{selectedProject ? projects.find((p) => p._id === selectedProject._id)?.title : 'Ajouter un projet'}</div>
            </button>

            <div className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-50 px-4 py-5 ${modalOpen ? 'block' : 'hidden'}`}>
                <div ref={modal} onFocus={() => setModalOpen(true)} className='w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]'>
                    <h3 className='pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl'>Choisi ton projet !</h3>
                    <div className='flex justify-center pb-5 '>
                        <Carousel className={`w-full max-w-sm `}>
                            <CarouselContent className={`${projects?.length === 0 ? 'justify-center' : ''}`}>
                                {projects?.map((project) => (
                                    <CarouselItem key={project._id} onClick={() => handleSelectItem(project)} className='basis-1/3 cursor-pointer '>
                                        <Card>
                                            <CardContent className='flex items-center justify-center p-6 overflow-hidden'>
                                                <span className='text-xl font-semibold'>{project.title}</span>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                                <Link href='/new-project'>
                                    <CarouselItem key='add-new' onClick={handleAddProject} className='basis-1/3 cursor-pointer '>
                                        <Card>
                                            <CardContent className='flex items-center justify-center p-6 px-8 overflow-hidden'>
                                                {user ? <span className='text-xl font-bold'>+</span> : <span className='text-xl font-semibold'>Connecte toi</span>}
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                </Link>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>

                    <div className='-mx-3 flex justify-center'>
                        <div className='w-1/2 px-3'>
                            <button
                                type='button'
                                onClick={() => setModalOpen(false)}
                                className='block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white'
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
