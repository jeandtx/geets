'use server'
import clientPromise from './mongodb'
import { User, Workout, Session,ExerciseInput } from '../types/tables'
import { ObjectId } from 'mongodb';


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
        created: user.created,
        name: user.name
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
        created: user.created,
        name: user.name
    })) as User[];
}

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

export async function createSession(workoutId: string, exercises: { [key: string]: ExerciseInput }): Promise<Session | null> {
    if (!workoutId || !exercises) {
        throw new Error('Missing parameter(s). Check workoutId and exercises.');
    }

    try {
        const client = await clientPromise;
        const db = client.db('bodyscan');

        // Transformer les données des exercices pour correspondre à la structure de la Session
        const transformedExercises = Object.keys(exercises).reduce((acc, exerciseName) => {
            acc[exerciseName] = [{
                sets: parseInt(exercises[exerciseName].sets, 10),
                weight: parseInt(exercises[exerciseName].weight, 10)
            }];
            return acc;
        }, {} as { [key: string]: { sets: number, weight: number }[] });

        // Créer la nouvelle session
        const session = {
            _id: new ObjectId(),
            workoutId: new ObjectId(workoutId),
            date: new Date(),
            exercises: transformedExercises
        };

        // Insérer la nouvelle session dans la collection sessions
        await db.collection('sessions').insertOne(session);

        return {
            _id: session._id.toString(),
            date: session.date,
            exercises: session.exercises
        } as Session;
    } catch (error) {
        console.error("Error creating session:", error);
        throw error;
    }
}
export async function getSessions(workoutId: string): Promise<{ id: string; date: string }[]> {
    const client = await clientPromise;
    const db = client.db('bodyscan');
    const sessions = await db.collection('sessions').find({ workoutId: new ObjectId(workoutId) }).toArray();
  
    return sessions.map(session => ({
      id: session._id.toString(),
      date: session.date,
    }));
  }