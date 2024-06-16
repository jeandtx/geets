import { MongoClient, MongoClientOptions, Db, Collection } from 'mongodb';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import clientPromise from '@/lib/mongodb';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { sendEmail } from '@/lib/mailer';

const MONGODB_URI = process.env.MONGODB_URI!;

let db: Db, users: Collection;

async function connectToDatabase() {
    try {
        const client = await clientPromise;
        db = client.db("geets"); // database name
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

function generateVerificationToken() {
    return crypto.randomBytes(20).toString('hex');
}

export async function createUser(email: string, password: string, verificationToken: string, verificationTokenExpires: Date) {
    try {
        let salt = genSaltSync(10);
        let hash = hashSync(password, salt);
        
        const verificationToken = generateVerificationToken();
        const verificationTokenExpires = new Date();
        verificationTokenExpires.setHours(verificationTokenExpires.getHours() + 1); // 1 heure d'expiration

        // Initialiser les champs avec des valeurs par défaut
        const newUser = {
            email,
            password: hash,
            pseudo: '',
            name: '',
            last_name: '',
            age: 0,
            location: '',
            sexe: '',
            experience: 0,
            chercheARejoindreUnProjet: false,
            mobile: '',
            media: '',
            createdAt: new Date(),
            emailVerified: false,
            verificationToken,
            verificationTokenExpires
        };

        const result = await users.insertOne(newUser);
        
        const verificationUrl = `http://your-domain.com/verify-email?token=${verificationToken}`;
        
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

