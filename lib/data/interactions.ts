'use server'
import { Interaction } from "@/types/tables";
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb';


/**
 * Create a new interaction
 * @param {Interaction} interaction - The interaction data
 * @returns {Promise<any>} a validated promise
 * @throws {Error} If the interaction cannot be created
 */
export async function createInteraction(interaction: Interaction): Promise<any> {
    try {
        console.log('Interaction:', interaction.type);

        const client = await clientPromise;
        const db = client.db('geets');
        const data = JSON.parse(JSON.stringify(interaction)); // Remove ObjectID (not serializable)
        const result = await db.collection('interactions').insertOne({
            ...data,
            time: new Date(),
            _id: new ObjectId()
        });

        if (interaction.like?.postId) {
            await updateScore(interaction.like.postId, interaction.type);
        } else {
            console.error('No postId found for interaction:', interaction);
        }
        
        return result;
    } catch (error) {
        console.error('Error in createInteraction:', error);
        throw new Error('Failed to create interaction');
    }
}

export async function updateScore(postId: string, typeInteraction: string): Promise<any> {
    try {
        console.log("scoring the post:", postId);

        if (!ObjectId.isValid(postId)) {
            throw new Error('Invalid postId');
        }

        const client = await clientPromise;
        const db = client.db('geets');
        const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });

        if (!post) {
            throw new Error('Post not found');
        }

        let score = post.score || 1;
        if (typeInteraction === "like") {
            score *= 10;
        } else if (typeInteraction === "comment") {
            score *= 20;
        }

        const result = await db.collection('posts').updateOne(
            { _id: new ObjectId(postId) },
            { $set: { score: score } }
        );

        return result;
    } catch (error) {
        console.error('Error in updateScore:', error);
        throw new Error('Failed to update score');
    }
}
/**
 * Retrieve all interactions
 * @param {number} page - The page number
 * @returns {Promise<Interaction[]>} The interactions
 * @throws {Error} If the interactions cannot be retrieved
 */
export async function getInteractions(query: Partial<Interaction> | any, page = 1): Promise<Interaction[]> {
    const client = await clientPromise;
    const db = client.db('geets');
    const interactionsPerPage = 10;
    const offset = (page - 1) * interactionsPerPage;
    if (offset < 0) {
        throw new Error('Invalid page number');
    }
    const interactions = await db.collection('interactions').find(
        query
    ).sort({ time: -1 }).skip(offset).limit(interactionsPerPage).toArray();
    const data: Interaction[] = JSON.parse(JSON.stringify(interactions)); // Remove ObjectID (not serializable)
    return data;
}

/**
 * Update an interaction 
 * @param {string} id - The interaction ID
 * @param {Partial<Interaction>} interaction - The interaction data
 * @returns {Promise<Interaction>} The updated interaction
 * @throws {Error} If the interaction cannot be updated
 */
export async function updateInteraction(interaction: Partial<Interaction>): Promise<Interaction> {
    const client = await clientPromise;
    const db = client.db('geets');

    if (!interaction._id) {
        throw new Error('Missing field(s) in interaction. Check id: ' + interaction._id);
    }

    const interactionId = new ObjectId(interaction._id); // Ensure _id is a valid ObjectId
    let interactionWithoutObjectId = {
        ...interaction,
        _id: interaction._id ? new ObjectId(interaction._id) : undefined
    }
    delete interactionWithoutObjectId._id
    const result = await db.collection('interactions').updateOne({ _id: interactionId }, { $set: interactionWithoutObjectId });

    const data = JSON.parse(JSON.stringify(result)); // Remove ObjectID (not serializable)
    return data;
}