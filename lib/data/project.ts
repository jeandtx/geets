
'use server'
import clientPromise from '@/lib/mongodb'
import { Project } from '@/types/tables'
import { ObjectId } from 'mongodb';

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


/**
 * Retrieves all the projects of an user that is logged in.
 * @param {Partial<Project>} query - to filter the projects.
 * @returns {Promise<any>} A promise that resolves to the projects.
 * @throws {Error} If the user is not logged in.
 */

export async function getProjects(query: Partial<Project>): Promise<Project[]> {
    try {
        const client = await clientPromise;
        const db = client.db("geets");
        let queryWithObjectId = {
            ...query,
            _id: query._id ? new ObjectId(query._id) : undefined
        }
        const projects = await db.collection("projects").find(queryWithObjectId).toArray();
        const data: Project[] = JSON.parse(JSON.stringify(projects)) // Remove ObjectID (not serializable)
        return data;
    } catch (err) {
        console.error("Error fetching projects:", err);
        return [];
    }
}


/**
 * Retrieves one unique project from the database using the project title.
 * @param {string} projectId - The title of the project to retrieve.
 * @returns {Promise<any>} A promise that resolves to the project.
 */
export async function getProject(projectId: string) {

    const client = await clientPromise;
    const db = client.db("geets");
    const project = await db.collection("projects").findOne({ _id: new ObjectId(projectId) });
    const data: Project = JSON.parse(JSON.stringify(project)) // Remove ObjectID (not serializable)
    return data;

}


/**
 * Retrieves all the projects from the database.
 * @returns {Promise<any>} A promise that resolves to the projects.
 */
export async function updateParticipants(projectId: string, newParticipant: string) {
    try {
        const project = await getProject(projectId);
        if (!project) {
            throw new Error(`Project with ID ${projectId} not found.`);
        }


        if (project?.participants?.includes(newParticipant)) {
            throw new Error(`Participant ${newParticipant} already exists in the project.`);
        }

        const updatedParticipants = [...(project.participants || []), newParticipant];

        const client = await clientPromise;
        const db = client.db("geets");
        const result = await db.collection("projects").updateOne(
            { _id: new ObjectId(projectId) },
            { $set: { participants: updatedParticipants } }
        );

        return result;
    } catch (err) {
        console.error("Error updating participants:", err);
        return null;
    }
}
