'use client'

import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

import SideProjectCard from '@/components/project_card'
import React from 'react'

interface InfiniteScrollProps {
    /**
     * Additional class name(s) for the component.
     */
    className?: string

    /**
     * The function used to fetch data. Triggered when the user scrolls to the bottom of the page.
     * @param params Optional parameters for the fetch function.
     * @returns The result of the fetch function.
     */
    fetchFunction: (params?: any) => any
}

export default function InfiniteScroll({ className, fetchFunction }: InfiniteScrollProps) {
    const { ref, inView } = useInView({
        threshold: 0,
    })
    const [posts, setPosts] = React.useState<any>([])

    React.useEffect(() => {
        if (inView) {
            if (inView) {
                fetchFunction()
                    .then((data: any) => {
                        setPosts((prev: any) => [...prev, ...data])
                    })
                    .catch((error: any) => {
                        console.error(error)
                    })
            }
        }
    }, [inView])

    return (
        <div className={cn('flex flex-col items-center', className)} style={{ height: '100%', width: '60vw', overflowY: 'scroll' }}>
            <ul>
                {posts.map((post: any) => (
                    <SideProjectCard key={post._id} post={post} />
                ))}
            </ul>
            <div ref={ref}>Loading...</div>
        </div>
    )
}
