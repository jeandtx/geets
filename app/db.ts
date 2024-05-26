import { MongoClient, Db, Collection } from 'mongodb';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import clientPromise from '@/lib/mongodb';

let db: Db;
let users: Collection;

async function connectToDatabase() {
    try {
        const client = await clientPromise;
        db = client.db("bodyscan");
        users = db.collection('users');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        // Vous pouvez ajouter ici une logique de gestion des erreurs
    }
}

// Appeler la fonction connectToDatabase pour établir la connexion au démarrage de l'application
connectToDatabase();

export async function getUser(email: string) {
    // Attendre que la connexion à la base de données soit établie avant d'exécuter l'opération
    await connectToDatabase();

    console.log("Attempting to find user with email:", email);
    return await users.findOne({ email });
}

export async function createUser(email: string, password: string,name: string) {
    try {
        // Attendre que la connexion à la base de données soit établie avant d'exécuter l'opération
        await connectToDatabase();

        let salt = genSaltSync(10);
        let hash = hashSync(password, salt);

        // Initialiser les champs avec des valeurs par défaut
        const newUser = {
            email,
            password: hash,
            name: name,
            media: '',
            createdAt: new Date()
        };
        return await users.insertOne(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}
