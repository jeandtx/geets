
'use server'
import clientPromise from './mongodb'
import {User, Workout } from '../types/tables'
import { ObjectId } from 'mongodb'; 
import { get } from 'http';


/**
 * Retrieves a user with the mail from the database.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<any>} A promise that resolves to the user.
    */
export async function getUser(email: string) {
    const client = await clientPromise;
    const db = client.db('bodyscan');

    console.log("Attempting to find user with email:", email);

    const user = await db.collection('users').findOne({
        email
    });

    console.log("Found user:", user);

    const data: User = JSON.parse(JSON.stringify(user)); // Remove ObjectID (not serializable)

    return data;
}




export async function getAllUsers() {
    const client = await clientPromise
    const db = client.db('bodyscan')
    const users = await db.collection('users').find({}).toArray()
    const data: User[] = JSON.parse(JSON.stringify(users)) // Remove ObjectID (not serializable)
    return data
}


/**
 * Creates a workout in the database.
 * @param {string} email - The email of the user.
 * @param {string} workoutTitle - The title of the workout.
 * @param {string[]} exercises - An array of exercises.
 * @returns {Promise<any>} A promise that resolves to the created workout.
 * @throws {Error} If a parameter is missing.
 */
export async function createWorkout(email: string, workoutTitle: string, exercises: string[]) {
    const client = await clientPromise;
    const db = client.db('bodyscan');

    if (!email || !workoutTitle || exercises.length === 0) {
        throw new Error('Missing parameter(s). Check email, workoutTitle, and exercises.');
    }

    const workout: Workout = {
        _id: new ObjectId().toHexString(), // Generate a new ObjectId and convert to string
        email,
        workoutTitle,
        exercises,
        date: new Date()
    };

    const result = await db.collection('workouts').insertOne({
        ...workout,
        _id: new ObjectId(workout._id) // Convert _id to ObjectId
    });

    const data = JSON.parse(JSON.stringify(result)); // Remove ObjectID (not serializable)
    return data;
}

export async function getAllWorkouts(email: string) {
    const client = await clientPromise;
    const db = client.db('bodyscan');
    const workouts = await db.collection('workouts').find({ email }).toArray();
    const data: Workout[] = JSON.parse(JSON.stringify(workouts)); // Remove ObjectID (not serializable)
    return data;
}