import InfiniteScroll from "./infinitescroll";
import { getPosts } from "@/lib/actions";
import { InputPost } from "@/components/inputpost";
import React from "react";

export default function Feed() {
	return (
		<div className="flex h-screen w-3/4 justify-center items-center bg-gray-100 ">
			<div className="flex-col max-w-xl h-full space-y-8 py-5 overflow-y-auto">
				<InputPost />
				<InfiniteScroll fetchFunction={getPosts} />
			</div>
			<div className="fixed top-5 right-5 w-1/8 bg-gray-200 justify-center items-center lg:block hidden">
				<div className="px-3 py-2 rounded-xl border border-slate-200 bg-white min-w-[200px] h-[600px] flex items-center justify-center">
					Right side{" "}
				</div>
			</div>
		</div>
	);
}
