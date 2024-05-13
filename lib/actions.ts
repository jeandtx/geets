
'use server'
import clientPromise from './mongodb'
import { Post, User } from '../types/tables'

/**
 * Retrieves posts from the database.
 * @returns {Promise<Array<any>>} A promise that resolves to an array of posts.
 */
export async function getPosts() {
    const client = await clientPromise
    const db = client.db('geets')
    const posts = await db.collection('posts_fake').find({}).sort({ metacritic: -1 }).limit(10).toArray()
    const data: Post[] = JSON.parse(JSON.stringify(posts)) // Remove ObjectID (not serializable)
    return data
}

/**
 * Retrieves a user with the mail from the database.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<any>} A promise that resolves to the user.
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

