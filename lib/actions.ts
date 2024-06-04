'use server'
import clientPromise from './mongodb'
import { User} from '../types/tables'
import { ObjectId } from 'mongodb';


export async function getUser(email: string): Promise<User | null> {
    const client = await clientPromise;
    const db = client.db('bodyscan');

    console.log("Attempting to find user with email:", email);

    const user = await db.collection('users').findOne({ email });

    console.log("Found user:", user);

    return user ? {
        _id: user._id.toString(),
        email: user.email,
        password: user.password,
        pseudo: user.pseudo,
        created: user.created,
        name: user.name
    } as User : null;
}

export async function getAllUsers(): Promise<User[]> {
    const client = await clientPromise;
    const db = client.db('bodyscan');
    const users = await db.collection('users').find({}).toArray();

    return users.map(user => ({
        _id: user._id.toString(),
        email: user.email,
        password: user.password,
        pseudo: user.pseudo,
        created: user.created,
        name: user.name
    })) as User[];
}


