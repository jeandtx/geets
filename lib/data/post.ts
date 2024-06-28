
'use server'
import clientPromise from '@/lib/mongodb'
import { Post } from '@/types/tables'
import { ObjectId } from 'mongodb'

/**
 * Creates a post in the database.
 * @param {Post} post - The post to create.
 * @returns {Promise<any>} A promise that resolves to the created post.
 * @throws {Error} If the post have a missing field.
 */
export async function createPost(post: Post) {
    const client = await clientPromise
    const db = client.db('geets')
    if (!post.media) {
        post.media = ""
    }
    const result = await db.collection('posts').insertOne({ ...post, _id: new ObjectId() })
    const data = JSON.parse(JSON.stringify(result)) // Remove ObjectID (not serializable)
    return data
}


/**
 * Retrieves posts from the database.
 * @param {number} page - The page number to retrieve.
 * @returns {Promise<Array<any>>} A promise that resolves to an array of posts.
 */
export async function getPosts(page: number = 1, query: any | Partial<Post> = {}): Promise<Post[]> {
    const client = await clientPromise
    const db = client.db('geets')
    let postsPerPage = 10
    let offset = (page - 1) * postsPerPage
    if (offset < 0) {
        offset = 0
        postsPerPage = 100
    }
    const posts = await db.collection('posts').find(query).sort({ score: -1, time: -1 }).skip(offset).limit(postsPerPage).toArray()
    const data: Post[] = JSON.parse(JSON.stringify(posts)) // Remove ObjectID (not serializable)
    return data
}


/**
 * Update a post in the database based on its ID.
 * @param {string} postId - The ID of the post to update.
 * @param {Partial<Post>} post - The fields to update.
 * @returns {Promise<any>} A promise that resolves to the updated post.
 * @throws {Error} If the post have a missing field.
 */
export async function updatePost(postId: string, post: Partial<Post>) {
    const client = await clientPromise
    const db = client.db('geets')
    const result = await db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $set: post })
    const data = JSON.parse(JSON.stringify(result)) // Remove ObjectID (not serializable)
    return data
}