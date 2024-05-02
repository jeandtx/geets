import React from "react";
import clientPromise from "@/lib/mongodb";
import Img from "next/image";
import { ObjectId } from "mongodb";

interface SideProjectCardProps {
	post: any;
}

async function getUserById(userId: string) {
	const client = await clientPromise;
	const db = client.db("geets");
	const users = db.collection("users");
	const user = await users.findOne({
		_id: new ObjectId("6630eacbc9cd5f9cad32f2d9"),
	});
	// const user = await users.findOne({ _id: new ObjectId(userId) });
	if (user) {
		console.log(user);
		return user;
	} else {
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
}

export default async function SideProjectCard({ post }: SideProjectCardProps) {
	const user = await getUserById(post.userId);
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
					<p className="text-base text-gray-700 underline mb-1">
						{post.hook}
					</p>
					<p className="text-gray-700 mb-0">{post.description}</p>
					<p className="text-sm text-gray-600 mt-4">
						<time dateTime={post.time.$date}>
							{new Date(post.time.$date).toLocaleDateString()}
						</time>
					</p>
				</div>
			</div>
		</div>
	);
}
