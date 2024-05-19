'use client'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { SquareKanban, FlaskConical, BookHeart, PersonStanding, EarthLock, SunMoon, UserRoundCog, Languages, BellMinus, SquareMousePointer } from 'lucide-react'
import Link from 'next/link'
import { NavigationMenuDemo } from './navigation-menu'
import { useSession } from 'next-auth/react'
import { getProjects } from '@/lib/actions'
import { useEffect, useState } from 'react'
import { Project } from '@/types/tables'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const projects = ['Matchical', 'Musimatch', 'MatchMelody', 'Rhythmatch', 'Harmonimatch', 'MatchTune', 'Melodimatch', 'Symphomatch', 'Beatmatch', 'MatchNote']

export function Sidebar({ className }: SidebarProps) {
    const session = useSession()
    const [projects, setProjects] = useState<Project[] | null>(null)
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        const fetchProjects = async () => {
            if (email !== '' && projects === null) {
                const projects = await getProjects(email)
                const data: Project[] = JSON.parse(JSON.stringify(projects))
                setProjects(data)
            }
        }
        if (session.data?.user?.email) {
            setEmail(session.data?.user?.email)
        }
        fetchProjects()
    }, [session, email, projects])

    return (
        <>
            <NavigationMenuDemo className='top-4 left-4 z-50 md:hidden block' />
            <div className={cn('pb-12  md:block hidden', className)}>
                <div className='flex flex-col w-full h-full space-y-4 py-4 px-4 items-end'>
                    <div className='px-3 py-2 rounded-xl border border-slate-200 bg-white'>
                        <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Navigate</h2>
                        <div className='flex flex-col space-y-1'>
                            <Link href={'/'}>
                                <Button variant='ghost' className='justify-start'>
                                    <BookHeart className='mr-2 h-4 w-4' />
                                    For You
                                </Button>
                            </Link>
                            <Link href={'/testing'}>
                                <Button variant='ghost' className='justify-start'>
                                    <FlaskConical className='mr-2 h-4 w-4' />
                                    Testing Page
                                </Button>
                            </Link>
                            <Link href={`/${session.data?.user?.email}`}>
                                <Button variant='ghost' className='justify-start'>
                                    <PersonStanding className='mr-2 h-4 w-4' />
                                    Profil
                                </Button>
                            </Link>
                            <Link href={`/new-project`}>
                                <Button variant='ghost' className='justify-start'>
                                    <SquareMousePointer className='mr-2 h-4 w-4' />
                                    Write Project
                                </Button>
                            </Link>
                            <Link href={`/${email}/projects`}>
                                <Button variant='ghost' className='justify-start'>
                                    <SquareKanban className='mr-2 h-4 w-4' />
                                    My Projects
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className='py-2'>
                        <h2 className='relative px-7 text-lg font-semibold tracking-tight'>Your Projects</h2>
                        <ScrollArea className='h-[300px] px-1'>
                            <div className='space-y-1 p-2'>
                                {projects?.map((project) => (
                                    <Link key={`${project._id}`} href={`/${email}/${project._id}`}>
                                        <Button variant='ghost' className='w-full justify-start font-normal'>
                                            <SquareKanban className='mr-2 h-4 w-4' />
                                            {project.title}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </>
    )
}
