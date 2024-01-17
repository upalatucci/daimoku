import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, response: NextApiResponse) {
  if (req.method === 'POST') {
    const body = req.body as { hours: string; minutes: string };

    const hours = parseInt(body.hours);
    const minutes = parseInt(body.minutes);

    const daimoku = (hours * 60 + minutes) * 50;

    await kv.incrby('daimoku', daimoku);
    return response.json({ ok: 'ok' });
  } else {
    const daimoku = await kv.get<number>('daimoku');
    return response.json({ status: 'ok', daimoku: daimoku || 0 });
  }
}
