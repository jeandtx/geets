import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Post } from "@/types/tables";
import { ObjectId } from 'mongodb'; // Import the ObjectId type


export async function POST(req: Request) {
    const { description, selectedProject, user, imageUrl } = await req.json(); // Récupération des données requises
    const client = await clientPromise;
    const db = client.db('geets');
    console.log(description, selectedProject, user);

    try {
        if (!description || description.trim() === "") {
            throw new Error("Description is required.");
        }
        if (!user || user.trim() === "") {
            throw new Error("User email is required.");
        }
        if (!selectedProject) {
            throw new Error("Selected project is required.");
        }
        const post: Post = {
            _id: "",
            project: selectedProject,
            title: description,
            time: new Date(),
            author: user,
            media: imageUrl || undefined,
        }
        await db.collection('posts').insertOne(
            {
                ...post,
                _id: new ObjectId()
            }
        );
        return NextResponse.json({ msg: ['Post created successfully'], success: true });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ msg: [error.message], success: false });
    }
};
