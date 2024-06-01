
'use server'
import clientPromise from '@/lib/mongodb'
import { Post } from '@/types/tables'
import { ObjectId } from 'mongodb';


/**
 * Retrieves posts from the database.
 * @param {number} page - The page number to retrieve.
 * @returns {Promise<Array<any>>} A promise that resolves to an array of posts.
 */
export async function getPosts(page: number = 1) {
    const client = await clientPromise
    const db = client.db('geets')
    const postsPerPage = 2
    const offset = (page - 1) * postsPerPage
    const posts = await db.collection('posts').find({}).sort({ time: 1 }).skip(offset).limit(postsPerPage).toArray()
    const data: Post[] = JSON.parse(JSON.stringify(posts)) // Remove ObjectID (not serializable)

    return data
}



/**
 * Retrieves all posts from the database referencing to the project using the project ID.
 * @param {string} projectId - The ID of the project to retrieve the posts.
 * @returns {Promise<any>} A promise that resolves to the posts.
 * @throws {Error} If the project ID is missing.
 */
export async function getPostsByProjectId(projectId: string): Promise<Post[]> {
    try {
        const client = await clientPromise;
        const db = client.db("geets");
        const posts = await db.collection("posts").find({ project: projectId }).toArray();

        const data: Post[] = posts.map(post => ({
            _id: post._id.toString(),
            project: post.project,
            content: post.content,
            time: new Date(post.time),
            author: post.author,
            media: post.media,
            labels: post.labels
        }));
        return data;
    } catch (err) {
        console.error("Error fetching posts:", err);
        return [];
    }
}



/**
 * Retrieves posts authored by the user from the database.
 * @param {string} email - The email of the user to retrieve the posts.
 * @returns {Promise<Array<Post>>} A promise that resolves to an array of posts.
 */
export async function getUserPosts(email: string): Promise<Post[]> {
    const client = await clientPromise
    const db = client.db('geets')
    const posts = await db.collection('posts').find({ "author.email": email }).toArray()
    const data: Post[] = posts.map(post => ({
        _id: post._id.toString(),
        project: post.project,
        content: post.content,
        time: new Date(post.time),
        author: post.author,
        media: post.media,
        labels: post.labels
    }))
    return data
}