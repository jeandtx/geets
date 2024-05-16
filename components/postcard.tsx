import React from 'react'
import Img from 'next/image'
import { MessageSquare, Rocket, ThumbsUp } from 'lucide-react'

interface PostProps {
    post: any
}

function getUserById(userId: string) {
    return {
        _id: 'not_found',
        age: 'not_found',
        email: 'not_found',
        Media: 'https://loremflickr.com/640/480/nature',
        pseudo: 'not_found',
        Rating: 0,
        UserId: 0,
        location: 'not_found',
    }
}

export default function PostCard({ post }: PostProps) {
    const user = getUserById(post.userId)

    // TODO - Make sure the time is a Date object (currently a string)
    function getTimeSincePosted(time: Date) {
        if (!time) return 'Il y a un certain temps'

        time = new Date(time) // TODO - Remove this line when the time is a Date object
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

    function handleLikePost() {
        console.log('Like post')
    }

    function handleCommentPost() {
        console.log('Comment post')
    }

    function handleJoinPost() {
        console.log('Join post')
    }

    return (
        <div className='flex max-w-xl rounded-xl overflow-hidden border-2 border-slate-400 bg-white'>
            <div className='wrapper py-7'>
                <div className='header px-10 flex items-center  mb-4 space-x-4'>
                    <Img
                        className='rounded-full'
                        src={
                            user
                                ? user.Media
                                : 'https://loremflickr.com/640/480/nature'
                        }
                        alt='Placeholder image'
                        width={48}
                        height={48}
                        style={{ height: '3.5rem', width: '3.5rem' }}
                    />
                    <div>
                        <p className='text-lg text-gray-900 font-bold'>
                            {user ? user.pseudo : 'user pseudo'}
                        </p>
                        <p className='text-sm text-gray-600'>
                            {getTimeSincePosted(post?.time)} •{' '}
                            {post.title ? post.title : 'Nom de projet'}
                        </p>
                    </div>
                </div>

                <div className='body px-10 space-y-5'>
                    <p className='text-gray-900 mb-0'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                    <Img
                        className='w-full h-full object-cover rounded-xl'
                        src={
                            post.media
                                ? post.media
                                : 'https://loremflickr.com/640/480/nature'
                        }
                        alt='Placeholder image'
                        width={1280}
                        height={960}
                    />
                </div>

                <hr className='border-gray-300 my-5' />

                <div className='footer px-10 space-y-5'>
                    <div className='icon-group flex justify-between items-center px-20'>
                        <ThumbsUp onClick={handleLikePost} />
                        <MessageSquare onClick={handleCommentPost} />
                        <Rocket onClick={handleJoinPost} />
                    </div>
                </div>
            </div>
        </div>
    )
}
