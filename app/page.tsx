import { Sidebar } from '@/components/sidebar'
import InfiniteScroll from '@/components/infinitescroll'
import { getPosts } from '@/lib/actions'

export default async function Home() {
    return (
        <main className='flex flex-col w-full h-screen bg-gray-200'>
            <div className='w-full h-12 bg-blue-200 flex justify-center items-center'>top bar</div>
            <div className='flex w-full h-full bg-gray-200 overflow-hidden'>
                <Sidebar className='w-1/5 bg-gray-200' />
                <div className='flex justify-evenly items-center w-4/5'>
                    <InfiniteScroll fetchFunction={getPosts} />
                </div>
            </div>
        </main>
    )
}
