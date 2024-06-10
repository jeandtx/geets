'use server'
import { Interaction } from "@/types/tables";
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb';



/**
 * Retrieve all interactions
 * @param {number} page - The page number
 * @returns {Promise<Interaction[]>} The interactions
 * @throws {Error} If the interactions cannot be retrieved
 */
export async function getInteractions(page = 1): Promise<Interaction[]> {
    const client = await clientPromise;
    const db = client.db('geets');
    const interactionsPerPage = 10;
    const offset = (page - 1) * interactionsPerPage;
    if (offset < 0) {
        throw new Error('Invalid page number');
    }
    const interactions = await db.collection('interactions').find().sort({ time: -1 }).skip(offset).limit(interactionsPerPage).toArray();
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