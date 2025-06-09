// pages/api/subscriptions/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const client = await clientPromise;
  const db = client.db('rutyn');

  const subscriptions = await db.collection('subscriptions').find().sort({ paidAt: -1 }).toArray();
  const products = await db.collection('products').find().toArray();

  // Create a map of productId => title
  const productMap = new Map(products.map(p => [p._id.toString(), p.title]));

  // Add productTitle field
  const enriched = subscriptions.map((s) => ({
    ...s,
    productTitle: productMap.get(s.productId) || 'Unknown',
  }));

  res.status(200).json(enriched);
}
