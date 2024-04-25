import { Sidebar } from '@/components/sidebar'
import { InfiniteScroll } from '@/components/infinitescroll'

export default async function Home() {
    return (
        <main className="flex min-h-screen items-center">
            <Sidebar />
            <InfiniteScroll />
        </main>
    )
}
