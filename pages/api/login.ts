import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db'; // your MongoDB connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { identifier } = req.body;
  if (!identifier || typeof identifier !== 'string') return res.status(400).json({ error: 'Invalid input' });

  const client = await clientPromise;
  const db = client.db();

  let user = await db.collection('users').findOne({ identifier });

  if (!user) {
    const newUser = {
      identifier,
      createdAt: new Date(),
    };
    const result = await db.collection('users').insertOne(newUser);
    user = { _id: result.insertedId, ...newUser };
  }

  // Temporary session: save to cookie (later use JWT)
  res.setHeader(
    'Set-Cookie',
    `rutyn_user=${user._id.toString()}; Path=/; HttpOnly; SameSite=Lax`
  );

  res.status(200).json({ success: true });
}
