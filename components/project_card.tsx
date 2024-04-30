import React from "react";
// import 'bulma/css/bulma.min.css';
import { list } from "postcss";
import clientPromise from "@/lib/mongodb";
import Img from "next/image";

interface SideProjectPost {
	_id: {
		$oid: string;
	};
	time: {
		$date: string;
	};
	title: string;
	hook: string;
	theme: string;
	description: string;
	media: string;
	labels: string[];
	participants: number;
}

interface SideProjectUser {
	_id: {
		$oid: string;
	};
	name: string;
	email: string;
	experience: number;
	media: string;
	PostId: string[];
	Media: string;
}

interface User {
	_id: string;
	age: string;
	email: string;
	Media: string;
	pseudo: string;
	Rating: number;
	UserId: number;
	location: string;
}

interface SideProjectCardProps {
	post: any;
	// user: any;
}

async function getUserById(userId: string): Promise<User> {
	const client = await clientPromise;
	const db = client.db("geets");
	const user = await db.collection<User>("users").findOne({ _id: userId });
	return user!;
}

export default async function SideProjectCard({
	post, // user,
}: SideProjectCardProps) {
	const user = await getUserById(post.userId);
	return (
		// Parent container with horizontal layout, rounded corners, shadow, and a defined maximum width
		<div className="flex max-w-2xl rounded overflow-hidden shadow-lg">
			{/* Image container with a relative size */}
			<div className="w-2/5">
				<Img
					className="w-full h-full object-cover"
					src={
						post.media
							? post.media
							: "https://bulma.io/images/placeholders/1280x960.png"
					}
					alt="Placeholder image"
				/>
			</div>

			{/* Text content container with padding and background color */}
			<div className="w-3/5 p-2 bg-gray-100">
				{/* put a rounded image placer for user.media */}
				<div className="flex items-center mb-4">
					<Img
						className="w-12 h-12 rounded-full mr-4"
						src={
							user.Media
								? user.Media
								: "https://bulma.io/images/placeholders/96x96.png"
						}
						alt="Placeholder image"
					/>
					<div>
						{/* put user.Name and next of it the user.Rating over 5*/}
						<p className="text-lg text-gray-900 font-bold">
							{user.email} 4/5
						</p>

						{/* <p className="text-lg text-gray-900 font-bold">{user.Name}</p>  */}
						<p className="text-sm text-gray-600">{user.email}</p>
						{/* write the number of posts  */}
						<p className="text-sm text-gray-600">
							{user.age} posted projects
						</p>
					</div>
				</div>
				{/*make a new div for the content with padding*/}

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
