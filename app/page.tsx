import { InfiniteScroll } from "@/components/infinitescroll";

export default async function Home() {
	return (
		<div className="flex w-full h-full bg-gray-200 ">
			<InfiniteScroll className="bg-gray-200" />
			<div className="h-full bg-red-500 w-1/5">aaa</div>
		</div>
	);
}
