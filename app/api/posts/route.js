import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(req) {
    const { fullname, email, message } = await req.json();
    const client = await clientPromise;
    const db = client.db('geets'); 
    try {
        
        if (!fullname || fullname.length < 3 || fullname.length > 50) {
            throw new Error("Fullname must be between 3 and 50 characters.");
        }
        if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new Error("Invalid email format.");
        }
        if (!message || message.trim() === "") {
            throw new Error("Message is required.");
        }

        const result = await db.collection('posts').insertOne({ fullname, email, message, date: new Date() });
        return NextResponse.json({ msg: ['Message sent successfully'], success: true });
    } catch (error) {
        console.error(error);
        
        return NextResponse.json({ msg: [error.message], success: false });
    }
};
