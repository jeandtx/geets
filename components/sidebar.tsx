import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import {
    List,
    BookHeart,
    CircleUser,
    SquarePlus,
    BellRing,
} from 'lucide-react'
import Link from 'next/link'
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    email: string
}

export async function Sidebar({ className, email }: Readonly<SidebarProps>) {
    return (
        <div className={cn(' sm:block hidden', className)}>
            <div className='px-3 py-2 rounded-xl custom-border bg-white min-w-[200px]'>
                <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
                    Navigation
                </h2>
                <div className='flex flex-col space-y-1'>
                    <Link href={'/'}>
                        <Button
                            variant='ghost'
                            className='justify-start w-full'
                        >
                            <BookHeart className='mr-2 h-4 w-4' />
                            Pour toi
                        </Button>
                    </Link>
                    <Link href={`/new-project`}>
                        <Button
                            variant='ghost'
                            className='justify-start w-full'
                        >
                            <SquarePlus className='mr-2 h-4 w-4' />
                            Créer un projet
                        </Button>
                    </Link>
                    <Link href={`/${email}/projects`}>
                        <Button
                            variant='ghost'
                            className='justify-start w-full'
                        >
                            <List className='mr-2 h-4 w-4' />
                            Mes projets
                        </Button>
                    </Link>
                    <Link href={`/notifications`}>
                        <Button
                            variant='ghost'
                            className='justify-start w-full'
                        >
                            <BellRing className='mr-2 h-4 w-4' />
                            Notifications
                        </Button>
                    </Link>
                    <Link href={`/${email}`}>
                        <Button
                            variant='ghost'
                            className='justify-start w-full'
                        >
                            <CircleUser className='mr-2 h-4 w-4' />
                            Compte
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
