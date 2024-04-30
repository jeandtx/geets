import { Metadata } from 'next'

import clientPromise from "../../lib/mongodb";

import { SideProjectCard } from "@/components/project_card";

export const metadata: Metadata = {
    title: 'Top 15 Movies by Metacritic',
}

interface User {
    _id: string;
    Name: string;
    Email: string;
    media: string;
    Posts: string;
    Rating: number;
}



async function getPosts() {
    const client = await clientPromise;
    const db = client.db("geets");
    const posts = await db
        .collection("posts_fake")
        .find({})
        .sort({ metacritic: -1 })
        // .limit(85)
        .toArray();
    return posts;
}

async function getUserById(userId: string): Promise<User> {
    const client = await clientPromise;
    const db = client.db("geets");
    const user = await db
        .collection<User>("users")
        .findOne({ _id: userId });
    return user!;
}

// const user = {
//     _id: { $oid: "662a25dfe36d3727d331f9d0" },
// Name: "Jean Dtx",
// Email: "jean.dtsnitch@pipi.caca",
// media: "https://images.unsplash.com/photo-1558723223-0f8c63ea0fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTQ2NjB8MHwxfHNlYXJjaHwxfHxNYWdpYyUyMCUyNiUyMElsbHVzaW9ufGVufDB8fHx8MTcxNDAzODIwOHww&ixlib=rb-4.0.3&q=80&w=1080",
// Posts: "4",
// Rating: 5
// }




export default async function Dashboard() {
    const posts = await getPosts()
    const user = await getUserById(posts[0].user_id)
    "use client"
    const postList = posts.map((post) => (
        <>
                        <div className="flex p-8 bg-gray-50  overflow-hidden">
			<SideProjectCard post={post} user={user}/>
		</div>
                    </>
    ));

    return (
        <div className="py-8">
            <h1 className="title text-green-400 text-center text-3xl font-bold mb-16">Top 15 posts by Metacritic</h1>
            <ul className="flex flex-wrap justify-center m-0 p-0 list-none">{postList}</ul>
        </div>
    );
}