import { MongoClient } from "mongodb";

// Vous pouvez placer la logique de connexion dans un fichier séparé et l'importer ici.
let db;
const client = new MongoClient(process.env.MONGODB_URI);
client.connect().then(client => {
    db = client.db(); // Mettez le nom de votre base de données ici
});

class Contact {
    static async create(data) {
        try {
            // Validation de base, vous pouvez étendre cela selon vos besoins
            if (!data.fullname || data.fullname.length < 3 || data.fullname.length > 50) {
                throw new Error("Fullname must be between 3 and 50 characters");
            }
            if (!data.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
                throw new Error("Invalid email format");
            }
            if (!data.message) {
                throw new Error("Message is required");
            }

            // Insérer le contact dans la base de données
            const result = await db.collection('contacts').insertOne({
                ...data,
                date: data.date || new Date() // Utiliser la date actuelle par défaut
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default Contact;
