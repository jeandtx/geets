import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    const { title, hook, themes, description, imageUrl } = await req.json();
    const userId = "";
    const client = await clientPromise;
    const db = client.db('bodyscan');
    try {
        if (!title || title.length < 3 || title.length > 100) {
            throw new Error("Title must be between 3 and 100 characters.");
        }
        if (!hook || hook.trim() === "") {
            throw new Error("Hook is required.");
        }


        await db.collection('posts').insertOne({ userId, title, hook, themes, description, imageUrl, date: new Date() });
        return NextResponse.json({ msg: ['Post created successfully'], success: true });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ msg: [error.message], success: false });
    }
};
