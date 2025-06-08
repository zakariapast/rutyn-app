// pages/api/products/[productId].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { productId },
    method,
  } = req;

  if (method !== 'GET') return res.status(405).end();

  const client = await clientPromise;
  const db = client.db('rutyn');

  try {
    const product = await db.collection('products').findOne({ _id: new ObjectId(productId as string) });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product ID' });
  }
}
