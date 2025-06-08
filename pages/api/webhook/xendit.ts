// pages/api/webhook/xendit.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export const config = {
  api: {
    bodyParser: false, // Xendit sends raw JSON
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const event = JSON.parse(body);
      const { status, external_id, payer_email, amount } = event;

      if (status === 'PAID') {
        const productId = external_id.split('-')[2]; // get productId from "rutyn-subscription-<id>-<timestamp>"

        const client = await clientPromise;
        const db = client.db('rutyn');
        const subscriptions = db.collection('subscriptions');

        await subscriptions.insertOne({
          email: payer_email,
          productId,
          amount,
          paidAt: new Date(),
          status,
        });

        return res.status(200).json({ received: true });
      }

      return res.status(200).json({ ignored: true });
    } catch (err) {
      return res.status(400).json({ error: 'Webhook error', detail: err });
    }
  });
}
