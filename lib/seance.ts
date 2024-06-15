'use server'
import clientPromise from './mongodb'
import { Seance } from '../types/tables'
import { ObjectId } from 'mongodb';

export async function createSeance(seance: Seance): Promise<Seance | null> {
  try {
    console.log("Connecting to MongoDB client...");
    const client = await clientPromise;
    const db = client.db('bodyscan');
    const collection = db.collection('seances');

    console.log("Transforming seance object...");
    const seanceWithId = { ...seance, _id: seance._id ? new ObjectId(seance._id) : new ObjectId() };

    console.log("Inserting seance into the database:", seanceWithId);
    await collection.insertOne(seanceWithId);

    const result = {
      ...seance,
      _id: seanceWithId._id.toString()
    };
    console.log("Seance successfully created:", result);
    
    return result;
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

export async function getSeanceById(id: string): Promise<Seance | null> {
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

