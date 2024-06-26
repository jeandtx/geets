'use client'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { SquareKanban } from 'lucide-react'
import Link from 'next/link'
import { getProjects } from '@/lib/data/project'
import { useEffect, useState } from 'react'
import { Project } from '@/types/tables'
import { SlidingTextButton } from './slidingTextButton'

interface ProjectsProps extends React.HTMLAttributes<HTMLDivElement> {
    email: string
}

export function Projects({ className, email }: Readonly<ProjectsProps>) {
    const [projects, setProjects] = useState<Project[] | null>(null)

    useEffect(() => {
        const fetchProjects = async () => {
            if (email !== '' && projects === null) {
                const projects = await getProjects({
                    participants: {
                        $elemMatch: {
                            name: email,
                        },
                    },
                })
                const data: Project[] = JSON.parse(JSON.stringify(projects))
                setProjects(data)
            }
        }
        fetchProjects()
    }, [projects, email])

    return (
        <div className={cn('', className)}>
            <div className='px-3 py-2 rounded-xl custom-border bg-white w-[200px]'>
                <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
                    Mes projets
                </h2>
                <div className='flex flex-col space-y-1 w-full truncate'>
                    <Link key={`098765`} href={`/098765/098765`}>
                        <SlidingTextButton
                            text={
                                'This is the long text that will slide when hovered over. This is the long text that will slide when hovered over.'
                            }
                        />
                    </Link>
                    <Link key={'098768'} href={`/098765/098765`}>
                        <SlidingTextButton text={'Short text.'} />
                    </Link>
                    {projects?.map((project) => (
                        <Link
                            key={`${project._id}`}
                            href={`/${email}/${project._id}`}
                        >
                            <Button
                                variant='ghost'
                                className='w-full justify-start font-normal'
                            >
                                <SquareKanban className='mr-2 h-4 w-4' />
                                {project.title}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
