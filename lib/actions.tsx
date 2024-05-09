'use server'

import clientPromise from './mongodb'

/**
 * Retrieves posts from the database.
 * @returns {Promise<Array<any>>} A promise that resolves to an array of posts.
 */
export async function getPosts() {
    const client = await clientPromise
    const db = client.db('geets')
    const posts = await db.collection('posts_fake').find({}).sort({ metacritic: -1 }).limit(10).toArray()

    return posts
}
