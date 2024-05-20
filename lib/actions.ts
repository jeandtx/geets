
'use server'
import clientPromise from './mongodb'
import { Post, User, Project } from '../types/tables'
import { ObjectId } from 'mongodb'; // Import the ObjectId type

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
 * @returns {Promise<any>} A promise that resolves to the user.
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
 * @param {string} email - The email of the user to retrieve the projects.
 * @returns {Promise<any>} A promise that resolves to the projects.
 * @throws {Error} If the user is not logged in.
 */

export async function getProjects(email: string) {
    try {
        const client = await clientPromise;
        const db = client.db("geets");
        const projects = await db.collection("projects").find({ author: email }).toArray();
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
    try {
        const client = await clientPromise;
        const db = client.db("geets");
        const project = await db.collection("projects").findOne({ _id: new ObjectId(projectId) });
        const data: Project = JSON.parse(JSON.stringify(project)) // Remove ObjectID (not serializable)
        return data;
    } catch (err) {
        console.error("Error fetching project:", err);
        return null;
    }
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
        console.log("Posts:", posts);
        console.log("Project ID:", projectId);

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
