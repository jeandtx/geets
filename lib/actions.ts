'use server'
import clientPromise from './mongodb'
import { User, Workout, ExercisePerformance } from '../types/tables'
import { ObjectId } from 'mongodb';

/**
 * Retrieves a user with the email from the database.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<User | null>} A promise that resolves to the user.
 */
export async function getUser(email: string): Promise<User | null> {
    const client = await clientPromise;
    const db = client.db('bodyscan');

    console.log("Attempting to find user with email:", email);

    const user = await db.collection('users').findOne({ email });

    console.log("Found user:", user);

    return user ? {
        _id: user._id.toString(),
        email: user.email,
        password: user.password,
        pseudo: user.pseudo,
        created: user.created
    } as User : null;
}

export async function getAllUsers(): Promise<User[]> {
    const client = await clientPromise;
    const db = client.db('bodyscan');
    const users = await db.collection('users').find({}).toArray();

    return users.map(user => ({
        _id: user._id.toString(),
        email: user.email,
        password: user.password,
        pseudo: user.pseudo,
        created: user.created
    })) as User[];
}

/**
 * Creates a workout in the database.
 * @param {string} email - The email of the user.
 * @param {string} workoutTitle - The title of the workout.
 * @param {ExercisePerformance[]} exercises - An array of exercises with performance details.
 * @returns {Promise<Workout>} A promise that resolves to the created workout.
 * @throws {Error} If a parameter is missing.
 */
export async function createWorkout(email: string, workoutTitle: string, exercises: ExercisePerformance[]): Promise<Workout> {
    if (!email || !workoutTitle || exercises.length === 0) {
        throw new Error('Missing parameter(s). Check email, workoutTitle, and exercises.');
    }

    try {
        const client = await clientPromise;
        const db = client.db('bodyscan');

        const workout = {
            _id: new ObjectId(),
            email,
            workoutTitle,
            date: new Date(),
            exercises
        };

        await db.collection('workouts').insertOne(workout);

        return {
            ...workout,
            _id: workout._id.toString()
        } as Workout;
    } catch (error) {
        console.error("Error creating workout:", error);
        throw error;
    }
}

export async function getAllWorkouts(email: string): Promise<Workout[]> {
    const client = await clientPromise;
    const db = client.db('bodyscan');
    const workouts = await db.collection('workouts').find({ email }).toArray();

    return workouts.map(workout => ({
        _id: workout._id.toString(),
        email: workout.email,
        workoutTitle: workout.workoutTitle,
        date: workout.date,
        exercises: workout.exercises
    })) as Workout[];
}

export async function getWorkout(workoutId: string): Promise<Workout | null> {
    const client = await clientPromise;
    console.log("workoutId", workoutId);
    const db = client.db("bodyscan");
    const workout = await db.collection("workouts").findOne({ _id: new ObjectId(workoutId) });

    return workout ? {
        _id: workout._id.toString(),
        email: workout.email,
        workoutTitle: workout.workoutTitle,
        date: workout.date,
        exercises: workout.exercises
    } as Workout : null;
}
