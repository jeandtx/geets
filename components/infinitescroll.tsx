"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

import PostCard from "@/components/postcard";
import React from "react";
import LoadingSpinner from "./ui/spinner";
import { useUserInfo } from "@/app/context/UserInfoContext";
import Link from "next/link";

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
	const userInfo = useUserInfo();
	React.useEffect(() => {
		// const fetchPosts = async () => {
		// 	const newPosts = await fetchFunction(1);
		// 	setPage((prevPage: number) => prevPage + 1);
		// 	setPosts((prevPosts: any) => [...prevPosts, ...newPosts]);
		// };
		// fetchPosts();
		console.log(userInfo);
	}, []);

	React.useEffect(() => {
		if (!inView) return;
		const fetchPosts = async () => {
			const newPosts = await fetchFunction(page);
			setPage((prevPage: number) => prevPage + 1);
			setPosts((prevPosts: any) => [...prevPosts, ...newPosts]);
		};
		fetchPosts();
	}, [inView]);

	return (
		<div
			className={cn("flex flex-col w-full", className)}
			style={{ height: "100%" }}
		>
			{userInfo?.status === "authenticated" ? (
				<>
					<ul className="space-y-4">
						{posts.map((post: any) => (
							<PostCard key={post._id} post={post} />
						))}
					</ul>
					<div
						className="flex justify-center items-center"
						style={{ height: "100px" }}
						ref={ref}
					>
						<LoadingSpinner />
					</div>
				</>
			) : (
				<div className="flex flex-col space-y-4 items-center justify-center w-full h-full b-4">
					{posts.slice(0, 1).map((post: any) => (
						<PostCard
							key={post._id}
							post={post}
							connected={false}
						/>
					))}
					<p className="text-center text-lg text-gray-500">
						<Link href="/login" className="text-blue-500">
							Connectez-vous
						</Link>{" "}
						pour plus de publications
					</p>
				</div>
			)}
		</div>
	);
}
