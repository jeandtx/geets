// pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('geets');

    const posts = await db
      .collection('posts_fake')
      .find({})
      .sort({ metacritic: -1 })
      .limit(15)
      .toArray();

    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: e});
  }
}
