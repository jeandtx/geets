
'use server'
import clientPromise from '@/lib/mongodb'
import { Post,Project } from '@/types/tables'
import { MongoClient, Sort, WithId, Document,ObjectId } from "mongodb";
import { getProject } from './project'

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
 * @param {object} query - The query parameters for filtering posts.
 * @param {string} sort - The sorting criteria ('recent' or 'popular').
 * @returns {Promise<Array<any>>} A promise that resolves to an array of posts.
 */
export async function getPosts(page: number = 1, query: any | Partial<Post> = {}, sort: string = 'recent'): Promise<Post[]> {
    const client = await clientPromise;
    const db = client.db('geets');
    let postsPerPage = 10;
    let offset = (page - 1) * postsPerPage;
    if (offset < 0) {
        offset = 0;
        postsPerPage = 100;
    }

    // Define the sort criteria based on the sort parameter
    let sortCriteria : Sort;
    if (sort === 'popular') {
        sortCriteria = { score: -1 };
    } else {
        // Default to sorting by most recent
        sortCriteria = { time: -1 };
    }

    const posts = await db.collection('posts').find(query).sort(sortCriteria).skip(offset).limit(postsPerPage).toArray();
    const data: Post[] = JSON.parse(JSON.stringify(posts)); // Remove ObjectID (not serializable)
    return data;
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

/**
 * Retrieves posts from friends' projects from the database.
 * @param {string} email - The email of the user.
 * @param {number} page - The page number to retrieve.
 * @param {string} sort - The sorting criteria ('recent' or 'popular').
 * @returns {Promise<Array<Post>>} A promise that resolves to an array of posts.
 */
export async function getFriendsPost(email: string, page: number = 1, sort: string = 'recent'): Promise<Post[]> {
    console.log("email:", email);
    const client = await clientPromise;
    const db = client.db('geets');
    let postsPerPage = 10;
    let offset = (page - 1) * postsPerPage;
    if (offset < 0) {
        offset = 0;
        postsPerPage = 100;
    }

    // Rechercher les projets où l'email fait partie des participants
    const projects = await db.collection('projects').find({
        "participants.name": email
    }).toArray() as WithId<Document>[];
    
    // Log retrieved projects
    console.log("Retrieved projects:", projects);

    // Extraire les IDs des projets et les convertir en chaînes de caractères
    const projectIds = projects.map((project) => project._id.toString());

    // Log project IDs
    console.log("Project IDs:", projectIds);

    // Define the sort criteria based on the sort parameter
    let sortCriteria: Sort;
    if (sort === 'popular') {
        sortCriteria = { score: -1 };
    } else {
        // Default to sorting by most recent
        sortCriteria = { time: -1 };
    }

    // Rechercher les posts qui correspondent aux projectIds avec pagination et tri
    const posts = await db.collection('posts').find({
        "project._id": { $in: projectIds }
    }).sort(sortCriteria).skip(offset).limit(postsPerPage).toArray();
    
    // Log retrieved posts
    console.log("Retrieved posts:", posts);

    // Convertir les objets MongoDB en objets JSON
    const data: Post[] = JSON.parse(JSON.stringify(posts)); // Remove ObjectID (not serializable)
    
    return data;
}