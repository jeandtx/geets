"use client";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import PostCard from "@/components/postcard";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./ui/spinner";
import { useUserInfo } from "@/app/context/UserInfoContext";
import Link from "next/link";
import { getPosts, getFriendsPost } from "@/lib/data/post";

interface InfiniteScrollProps {
	className?: string;
	sort: "recent" | "popular" | "suivi";
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
	className,
	sort,
}) => {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [posts, setPosts] = useState<any[]>([]);
	const [page, setPage] = useState(1);
	const userInfo = useUserInfo();

	useEffect(() => {
		const fetchPosts = async () => {
			let newPosts;
			if (sort === 'suivi' && userInfo?.userInfo?.email) {
				newPosts = await getFriendsPost(userInfo.userInfo.email, page, 'recent');
			} else {
				newPosts = await getPosts(page, {}, sort);
			}
			setPage((prevPage) => prevPage + 1);
			setPosts((prevPosts) => [...prevPosts, ...newPosts]);
		};
		fetchPosts();
	}, [inView, sort, userInfo?.userInfo?.email]);

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
					<div
						className="flex justify-center items-center"
						style={{ height: "100px" }}
						ref={ref}
					>
						<LoadingSpinner />
					</div>
				</div>
			)}
		</div>
	);
}

export default InfiniteScroll;
