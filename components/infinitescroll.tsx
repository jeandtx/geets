"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

import PostCard from "@/components/postcard";
import React from "react";

interface InfiniteScrollProps {
	/**
	 * Additional class name(s) for the component.
	 */
	className?: string;

	/**
	 * The function used to fetch data. Triggered when the user scrolls to the bottom of the page.
	 * @param params Optional parameters for the fetch function.
	 * @returns The result of the fetch function.
	 */
	fetchFunction: (page: number) => Promise<any>;
}

export default function InfiniteScroll({
	className,
	fetchFunction,
}: Readonly<InfiniteScrollProps>) {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [posts, setPosts] = React.useState<any>([]);
	const [page, setPage] = React.useState(1);

	React.useEffect(() => {
		if (!inView) return;
		const fetchPosts = async () => {
			const newPosts = await fetchFunction(page);
			console.log(page, newPosts);
			setPage((prevPage: number) => prevPage + 1);
			setPosts((prevPosts: any) => [...prevPosts, ...newPosts]);
		};
		fetchPosts();
	}, [inView]);

	return (
		<div
			className={cn("flex flex-col w-full items-center", className)}
			style={{ height: "100%" }}
		>
			<ul className="space-y-4">
				{posts.map((post: any) => (
					<PostCard key={post._id} post={post} />
				))}
			</ul>
			<div ref={ref}>Loading...</div>
		</div>
	);
}
