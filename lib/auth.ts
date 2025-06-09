import { GetServerSidePropsContext } from 'next';
import { parse } from 'cookie';
import clientPromise from './db';

export async function getUserFromRequest(context: GetServerSidePropsContext) {
  const cookie = context.req.headers.cookie;
  if (!cookie) return null;

  const { rutyn_user } = parse(cookie);
  if (!rutyn_user) return null;

  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection('users').findOne({ _id: new (require('mongodb').ObjectId)(rutyn_user) });

  return user || null;
}
