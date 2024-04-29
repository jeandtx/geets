import { MongoClient, MongoClientOptions, Db, Collection } from 'mongodb';
import { genSaltSync, hashSync } from 'bcrypt-ts';

const MONGODB_URI = process.env.MONGODB_URI!;

const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true } as MongoClientOptions);

let db: Db, users: Collection;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db("sample_mflix"); // database name
        users = db.collection('users');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToDatabase();

export async function getUser(email: string) {
    return await users.findOne({ email });
}

export async function createUser(email: string, password: string) {
    try {
        let salt = genSaltSync(10);
        let hash = hashSync(password, salt);
        return await users.insertOne({ email, password: hash });
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}
