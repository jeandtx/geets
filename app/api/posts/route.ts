import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Post } from "@/types/tables";
import { ObjectId } from 'mongodb'; // Import the ObjectId type


export async function POST(req: Request) {
    const body: Post = await req.json(); // Récupération des données requises
    const client = await clientPromise;
    const db = client.db('geets');
    console.log(body);

    try {
        await db.collection('posts').insertOne(
            {
                ...body,
                _id: new ObjectId()
            }
        );
        return NextResponse.json({ msg: ['Post created successfully'], success: true });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ msg: [error.message], success: false });
    }
};
