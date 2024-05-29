import React from "react";
import Img from "next/image";
import { MessageSquare, Rocket, ThumbsUp } from "lucide-react";
import { Post } from "@/types/tables";
import Link from "next/link";

interface PostProps {
	post: Post;
}

export default function PostCard({ post }: Readonly<PostProps>) {
	function getTimeSincePosted(time: Date) {
		if (!time) return "Il y a un certain temps";
		time = new Date(time);
		const currentTime = new Date();
		const diff = currentTime.getTime() - time.getTime();

		const years = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
		const months = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
		const days = Math.floor(diff / 1000 / 60 / 60 / 24);
		const hours = Math.floor(diff / 1000 / 60 / 60);
		const minutes = Math.floor(diff / 1000 / 60);
		const seconds = Math.floor(diff / 1000);

		if (years > 0) return `Il y a ${years} ans`;
		if (months > 0) return `Il y a ${months} mois`;
		if (days > 0) return `Il y a ${days} jours`;
		if (hours > 0) return `Il y a ${hours} heures`;
		if (minutes > 0) return `Il y a ${minutes} minutes`;
		if (seconds > 0) return `Il y a ${seconds} secondes`;
		return "Il y a un certain temps";
	}

	function handleLikePost() {
		console.log("Like post");
	}

	function handleCommentPost() {
		console.log("Comment post");
	}

	return (
		<div className="flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white">
			<div className="wrapper py-7">
				<div className="header px-10 flex items-center  mb-4 space-x-4">
					<Img
						className="rounded-full"
						src={
							post.author?.media ??
							"https://loremflickr.com/640/480/nature"
						}
						alt="Placeholder image"
						width={48}
						height={48}
						style={{ height: "3.5rem", width: "3.5rem" }}
					/>
					<div>
						<Link href={`/${post.author?.email}`}>
							<p className="text-lg text-gray-900 font-bold">
								{post.author?.pseudo
									? post.author?.pseudo
									: post.author?.email}
							</p>
						</Link>
						<p className="text-sm text-gray-600">
							{getTimeSincePosted(post?.time)} •{" "}
							{post.project
								? post.project?.title
								: "Nom de projet"}
						</p>
						<p className="text-sm text-gray-600">
							{post.project ? post.project?._id : "ID du projet"}
						</p>
					</div>
				</div>

				<div className="body px-10 space-y-5">
					<p className="text-gray-900 mb-0">
						{post.content ? post.content : "Contenu du post"}
					</p>
					<Img
						className="w-full h-full object-cover rounded-xl"
						src={
							post.media
								? post.media
								: "https://loremflickr.com/640/480/nature"
						}
						alt="Placeholder image"
						width={1280}
						height={960}
					/>
				</div>

				<hr className="border-gray-300 my-5" />

				<div className="footer px-10 space-y-5">
					<div className="icon-group flex justify-between items-center px-20">
						<ThumbsUp
							onClick={handleLikePost}
							className="cursor-pointer"
						/>
						<MessageSquare
							onClick={handleCommentPost}
							className="cursor-pointer"
						/>

						<Link
							href={`${post.author?.email}/${post.project?._id}`}
						>
							<Rocket className="cursor-pointer" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
