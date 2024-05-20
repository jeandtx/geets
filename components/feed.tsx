import InfiniteScroll from './infinitescroll'
import { getPosts } from '@/lib/actions'
import { InputPost } from '@/components/inputpost'
import React from 'react'

export default function Feed() {
    return (
        <div className='flex-col max-w-xl h-full space-y-8 py-4'>
            <InputPost />
            <InfiniteScroll fetchFunction={getPosts} />
        </div>
    )
}
