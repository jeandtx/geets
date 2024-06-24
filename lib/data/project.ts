
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
    console.log('Project:', project);
    const client = await clientPromise;
    const db = client.db('geets');

    const DEFAULT_IMAGE_URL = "https://res.cloudinary.com/dekbkndn8/image/upload/v1715719366/samples/balloons.jpg";

    // Ensure that the project has a media URL, otherwise use the default image URL
    if (!project.media) {
        project.media = DEFAULT_IMAGE_URL;
    }

    if (!project.title || !project.description || !project.participants) {
        throw new Error('Missing field(s) in project. Check title: ' + project.title + ', description: ' + project.description + ', participants: ' + project.participants);
    }

    const result = await db.collection('projects').insertOne({ ...project, _id: new ObjectId(), time: new Date() });
    const data = JSON.parse(JSON.stringify(result)); // Remove ObjectID (not serializable)
    return data;
}


/**
 * Retrieves all the projects of an user that is logged in.
 * @param {Partial<Project>} query - to filter the projects.
 * @returns {Promise<any>} A promise that resolves to the projects.
 * @throws {Error} If the user is not logged in.
 */
export async function getProjects(query: Partial<Project> | any): Promise<Project[]> {
    try {
        const client = await clientPromise;
        const db = client.db("geets");
        let queryWithObjectId = {
            ...query,
            _id: query._id ? new ObjectId(query._id) : undefined
        }
        delete queryWithObjectId._id
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
 * Update a project in the database.
 * @param {Project} project - The project to update.
 * @returns {Promise<any>} A promise that resolves to the updated project.
 * @throws {Error} If the project has a missing field.
 */
export async function updateProject(project: Project) {
    const client = await clientPromise;
    const db = client.db('geets');

    if (!project._id) {
        throw new Error('Missing field(s) in project. Check id: ' + project._id);
    }

    const projectId = new ObjectId(project._id); // Ensure _id is a valid ObjectId

    // Build the update object dynamically based on the field that are already not null
    const updateFields: Partial<Project> = {};
    if (project.title !== undefined) updateFields.title = project.title;
    if (project.themes !== undefined) updateFields.themes = project.themes;
    if (project.description !== undefined) updateFields.description = project.description;
    if (project.media !== undefined) updateFields.media = project.media;
    if (project.labels !== undefined) updateFields.labels = project.labels;

    // If there are no fields to update, throw an error
    if (Object.keys(updateFields).length === 0) {
        throw new Error('No fields to update.');
    }

    const result = await db.collection('projects').updateOne({ _id: projectId }, { $set: updateFields });

    const data = JSON.parse(JSON.stringify(result)); // Remove ObjectID (not serializable)
    return data;
}


/**
 * Delete a project from the database.
 * @param {string} projectId - The id of the project to delete.
 * @returns {Promise<any>} A promise that resolves to the deleted project.
 * @throws {Error} If the project id is missing.
 */
export async function deleteProject(projectId: string) {
    // todo delete all related posts
    const client = await clientPromise;
    const db = client.db('geets');
    if (!projectId) {
        throw new Error('Missing field(s) in project. Check id: ' + projectId);
    }
    const result = await db.collection('projects').deleteOne({ _id: new ObjectId(projectId) });
    const data = JSON.parse(JSON.stringify(result)); // Remove ObjectID (not serializable)
    return data;
}


/**
 * Searches for projects using Atlas Search.
 * @param {string} searchTerm - The search term for the project.
 * @returns {Promise<Project[]>} A promise that resolves to the matched projects.
 */
export async function searchProjects(searchTerm: string): Promise<Project[]> {
    const client = await clientPromise;
    const db = client.db('geets');

    const searchResults = await db.collection('projects').aggregate([
        {
            $search: {
                index: 'autocompleteIndex',
                autocomplete: {
                    query: searchTerm,
                    path: 'title',
                    tokenOrder: 'any'
                }
            }
        },
        {
            $limit: 10
        }
    ]).toArray();

    return JSON.parse(JSON.stringify(searchResults)); // Remove ObjectID (not serializable)
}