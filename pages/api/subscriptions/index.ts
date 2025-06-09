// pages/api/subscriptions/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const client = await clientPromise;
  const db = client.db('rutyn');
  const subscriptions = await db.collection('subscriptions').find().sort({ paidAt: -1 }).toArray();

  res.status(200).json(subscriptions);
}
