// pages/api/products/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('rutyn');
  const collection = db.collection('products');

  if (req.method === 'GET') {
    const { seller } = req.query;
    const query = seller ? { sellerUsername: seller } : {};
    const products = await collection.find(query).toArray();
    res.status(200).json(products);
  }

  else if (req.method === 'POST') {
    const { title, description, price, interval, sellerUsername } = req.body;

    if (!title || !price || !interval || !sellerUsername) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const newProduct = {
      title,
      description,
      price,
      interval,
      sellerUsername,
      createdAt: new Date()
    };

    const result = await collection.insertOne(newProduct);
    res.status(201).json(result);
  }

  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
