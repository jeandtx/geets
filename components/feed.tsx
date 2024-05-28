import InfiniteScroll from "./infinitescroll";
import { getPosts } from "@/lib/actions";
import { InputPost } from "@/components/inputpost";
import React from "react";

export default function Feed() {
	return (
		<div className="flex h-screen bg-gray-100 md:w-full">
			{/* // <div className="flex h-screen bg-gray-100 md:w-full overflow-hidden"> */}
			<div className="flex flex-col space-y-8 py-5 w-full max-w-[550px]">
				{/* <div className="flex flex-col space-y-8 py-5 w-full max-w-[550px] overflow-auto"> */}
				<InputPost />
				<InfiniteScroll fetchFunction={getPosts} />
			</div>
			<div className="space-y-5 p-5 w-1/8 flex flex-col lg:block hidden">
				<div className="px-3 rounded-xl border border-slate-200 bg-white h-[600px] flex items-center justify-center">
					<div className="min-w-[200px]">Right side</div>
				</div>
				<div className="px-3 rounded-xl border border-slate-200 bg-white h-[600px] flex items-center justify-center">
					<div className="min-w-[200px]">Right side</div>
				</div>
			</div>
		</div>
	);
}
