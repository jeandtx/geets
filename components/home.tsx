import InfiniteScroll from "./infinitescroll";
import { getPosts } from "@/lib/data/post";
import { InputPost } from "@/components/inputpost";
import React from "react";
import SearchComponent from "./searchBar";
import { UpperBar } from "./upper-bar";
export default function Home() {
	return (
		<div className="flex h-screen bg-gray-100 sm:w-full">
			<div className="flex flex-col  w-full">
				<div className="sm:hidden mb-2">
				<SearchComponent/>
				</div>
				<div className="flex flex-col space-y-4 ">
				<UpperBar />
				</div>
			</div>
			<div className="sm:block w-0 sm:w-1/4 sm:min-w-48 space-y-5 sm:pl-5 flex flex-col ">
				<div className="hidden lg:block px-3 rounded-xl border border-slate-200 bg-white h-[300px] items-start pt-4	 justify-center">
					<div className=""><SearchComponent/></div>
				</div>
				<div className="hidden lg:block px-3 rounded-xl border border-slate-200 bg-white h-[600px] items-center justify-center">
					<div className="">Right side</div>
				</div>
			</div>
		</div>
	);
}
