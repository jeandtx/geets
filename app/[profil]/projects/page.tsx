import { Metadata } from 'next'
import { auth } from '@/app/auth'
import { getProjects } from '@/lib/data/project'
import Link from 'next/link'
import { Project } from '@/types/tables'

export const metadata: Metadata = {
    title: 'All Projects',
}

export default async function ProjectsPage() {
    const session = await auth()
    const userEmail = session?.user?.email
    if (!userEmail) {
        return <div>Veuillez vous connecter pour voir vos projets.</div>
    }
    const projects: Project[] = await getProjects({
        participants: {
            $elemMatch: {
                name: userEmail,
            },
        },
    })

    const projectList = projects
        .filter((project) => project.title && project.description !== null)
        .map((project) => (
            <div
                key={project._id.toString()}
                className='w-[300px] bg-black-400 rounded-lg shadow-md m-2 p-2 text-center'
            >
                <div>
                    <div className='text-xl font-bold'>
                        <Link
                            href={`/${encodeURIComponent(
                                userEmail
                            )}/${encodeURIComponent(project._id.toString())}`}
                        >
                            {project.title}
                        </Link>
                    </div>
                    <div>Description: {project.description}</div>
                    <div>Participants: &quot;to update&quot;</div>
                    <div>
                        Themes:{' '}
                        {project.themes
                            ? project.themes.join(', ')
                            : 'Aucune thème'}
                    </div>
                </div>
            </div>
        ))

    return (
        <div className='py-8'>
            <div className='title text-center text-3xl font-bold mb-16'>
                Tous vos projets
            </div>
            <div className='flex flex-wrap justify-center m-0 p-0 list-none'>
                {projectList}
            </div>
        </div>
    )
}
