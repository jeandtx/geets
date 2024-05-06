import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    const { description, selectedProject, userEmail } = await req.json(); // Récupération des données requises
    const client = await clientPromise;
    const db = client.db('geets');
    console.log(description, selectedProject, userEmail);
    
    try {
        if (!description || description.trim() === "") { // Vérification de la description
            throw new Error("Description is required.");
        }
        if (!selectedProject) { // Vérification du projet sélectionné
            throw new Error("Selected project is required.");
        }

        await db.collection('posts').insertOne({ userEmail, description, selectedProject, date: new Date() }); // Insertion des données dans la base de données
        return NextResponse.json({ msg: ['Post created successfully'], success: true });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ msg: [error.message], success: false });
    }
};
