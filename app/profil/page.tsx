import { auth, signOut } from '@/app/auth';
import clientPromise from '@/lib/mongodb';

async function getUser(email: string) {
    const client = await clientPromise;
    const db = client.db("geets");
    const user = await db.collection("users").findOne({ email });
    return user;
}

export default async function ProfilPage() {
    const session = await auth(); // Récupération de la session utilisateur

    // Récupération des informations de l'utilisateur à partir de la session
    const user = await getUser(session?.user?.email || '');

    return (
        <div className="flex h-screen ">
            <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-black">
                <p>You are logged in as {session?.user?.email}</p>
                {user && <div>Nom: {user.name}</div>}
                {user && <div>Prénom: {user.last_name}</div>}
                {user && <div>Age: {user.age}</div>}
                {user && <div>Localisation: {user.location}</div>}
                {user && <div>Sexe: {user.sexe}</div>}
                {user && <div>Expérience: {user.experience}</div>}
            </div>
        </div>
    );
}
