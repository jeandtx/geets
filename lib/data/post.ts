
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
    console.log('Post:', post)
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
    console.log("query:", query)
    const db = client.db('geets')
    let postsPerPage = 10
    let offset = (page - 1) * postsPerPage
    if (offset < 0) {
        offset = 0
        postsPerPage = 100
    }
    const posts = await db.collection('posts').find(query).sort({ score: -1, time: -1 }).skip(offset).limit(postsPerPage).toArray()
    const data: Post[] = JSON.parse(JSON.stringify(posts)) // Remove ObjectID (not serializable)
    console.log('Posts:', data)
    return data
}



export async function getPostss(page: number = 1, query: any | Partial<Post> = {}): Promise<Post[]> {
    const client = await clientPromise;
    console.log("Initial query:", query);
    const db = client.db('geets');
    let postsPerPage = 10;
    let offset = (page - 1) * postsPerPage;
    if (offset < 0) {
        offset = 0;
        postsPerPage = 100;
    }

    console.log("Page:", page);
    console.log("Offset:", offset);
    console.log("Posts per page:", postsPerPage);

    // Ajoutez une condition pour filtrer les posts avec un score supérieur à une certaine valeur
    const scoreThreshold = 10; // Exemple de valeur seuil pour le score, ajustez selon vos besoins
    const filter = { ...query, score: { $gte: scoreThreshold } };

    console.log("Filter applied:", filter);

    const posts = await db.collection('posts')
        .find(filter)
        .sort({ score: -1 }) // Trier par score dans l'ordre décroissant
        .skip(offset)
        .limit(postsPerPage)
        .toArray();

    console.log("Raw posts from database:", posts);

    const data: Post[] = JSON.parse(JSON.stringify(posts));

    console.log('Posts:', data);

    return data;
}
