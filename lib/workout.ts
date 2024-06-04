'use server'
import clientPromise from './mongodb'
import { User, Workout, Session,ExerciseInput } from '../types/tables'
import { ObjectId } from 'mongodb';

export async function createWorkout(email: string, workoutTitle: string, exerciseName: string[]): Promise<Workout> {
    if (!email || !workoutTitle || exerciseName.length === 0) {
        throw new Error('Missing parameter(s). Check email, workoutTitle, and exerciseIds.');
    }

    try {
        const client = await clientPromise;
        const db = client.db('bodyscan');

        const workout = {
            _id: new ObjectId(),
            email,
            workoutTitle,
            date: new Date(),
            exercises: exerciseName
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