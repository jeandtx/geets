import { MongoClient, Db, Collection } from 'mongodb';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import clientPromise from '@/lib/mongodb';
import { User } from '../types/tables';
import { ObjectId } from 'mongodb';

let db: Db;
let users: Collection<User>;

async function connectToDatabase() {
    if (!db) {
        try {
            const client = await clientPromise;
            db = client.db("bodyscan");
            users = db.collection<User>('users');
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }
}

export async function getUser(email: string): Promise<User | null> {
    await connectToDatabase();
    console.log("Attempting to find user with email:", email);
    const user = await users.findOne({ email });

    return user ? {
        _id: user._id.toString(),
        email: user.email,
        password: user.password,
        pseudo: user.pseudo,
        created: user.created
    } as User : null;
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
    try {
        await connectToDatabase();

        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);

        const newUser: User = {
            _id: new ObjectId().toString(),
            email,
            password: hash,
            name: name,
            created: new Date()
        };

        const result = await users.insertOne({
            ...newUser,
            _id: new ObjectId(newUser._id).toString()
        });

        return {
            ...newUser,
            _id: result.insertedId.toString()
        } as User;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}
