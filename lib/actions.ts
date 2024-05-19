
'use server'
import clientPromise from './mongodb'
import { Post, User, Project } from '../types/tables'
import { ObjectId } from 'mongodb'; // Import the ObjectId type
import { get } from 'http';

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
    const client = await clientPromise
    const db = client.db('geets')
    const user = await db.collection('users').findOne({
        _id: new ObjectId(id)
    })
    const data: User = JSON.parse(JSON.stringify(user)) // Remove ObjectID (not serializable)
    return data
}


/**
 * Creates a project in the database.
 * @param {Project} project - The project to create.
 * @returns {Promise<any>} A promise that resolves to the created project.
 * @throws {Error} If the project have a missing field.
    */
export async function createProject(project: Project) {
    const client = await clientPromise
    const db = client.db('geets')
    if (!project.title || !project.description || !project.author) {
        throw new Error('Missing field(s) in project. check title' + project.title + ' description ' + project.description + ' author ' + project.author)
    }
    const result = await db.collection('projects').insertOne({ ...project, _id: new ObjectId() });
    const data = JSON.parse(JSON.stringify(result)) // Remove ObjectID (not serializable)
    return data
}

