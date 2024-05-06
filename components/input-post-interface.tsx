"use server";
import React from "react";
import { InputPost } from "./inputpost";
import { auth, signOut } from "@/app/auth";
import clientPromise from "@/lib/mongodb";

async function getUser(email: string) {
    const client = await clientPromise;
    const db = client.db("geets");
    const user = await db.collection("users").findOne({ email });
    return user;
}
interface Project {
    _id: string;
    name: string;
    description: string;
    owner: string;
  }
async function getUserProjects(email: string): Promise<Project[]> {
    const client = await clientPromise;
    const db = client.db("geets");
    const projects = await db.collection<Project>("projects").find({ owner: email }).toArray();
    // const projects = await db.collection<Project>("project").find().toArray();
    console.log("find projects for the following email", email);
    return projects;
  }


  export async function InputPostInterface() {
    const session = await auth();
    // console.log(session);
    let user = null;  // Définissez user à un niveau supérieur

    if (session && session.user && session.user.email) {
        user = await getUser(session.user.email);
        // console.log(user);  // Affiche les informations de l'utilisateur s'il est trouvé
    } else {
        console.log("Session or user email is undefined");
    }

    if (!user) {
        console.log("User is undefined, cannot fetch projects.");
        return (
            <div className="p-5 rounded-3xl bg-postbg">
                <InputPost />
            </div>
        );
    }

    const projects = await getUserProjects(user.email);
    console.log(projects);

    return (
        <div className="p-5 rounded-3xl bg-postbg">
            <InputPost />
        </div>
    );
}
