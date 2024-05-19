import InfiniteScroll from './infinitescroll'
import { getPosts } from '@/lib/actions'
import { InputPost } from '@/components/inputpost'
import React from 'react'

export default function Feed() {
    return (
        <div className='flex flex-col w-75 h-full  bg-gray-200 space-y-8'>
            <InputPost />
            <InfiniteScroll fetchFunction={getPosts} />
        </div>
    )
}
