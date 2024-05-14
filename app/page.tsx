
import { Sidebar } from '@/components/sidebar'
import InfiniteScroll from '@/components/infinitescroll'
import { getPosts } from '@/lib/actions'

export default async function Home() {
	return (
		<div className="flex w-full h-full bg-gray-200 ">
			<InfiniteScroll fetchFunction={getPosts} />
			<div className="h-full bg-red-500 w-1/5">aaa</div>
		</div>
	);
}
