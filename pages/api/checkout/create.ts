// pages/api/checkout/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createInvoice } from '@/lib/xendit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, productId, title, price } = req.body;

  if (!email || !productId || !price || !title) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const invoiceUrl = await createInvoice({
    externalId: `rutyn-subscription-${productId}-${Date.now()}`,
    payerEmail: email,
    description: title,
    amount: price,
    successRedirectURL: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`
  });

  res.status(200).json({ invoiceUrl });
}
