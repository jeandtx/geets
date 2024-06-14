
'use server'
import clientPromise from '@/lib/mongodb'
import { User } from '@/types/tables'
import { verify } from 'crypto';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { sendEmail } from '../mailer';


/**
 * Retrieves a user with the mail from the database.
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
 * 
 */
export async function updateUser(user: User) {
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

/**
 * Finds a user by ID and updates the specified fields.
 * @param {string} id - The ID of the user to update.
 * @param {Partial<User>} updateFields - The fields to update for the user.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 */
export async function findByIdAndUpdate(id: string, updateFields: Partial<User>) {
    const client = await clientPromise;
    const db = client.db('geets');
    const userId = new ObjectId(id); // Ensure id is a valid ObjectId

    // Ensure _id is not part of the fields to update
    if (updateFields._id) {
        delete updateFields._id;
    }

    // Perform the update operation
    const response = await db.collection('users').findOneAndUpdate(
        { _id: userId },
        { $set: updateFields },
        { returnDocument: 'after' } // Return the updated document
    );

    console.log('responsee', response);

    // Handle the case where no user was found
    if (!response) {
        throw new Error(`User with id ${id} not foundd`);
    }

    const updatedUser: User = JSON.parse(JSON.stringify(response)); // Remove ObjectID (not serializable)
    return updatedUser;
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