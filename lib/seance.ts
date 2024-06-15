

'use server'
import clientPromise from './mongodb'
import {Seance,Series,Exercise } from '../types/tables'
import { ObjectId } from 'mongodb';




export async function createSeance(email: string, workoutId: string, exercises: Exercise[]): Promise<Seance | null> {
  if (!workoutId || !exercises) {
    throw new Error('Missing parameter(s). Check workoutId and exercises.');
  }

  try {
    const client = await clientPromise;
    const db = client.db('bodyscan');

    // Transformer les données des exercices pour correspondre à la structure de la Seance
    const transformedExercises: Exercise[] = exercises.map(exercise => ({
      name: exercise.name,
      sets: exercise.sets.map(set => ({
        reps: set && set.reps ? parseInt(set.reps.toString(), 10) : 0,
        weight: set && set.weight ? parseInt(set.weight.toString(), 10) : 0
      }))
    }));

    // Créer la nouvelle session
    const session = {
      _id: new ObjectId(),
      email: email,
      workoutId: new ObjectId(workoutId),
      date: new Date(),
      exercises: transformedExercises
    };

    // Insérer la nouvelle session dans la collection sessions
    await db.collection('seances').insertOne(session);

    return {
      _id: session._id.toString(),
      email: session.email,
      workoutId: session.workoutId.toString(),
      date: session.date,
      exercises: session.exercises
    } as Seance;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
}

export async function getSeances(workoutId: string): Promise<Seance[]> {
  const client = await clientPromise;
  const db = client.db('bodyscan');
  const sessions = await db.collection('seances').find({ workoutId: new ObjectId(workoutId) }).toArray();

  return sessions.map(session => ({
    _id: session._id.toString(),
    email: session.email,
    workoutId: session.workoutId.toString(),
    date: session.date,
    exercises: session.exercises,
  }));
}

export async function getAllUserSeances(email: string): Promise<Seance[]> {
    const client = await clientPromise;
    const db = client.db('bodyscan');
    const usersessions = await db.collection('seances').find({ email }).toArray();
    return usersessions.map(session => ({
        _id: session._id.toString(),
        email: session.email,
        workoutId: session.workoutId.toString(),
        date: session.date,
        exercises: session.exercises
    })) as Seance[];
}

export async function getSeanceById(id:string): Promise<Seance | null> {
  const client = await clientPromise;
  const db = client.db('bodyscan');
  const seance = await db.collection('seances').findOne({ _id: new ObjectId(id) });
  return seance ? {
    _id: seance._id.toString(),
    email: seance.email,
    workoutId: seance.workoutId.toString(),
    date: seance.date,
    exercises: seance.exercises,
  } : null;
}

export async function getSeancebyDay(email: string, date: Date): Promise<Seance[]> {
  const client = await clientPromise;
  const db = client.db('bodyscan');
  const seances = await db.collection('seances').find({ email, date }).toArray();
  return seances.map(seance => ({
    _id: seance._id.toString(),
    email: seance.email,
    workoutId: seance.workoutId.toString(),
    date: seance.date,
    exercises: seance.exercises,
  }));
}