import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    const { description, selectedProject, user } = await req.json(); // Récupération des données requises
    const client = await clientPromise;
    const db = client.db('geets');
    console.log(description, selectedProject, user);
    
    try {
        if (!description || description.trim() === "") { // Vérification de la description
            throw new Error("Description is required.");
        }
        if (!user || user.trim() === "") { // Vérification de l'utilisateur
            throw new Error("User email is required.");
        }
        if (!selectedProject) { // Vérification du projet sélectionné
            throw new Error("Selected project is required.");
        }

        await db.collection('posts').insertOne({ user, description, selectedProject, date: new Date() }); // Insertion des données dans la base de données
        return NextResponse.json({ msg: ['Post created successfully'], success: true });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ msg: [error.message], success: false });
    }
};
