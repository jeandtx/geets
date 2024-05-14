import React from "react";
import Img from "next/image";
import { Post } from "@/types/tables";

interface SideProjectCardProps {
	post: Post;
}

function getUserById(userId: string) {
	return {
		_id: "not_found",
		age: "not_found",
		email: "not_found",
		Media: "https://loremflickr.com/640/480/nature",
		pseudo: "not_found",
		Rating: 0,
		UserId: 0,
		location: "not_found",
	};
}

export default function SideProjectCard({ post }: SideProjectCardProps) {
	const user = getUserById(post.author);
	return (
		<div className="flex max-w-2xl rounded overflow-hidden shadow-lg">
			<div className="w-2/5">
				<Img
					className="w-full h-full object-cover"
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

			<div className="w-3/5 p-2 bg-gray-100">
				<div className="flex items-center mb-4">
					<Img
						className="w-12 h-12 rounded-full mr-4"
						src={
							user
								? user.Media
								: "https://loremflickr.com/640/480/nature"
						}
						alt="Placeholder image"
						width={48}
						height={48}
					/>
					<div>
						<p className="text-lg text-gray-900 font-bold">
							{user ? user.pseudo : "user pseudo"}
						</p>

						<p className="text-sm text-gray-600">
							Age : {user ? user.age : "user age"}
						</p>
						<p className="text-sm text-gray-600">
							{user ? user.email : "user email"}
						</p>
					</div>
				</div>

				<div className="p-2">
					<h2 className="text-2xl font-bold mb-2">{post.title}</h2>
					<div className="text-base text-gray-700 underline mb-1">
						{post.content}
					</div>
					<div className="text-sm text-gray-600 mt-4">
						<time dateTime={post.time.toLocaleString()}>
							{new Date(post.time).toLocaleString()}
						</time>
					</div>
				</div>
			</div>
		</div>
	);
}
