
'use server'
import clientPromise from '@/lib/mongodb'
import { User } from '@/types/tables'
import { ObjectId } from 'mongodb';


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