'use server'
import clientPromise from '@/lib/mongodb'
import { User } from '@/types/tables'
import { verify } from 'crypto';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { sendEmail } from '../mailer';

/**
 * Retrieves a user with the email from the database.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<User>} A promise that resolves to the user.
 */
export async function getUser(email: string) {
    const client = await clientPromise
    const db = client.db('geets')
    const user = await db.collection('users').findOne({
        email
    })
    const data: User = JSON.parse(JSON.stringify(user)) // Remove ObjectID (not serializable)
    return data
}

/**
 * Retrieves a user with the id from the database.
 * @param {string} id - The id of the user to retrieve.
 * @returns {Promise<User>} A promise that resolves to the user.
 */
export async function getUserById(id: string) {
    console.log('id', id)
    const client = await clientPromise
    const db = client.db('geets')
    const user = await db.collection('users').findOne({
        _id: new ObjectId(id)
    })
    const data: User = JSON.parse(JSON.stringify(user)) // Remove ObjectID (not serializable)
    return data
}

/** 
 * Update a user
 * @param {User} user - The user to update.
 * @returns {Promise<any>} A promise that resolves to the response.
 */
export async function updateUser(user: Partial<User>): Promise<any> {
    const client = await clientPromise;
    const db = client.db('geets')
    const userId = new ObjectId(user._id); // Ensure _id is a valid ObjectId
    let userWithoutObjectId = {
        ...user,
        _id: user._id ? new ObjectId(user._id) : undefined
    }
    delete userWithoutObjectId._id
    const response = db.collection('users').updateOne({ _id: userId }, { $set: userWithoutObjectId })
    const data = JSON.parse(JSON.stringify(response)); // Remove ObjectID (not serializable)
    return data;
}



export async function findOne(query: any) {
    const client = await clientPromise;
    const db = client.db('geets');
    const user = await db.collection('users').findOne(query);
    const data: User = JSON.parse(JSON.stringify(user)); // Remove ObjectID (not serializable)
    return data;
}

/**
 * Verifies a user's email based on the provided token.
 * @param {string} token - The verification token.
 * @returns {Promise<NextResponse>} A promise that resolves to the response indicating the result.
 */
export async function verifyEmail(token: string): Promise<NextResponse> {
    console.log('helloworld', token);
    try {
        const user = await findOne({ verificationToken: token, verificationTokenExpires: { $gt: new Date() } });

        if (!user) {
            throw new Error('User not found or invalid/expired token');
        }

        console.log('user', user);

        user.emailVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;

        const updatedUser = await updateUser(user);
        console.log('updatedUser', updatedUser);

        await sendEmail({ email: user.email, emailType: 'verify', userId: user._id });

        return NextResponse.json({ message: 'Email verified successfully', success: true });

    } catch (error: any) {
        console.error('Error verifying email:', error.message);
        return NextResponse.json({ message: error.message, success: false });
    }
}
