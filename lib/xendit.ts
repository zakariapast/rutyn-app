// lib/xendit.ts
import axios from 'axios';

const XENDIT_SECRET_KEY = process.env.XENDIT_API_KEY!;

export const createInvoice = async ({
  externalId,
  payerEmail,
  description,
  amount,
  successRedirectURL
}: {
  externalId: string;
  payerEmail: string;
  description: string;
  amount: number;
  successRedirectURL: string;
}) => {
  const res = await axios.post('https://api.xendit.co/v2/invoices', {
    external_id: externalId,
    payer_email: payerEmail,
    description,
    amount,
    success_redirect_url: successRedirectURL
  }, {
    auth: {
      username: XENDIT_SECRET_KEY,
      password: ''
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return res.data.invoice_url;
};

