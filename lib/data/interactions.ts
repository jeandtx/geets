'use server'
import { Interaction } from "@/types/tables";
import clientPromise from '@/lib/mongodb'




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