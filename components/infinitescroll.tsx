import React from 'react'
import { cn } from '@/lib/utils'

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    posts?: any
}

export const InfiniteScroll = ({ className, posts }: InfiniteScrollProps) => {
    return (
        <div
            className={cn('flex flex-col items-center', className)}
            style={{ height: '100%', width: '60vw', overflowY: 'scroll' }}
        >
            <ul>{posts}</ul>
        </div>
    )
}
