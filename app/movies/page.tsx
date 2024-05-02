import { Metadata } from "next";
import clientPromise from "../../lib/mongodb";
import SideProjectCard from "@/components/project_card";

export const metadata: Metadata = {
	title: "Top 15 Movies by Metacritic",
};

async function getPosts() {
	const client = await clientPromise;
	const db = client.db("geets");
	const posts = await db
		.collection("posts_fake")
		.find({})
		.sort({ metacritic: -1 })
		.limit(10)
		.toArray();
	return posts;
}

export default async function Dashboard() {
	const posts = await getPosts();
	const postList = posts.map((post) => (
		<>
			<div className="flex p-8 bg-gray-50  overflow-hidden">
				<SideProjectCard post={post} />
			</div>
		</>
	));

	return (
		<div className="py-8">
			<h1 className="title text-green-400 text-center text-3xl font-bold mb-16">
				Top 15 posts by Metacritic
			</h1>
			<ul className="flex flex-wrap justify-center m-0 p-0 list-none">
				{postList}
			</ul>
		</div>
	);
}
