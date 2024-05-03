import { Sidebar } from "@/components/sidebar";
import { InfiniteScroll } from "@/components/infinitescroll";

export default async function Home() {
	return (
		<main className="flex flex-col w-full h-screen bg-gray-200">
			<div className="flex w-full h-full bg-gray-200 overflow-hidden">
				<Sidebar className="w-1/5 bg-gray-200" />
				<div className="flex justify-evenly items-center w-4/5">
					<InfiniteScroll className="bg-gray-200" />
					<div className="h-full bg-red-500 w-1/5">aaa</div>
				</div>
			</div>
		</main>
	);
}