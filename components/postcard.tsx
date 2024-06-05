import React from 'react'
import Img from 'next/image'
import { MessageSquare, Rocket, ThumbsUp } from 'lucide-react'
import { Post } from '@/types/tables'
import Link from 'next/link'

interface PostProps {
    post: Post
}

export default function PostCard({ post }: Readonly<PostProps>) {
    function getTimeSincePosted(time: Date) {
        if (!time) return 'Il y a un certain temps'
        time = new Date(time)
        const currentTime = new Date()
        const diff = currentTime.getTime() - time.getTime()

        const years = Math.floor(diff / 1000 / 60 / 60 / 24 / 365)
        const months = Math.floor(diff / 1000 / 60 / 60 / 24 / 30)
        const days = Math.floor(diff / 1000 / 60 / 60 / 24)
        const hours = Math.floor(diff / 1000 / 60 / 60)
        const minutes = Math.floor(diff / 1000 / 60)
        const seconds = Math.floor(diff / 1000)

        if (years > 0) return `Il y a ${years} ans`
        if (months > 0) return `Il y a ${months} mois`
        if (days > 0) return `Il y a ${days} jours`
        if (hours > 0) return `Il y a ${hours} heures`
        if (minutes > 0) return `Il y a ${minutes} minutes`
        if (seconds > 0) return `Il y a ${seconds} secondes`
        return 'Il y a un certain temps'
    }

    function handleLikePost(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        const target = e.currentTarget as HTMLElement // Use currentTarget to refer to the element the event handler is attached to
        const elements = target.querySelectorAll('span, svg')

        elements.forEach((element) => {
            if (element.classList.contains('text-blue-500')) {
                element.classList.remove('text-blue-500')
                element.classList.add('text-gray-600')
            } else {
                element.classList.remove('text-gray-600', 'text-red-500', 'text-green-500') // Add other text colors if needed
                element.classList.add('text-blue-500')
            }
        })
    }

    function handleCommentPost(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        const target = e.currentTarget as HTMLElement
        // TODO: Add comment functionality
    }

    return (
        <div className='flex overflow-hidden rounded-xl border border-slate-200 bg-white'>
            <div className='wrapper pt-5 pb-3 px-7 w-full'>
                <div className='header flex items-center  mb-4 space-x-4'>
                    <Img
                        className='rounded-full'
                        src={post.author?.media ?? 'https://loremflickr.com/640/480/nature'}
                        alt='Placeholder image'
                        width={48}
                        height={48}
                        style={{ height: '3.5rem', width: '3.5rem' }}
                    />
                    <div>
                        <Link href={`/${post.author?.email}`}>
                            <p className='text-lg text-gray-900 font-bold hover:text-blue-500'>{post.author?.pseudo ? post.author?.pseudo : post.author?.email}</p>
                        </Link>

                        {/* div align line  */}
                        <div className='flex items-center space-x-2'>
                            <p className='text-sm text-gray-600'>{getTimeSincePosted(post?.time)}</p>
                            <p className='text-sm text-gray-600'>•</p>
                            <Link href={`/${post.author?.email}/${post.project?._id}`}>
                                <p className='text-sm text-gray-600 hover:text-blue-500'>{post.project ? post.project?.title : 'Nom de projet'}</p>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='body space-y-5'>
                    <p className='text-gray-900 mb-0'>{post.content ? post.content : 'Contenu du post'}</p>
                    {post.media && <Img className='w-full h-full object-cover rounded-xl' src={post.media} alt='Placeholder image' width={1280} height={960} />}
                </div>

                <hr className='border-gray-300 mt-5 mb-3' />

                <div className='footer space-y-3'>
                    <div className='icon-group flex justify-between items-center '>
                        <div
                            className='flex space-x-3 px-5 py-3 rounded-xl cursor-pointer duration-200 transition-all hover:bg-slate-100 active:transform active:scale-95 select-none'
                            onClick={handleLikePost}
                        >
                            <ThumbsUp className='text-gray-600' />
                            <span className='text-gray-600 font-semibold'>J'aime</span>
                        </div>
                        <div
                            className='flex space-x-3 px-5 py-3 rounded-xl cursor-pointer duration-200 transition-all hover:bg-slate-100 active:transform active:scale-95 active:text-blue-500 select-none'
                            onClick={handleCommentPost}
                        >
                            <MessageSquare className='text-gray-600' />
                            <span className='text-gray-600 font-semibold'>Commenter</span>
                        </div>
                        <Link
                            className='flex space-x-3 px-5 py-3 rounded-xl cursor-pointer duration-200 transition-all hover:bg-slate-100 active:transform active:scale-95 active:text-blue-500 select-none'
                            href={`${post.author?.email}/${post.project?._id}`}
                        >
                            <Rocket className='text-gray-600' />
                            <span className='text-gray-600 font-semibold'>Visiter</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
