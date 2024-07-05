"use client";
import {getFriendsPost} from "@/lib/data/post";


export default function TestingPage({ data }: any) {
	const test = getFriendsPost("cleophas.fournier@gmail.com");
	// console.log(test);
	return (
		<div className="p-2 ">
			
		</div>
	);
}
